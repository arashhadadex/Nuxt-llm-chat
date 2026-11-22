<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const id = useId()

const { data: ast, refresh } = await useAsyncData(
  `md-${id}`,
  () => parseMarkdown(props.content)
)

watch(
  () => props.content,
  () => {
    refresh()
  }
)
</script>

<template>
  <MDCRenderer class="flex-1 prose dark:prose-invert" :body="ast?.body" />
</template>
