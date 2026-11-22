<script setup lang="ts">
const emit = defineEmits(['send'])

const model = defineModel<string>()

const props = defineProps<{
  loading: 'idle' | 'message' | 'stream'
}>()

function sendMessage() {
  if (model.value.trim()) {
    emit('send', model.value)
    model.value = ''
  }
}
</script>

<template>
  <div class="flex items-start p-3.5 relative">
    <UTextarea
      v-model="model"
      placeholder="How can I help you today?"
      class="w-full"
      :ui="{ padding: { xl: 'pr-11' } }"
      :rows="1"
      :maxrows="5"
      :disabled="props.loading !== 'idle'"
      autoresize
      size="xl"
      @keydown.enter.exact.prevent="sendMessage"
      @keydown.enter.shift.exact.prevent="model += '\n'"
    />

    <UButton
      icon="i-heroicons-arrow-up-20-solid"
      class="absolute top-5 right-5"
      :disabled="props.loading !== 'idle'"
      @click="sendMessage"
    />
  </div>
</template>
