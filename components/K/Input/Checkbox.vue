<template>
  <KInputBase v-bind="$attrs">
    <VCheckbox
      v-bind="{ ...inputStyle, ...$attrs }"
      v-model="modelValueRef"
      :label="text"
      @change="$emit('change', modelValueRef)"
    />
  </KInputBase>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: null,
    text: String,
  })
  const emit = defineEmits(["update:modelValue", "change"])

  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })

  const inputStyle = useInputStyle()
</script>

<style></style>
