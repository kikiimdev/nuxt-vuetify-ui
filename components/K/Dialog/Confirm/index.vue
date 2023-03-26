<template>
  <KDialog v-bind="$attrs">
    <slot>
      {{ text }}
    </slot>
    <template #actions>
      <KFlex class="flex-row-reverse tw-w-full">
        <VBtn
          v-if="onConfirm"
          :color="confirmColor"
          variant="flat"
          class="ml-3 text-none px-4"
          @click="onConfirm?.()"
        >
          {{ confirmText }}
        </VBtn>
        <VBtn
          v-if="onCancel"
          :color="cancelColor"
          variant="outlined"
          class="text-none px-4"
          @click="onCancel?.()"
        >
          {{ cancelText }}
        </VBtn>
      </KFlex>
    </template>
  </KDialog>
</template>

<script setup lang="ts">
  const props = defineProps({
    onConfirm: Function,
    onCancel: Function,
    confirmText: {
      type: String,
      default: "Submit",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
    confirmColor: {
      type: String,
      default: "primary",
    },
    cancelColor: {
      type: String,
      default: "secondary",
    },
    text: {
      type: String,
    },
  })
</script>

<style></style>
