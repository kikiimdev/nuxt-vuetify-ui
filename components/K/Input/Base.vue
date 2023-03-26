<template>
  <KBlock>
    <div v-if="label">{{ label }}</div>
    <slot />
  </KBlock>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      default: "",
    },
  })
</script>

<style></style>
