<script setup lang="ts">
type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const props = defineProps<{
  chatHistory: ChatMessage[]
  loading: 'idle' | 'message' | 'stream'
}>()

const chatContainer = ref<HTMLElement | null>(null)
let observer: MutationObserver | null = null

onMounted(() => {
  if (chatContainer.value) {
    observer = new MutationObserver(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })

    observer.observe(chatContainer.value, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-5">
    <div
      v-for="(message, index) in chatHistory"
      :key="`message-${index}`"
      class="flex items-start gap-x-4"
    >
      <div
        class="w-12 h-12 p-2 rounded-full shrink-0"
        :class="
          message.role === 'user'
            ? 'bg-primary/20'
            : 'bg-blue-500/20'
        "
      >
        <UIcon
          :name="
            message.role === 'user'
              ? 'i-mdi-user'
              : 'i-heroicons-sparkles-solid'
          "
          class="w-8 h-8"
          :class="
            message.role === 'user'
              ? 'text-primary-400'
              : 'text-blue-400'
          "
        />
      </div>
      <div v-if="message.role === 'user'">{{ message.content }}</div>
      <AssistantMessage v-else :content="message.content" />
    </div>

    <ChatLoadingSkeleton v-if="loading === 'message'" />

    <NoChats v-if="chatHistory.length === 0" class="h-full" />
  </div>
</template>
