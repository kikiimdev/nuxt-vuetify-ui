<template>
  <KBlock>
    <div v-if="label">
      {{ label?.trim() }}
      <span v-if="labelHint" class="text-caption text-disabled">
        {{ labelHint?.trim() }}
      </span>
    </div>
    <slot />
  </KBlock>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      default: "",
    },
    labelHint: {
      type: String,
      default: "",
    },
  })
</script>

<style></style>
