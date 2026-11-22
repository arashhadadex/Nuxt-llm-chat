<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-white dark:bg-gray-900',
  },
});
</script>

 <template>
   <NuxtRouteAnnouncer />
   <NuxtLoadingIndicator />
   <NuxtPage />
 </template>
