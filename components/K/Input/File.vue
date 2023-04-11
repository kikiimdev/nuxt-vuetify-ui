<template>
  <KInputBase v-bind="$attrs">
    <VFileInput
      v-bind="{ ...inputStyle, ...$attrs }"
      v-model="selectedFile"
      label=""
    />
  </KInputBase>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: String,
    multiple: Boolean,
  })
  const emit = defineEmits(["update:modelValue"])

  const selectedFile = ref<any>(undefined)

  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })

  watch(selectedFile, (v) => {
    const isArray = Array.isArray(v)

    props.multiple && isArray
      ? (modelValueRef.value = v as any)
      : (modelValueRef.value = v[0])
  })

  const inputStyle = useInputStyle()
</script>

<style></style>
