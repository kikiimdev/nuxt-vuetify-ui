<template>
  <KInputBase v-bind="$attrs">
    <VTextarea
      v-bind="{ ...inputStyle, ...$attrs }"
      v-model="modelValueRef"
      label=""
    />
  </KInputBase>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: String,
  })
  const emit = defineEmits(["update:modelValue"])

  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })

  const inputStyle = useInputStyle()
</script>

<style></style>
