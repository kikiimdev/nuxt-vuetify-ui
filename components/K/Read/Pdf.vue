<template>
  <KDialog
    v-model="modelValueRef"
    fullscreen
    title="PDF"
    body-class="ma-0 pa-0"
  >
    <embed :src="`/uploads/${src}`" width="100%" height="100%" />
  </KDialog>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: Boolean,
    src: String,
  })
  const emit = defineEmits(["update:modelValue"])

  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })
</script>

<style></style>
