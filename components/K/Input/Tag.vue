<template>
  <KInputBase v-bind="$attrs">
    <VCard outlined class="pa-2" variant="tonal">
      <KFlex wrap class="align-center">
        <div
          v-for="(tag, index) in modelValueRef"
          :key="index"
          class="pr-3 mr-2 my-1 bg-grey-darken-3 rounded"
        >
          <VBtn
            color="white"
            variant="text"
            icon="mdi-close"
            size="x-small"
            class="mr-1"
            @click="removeTag(index)"
          />
          <span v-text="tag" class="tw-cursor-default" />
        </div>
        <input
          v-bind="{ ...filteredAttrs }"
          class="mx-2"
          style="border: none; outline: none; background: none; width: 500px"
          @keyup="addTag"
          @keyup.delete="removeLastTag"
        />
      </KFlex>
    </VCard>

    <!-- Hint -->
    <KFlex>
      <VCard v-if="$attrs.hint" flat color="info" class="mt-2 py-1 px-3">
        <p v-html="$attrs.hint" class="text-caption" />
      </VCard>
    </KFlex>
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

  const attrs = useAttrs()
  const { label, rules, value, ...filteredAttrs } = attrs

  // const formattedRules: Ref<any[]> = computed(() =>
  //   rules ? useInputRules(rules as any[], modelValueRef) : []
  // );

  onMounted(() => {
    // @ts-ignore
    if (!modelValueRef.value?.length) modelValueRef.value = []
  })

  const addTag = (event: any) => {
    const isCommaPressed = event.target.value.indexOf(",") > 0
    const isEnterPressed = event.which == 13

    const isComaOrEnterPressed = isCommaPressed || isEnterPressed

    if (isComaOrEnterPressed) {
      event.preventDefault()
      let val = event.target.value.replace(/,/g, "").trim()

      if (val.length > 0) {
        ;(modelValueRef.value as unknown as string[]).push(val)
        event.target.value = ""
      }
    }
  }

  const removeTag = (index: number) =>
    (modelValueRef.value as unknown as string[]).splice(index, 1)

  const removeLastTag = (event: any) => {
    const isValueEmpty = event.target.value.length == 0
    if (isValueEmpty)
      removeTag((modelValueRef.value as unknown as string[]).length - 1)
  }
</script>

<style></style>
