<script setup lang="ts">
const temperature = ref<number | undefined>(0.7)
const topP = ref<number | undefined>()
const maxTokens = ref<number | undefined>()
</script>

<template>
  <div class="max-w-sm space-y-6 p-6">
    <ParamInput v-model="temperature" label="Temperature" :min="0" :max="2" :step="0.01" />
    <ParamInput v-model="topP" label="Top P" :min="0" :max="1" :step="0.01" />
    <ParamInput v-model="maxTokens" label="Max tokens" :min="1" :max="4096" :step="1" />
  </div>
</template>
