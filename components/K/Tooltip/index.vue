<template>
  <VTooltip
    v-bind="$attrs"
    :text="text"
    :disabled="disabled"
    :location="location"
  >
    <template v-slot:activator="{ props }">
      <KFlex v-bind="props">
        <slot />
      </KFlex>
    </template>
  </VTooltip>
</template>

<script setup lang="ts">
  import { PropType } from "vue"

  defineProps({
    text: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String as PropType<"start" | "end" | "top" | "bottom">,
      default: "top",
    },
  })
</script>

<style></style>
