<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between p-4 border-b">
      <div class="flex items-center gap-x-4">
        <h2 class="text-xl md:text-2xl text-primary font-bold">Hub Chat</h2>
        <UTooltip text="Clear chat">
          <UButton
            color="gray"
            icon="i-heroicons-trash"
            size="xs"
            :disabled="clearDisabled"
            @click="$emit('clear')"
          />
        </UTooltip>
      </div>
      <div class="flex items-center gap-x-4">
        <ColorMode />
        <UButton
          icon="i-heroicons-cog-6-tooth"
          color="gray"
          variant="ghost"
          class="md:hidden"
          @click="$emit('showDrawer')"
        />
      </div>
    </div>

    <UserMessageTextbox
      :loading="loading"
      @send="$emit('message', $event)"
    />
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
