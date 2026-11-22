import { sendStream } from 'h3';

export default defineEventHandler(async (event) => {
  const { messages, params } = await readBody(event);
  if (!messages || messages.length === 0 || !params) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing messages or LLM params',
    });
  }

  const config = useRuntimeConfig();
  const accountId = config.public.workersAiAccountId as string | undefined;
  const apiToken = config.workersAiApiToken as string | undefined;

  if (!accountId || !apiToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Workers AI not configured. Set WORKERS_AI_ACCOUNT_ID and WORKERS_AI_API_TOKEN.',
    });
  }

  const requestBody = {
    messages: params.systemPrompt
      ? [{ role: 'system', content: params.systemPrompt }, ...messages]
      : messages,
    max_tokens: params.maxTokens,
    temperature: params.temperature,
    top_p: params.topP,
    top_k: params.topK,
    frequency_penalty: params.frequencyPenalty,
    presence_penalty: params.presencePenalty,
    stream: params.stream,
  };

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${params.model}`;

  try {
    const workersResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!workersResponse.ok) {
      const errorText = await workersResponse.text();
      console.error('Workers AI error:', workersResponse.status, errorText);
      throw createError({
        statusCode: 502,
        statusMessage: 'Workers AI request failed',
      });
    }

    if (params.stream) {
      event.node.res.setHeader('Content-Type', 'text/event-stream');
      event.node.res.setHeader('Cache-Control', 'no-cache');
      event.node.res.setHeader('Connection', 'keep-alive');
      return sendStream(event, workersResponse.body as unknown as ReadableStream);
    }

    const result = await workersResponse.json();
    return result.result?.response || '';
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error processing request',
    });
  }
});
