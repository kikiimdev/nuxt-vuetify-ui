<template>
  <div
    class="d-flex"
    :class="[column && 'flex-column', wrap && 'flex-wrap', $attrs.class]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    column: Boolean,
    wrap: Boolean,
  })
</script>

<style></style>
