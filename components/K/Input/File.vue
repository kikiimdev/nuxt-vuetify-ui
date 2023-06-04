<template>
  <KBlock>
    <KInputBase v-bind="$attrs">
      <VFileInput
        @change="handleOnChange"
        @click:clear="previewData = ''"
        v-bind="{ ...inputStyle, ...$attrs }"
        v-model="selectedFile"
        label=""
      />
    </KInputBase>

    <div v-if="showPreview" id="preview">
      <img v-if="previewData" :src="previewData" />
    </div>
  </KBlock>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: String,
    multiple: Boolean,
    showPreview: Boolean,
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

  const previewData = ref("")
  const handleOnChange = (e: any) => {
    previewData.value = ""
    const file = e.target.files[0]
    const isImageFile = file.type.includes("image")

    if (isImageFile) {
      previewData.value = URL.createObjectURL(file)
    }
  }
</script>

<style>
  #preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    max-width: 100%;
    max-height: 500px;
  }
</style>
