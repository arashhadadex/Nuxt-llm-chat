<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between p-4 border-b">
      <div class="flex items-center gap-x-4">
        <h2 class="text-xl md:text-2xl text-primary font-bold">Hub Chat</h2>
        <UButton
          color="gray"
          icon="i-heroicons-trash"
          size="xs"
          :disabled="clearDisabled"
          title="Clear chat"
          @click="$emit('clear')"
        />
      </div>
      <div class="flex items-center gap-x-4">
        <UButton
          icon="i-heroicons-cog-6-tooth"
          color="gray"
          variant="ghost"
          class="md:hidden"
          @click="$emit('showDrawer')"
        />
      </div>
    </div>

    <ChatsContainer
      :chat-history="chatHistory"
      :loading="loading"
      class="flex-1 overflow-y-auto"
    />

    <div class="border-t border-border p-2 bg-background">
      <UserMessageTextbox
        :loading="loading"
        @send="$emit('message', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type LoadingType = 'idle' | 'message' | 'stream'

defineEmits(['clear', 'message', 'showDrawer']);

defineProps({
  chatHistory: {
    type: Array as () => ChatMessage[],
    required: true,
  },
  loading: {
    type: String as () => LoadingType,
    default: 'idle',
  },
  clearDisabled: {
    type: Boolean,
    default: true,
  },
});
</script>
