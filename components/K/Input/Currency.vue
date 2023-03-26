<template>
  <KInputBase v-bind="$attrs">
    <VTextField
      v-bind="{ ...inputStyle, ...$attrs }"
      v-model="modelValueRef"
      label=""
      @input="tempValue = toCurrency($event)"
    />
  </KInputBase>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: String,
  })
  const emit = defineEmits(["update:modelValue"])

  function toCurrency(val: string | number) {
    // Remove char except number and dot
    val = String(val).replace(/[^0-9\.]/g, "")
    // Remove dot
    val = String(val).replace(/\./g, "")
    // To Currency
    let formattedValue = Number(val)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&.")

    // Remove decimal
    if (formattedValue?.length > 3)
      formattedValue = formattedValue.slice(0, formattedValue.length - 3)

    return formattedValue
  }

  const updateModelValue = (v: string | number) =>
    emit("update:modelValue", toCurrency(v))

  const modelValueRef = computed({
    get: () => props.modelValue,
    // set: (v) => emit("update:modelValue", toCurrency(v!)),
    set: (v) => updateModelValue(v!),
  })

  const inputStyle = useInputStyle()

  const tempValue = ref("")

  onMounted(() => {
    updateModelValue(modelValueRef.value!)
    tempValue.value = modelValueRef.value!
  })

  watch(tempValue, (v) => updateModelValue(v))
</script>

<style></style>
