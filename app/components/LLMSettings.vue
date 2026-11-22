<script setup lang="ts">
type LlmParams = {
  model: string
  temperature: number
  maxTokens: number
  topP?: number
  topK?: number
  frequencyPenalty?: number
  presencePenalty?: number
  systemPrompt: string
  stream: boolean
}

const llmParams = defineModel('llmParams', {
  type: Object as () => LlmParams,
  required: true,
})

defineEmits(['hideDrawer', 'reset'])

const accordionItems = [
  {
    label: 'Advanced Settings',
    defaultOpen: false,
  },
]

const models = [
  {
    name: 'deepseek-coder-6.7b-base-awq',
    id: '@hf/thebloke/deepseek-coder-6.7b-base-awq',
  },
  {
    name: 'llama-3-8b-instruct',
    id: '@cf/meta/llama-3-8b-instruct',
  },
]
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden">
    <hr class="border-border my-4" />
    <div class="p-4 flex-1 space-y-6 overflow-y-auto">
      <div class="space-y-2">
        <label class="text-sm font-medium text-muted-foreground">Model</label>
        <USelectMenu
          v-model="llmParams.model"
          size="md"
          :options="models"
          value-attribute="id"
          option-attribute="name"
        />
      </div>

      <RangeInput
        v-model="llmParams.temperature"
        label="Temperature"
        :min="0"
        :max="5"
        :step="0.1"
      />

      <RangeInput
        v-model="llmParams.maxTokens"
        label="Max Tokens"
        :min="1"
        :max="4096"
      />

      <div class="space-y-2">
        <label class="text-sm font-medium text-muted-foreground">System Prompt</label>
        <UTextarea
          v-model="llmParams.systemPrompt"
          :rows="3"
          :maxrows="8"
          autoresize
        />
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm">Stream Response</span>
        <UToggle v-model="llmParams.stream" />
      </div>

      <UAccordion
        :items="accordionItems"
        color="white"
        variant="solid"
        size="md"
      >
        <template #item>
          <UCard :ui="{ body: { base: 'space-y-6', padding: 'p-4 sm:p-4' } }">
            <RangeInput
              v-model="llmParams.topP"
              label="Top P"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <RangeInput
              v-model="llmParams.topK"
              label="Top K"
              :min="1"
              :max="100"
              :step="1"
            />

            <RangeInput
              v-model="llmParams.frequencyPenalty"
              label="Frequency Penalty"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <RangeInput
              v-model="llmParams.presencePenalty"
              label="Presence Penalty"
              :min="0"
              :max="2"
              :step="0.1"
            />
          </UCard>
        </template>
      </UAccordion>
    </div>
  </div>
</template>
