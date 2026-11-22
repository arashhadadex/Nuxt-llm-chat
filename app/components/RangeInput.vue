<script setup lang="ts">
const model = defineModel<number | undefined>()

const props = withDefaults(defineProps<{
  label: string
  description?: string
  min?: number
  max?: number
  step?: number
}>(), {
  min: 0,
  max: 1,
  step: 0.01,
})

// The slider always needs a number, so show it at `min` while the value is unset
const sliderValue = computed({
  get: () => model.value ?? props.min,
  set: (v: number) => { model.value = v },
})

// Empty input means "not set", so the parameter can be omitted from the API request
function onInput(v: string | number) {
  if (v === '' || v == null) {
    model.value = undefined
    return
  }
  const n = Number(v)
  model.value = Number.isNaN(n) ? undefined : n
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between gap-3">
      <label class="text-sm font-medium">{{ label }}</label>
      <div class="flex items-center gap-1">
        <UInput
          type="number"
          size="sm"
          class="w-24"
          placeholder="default"
          :min="min"
          :max="max"
          :step="step"
          :model-value="model ?? ''"
          @update:model-value="onInput"
        />
        <UButton
          icon="i-lucide-x"
          size="xs"
          color="neutral"
          variant="ghost"
          aria-label="Unset"
          :disabled="model === undefined"
          @click="model = undefined"
        />
      </div>
    </div>

    <USlider
      v-model="sliderValue"
      :min="min"
      :max="max"
      :step="step"
      :class="{ 'opacity-50': model === undefined }"
    />

    <p v-if="description" class="text-xs text-muted">{{ description }}</p>
  </div>
</template>
