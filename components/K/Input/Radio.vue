<template>
  <KInputBase v-bind="$attrs">
    <VRadioGroup
      :key="$attrs.model"
      v-bind="{ ...inputStyle, ...$attrs }"
      v-model="modelValueRef"
      label=""
    >
      <VRadio
        v-for="(item, index) in _items"
        :key="`radio-${index}`"
        :class="[index > 0 && $attrs.inline && 'ml-3']"
        :label="getLabel(item)"
        :value="getValue(item)"
      ></VRadio>
    </VRadioGroup>
  </KInputBase>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: String,
    itemTitle: {
      type: String,
      default: "label",
    },
    itemValue: {
      type: String,
      default: "value",
    },
    fetchItems: {
      type: Function,
    },
    watch: {
      type: undefined,
    },
  })
  const emit = defineEmits(["update:modelValue", "update:search"])
  const attrs = useAttrs()

  const inputStyle = useInputStyle()
  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })

  const fetchedItems = ref([])
  const isLoading = ref(false)

  const _items = computed(() =>
    props.fetchItems ? fetchedItems.value : attrs.items
  )

  const _loading = computed(() =>
    props.fetchItems ? isLoading : attrs.loading
  )

  const update = async () => {
    // modelValueRef.value = undefined
    fetchedItems.value = []

    isLoading.value = true
    fetchedItems.value = await props.fetchItems?.()
    setTimeout(() => (isLoading.value = false), 200)
  }

  const isStringItem = computed(() =>
    (_items.value as any[]).some((i) => typeof i === "string")
  )

  const getObjectValue = (obj: any, path: string): any => {
    if (obj === null || obj === undefined) return null
    if (!path) return obj
    const properties: any[] = path.split(".")

    return getObjectValue(obj[properties.shift()], properties.join("."))
  }

  const getLabel = (item: any) => {
    let label = item
    if (!isStringItem.value) {
      label = getObjectValue(item, props.itemTitle)
    }

    return label
  }

  const getValue = (item: any) => {
    let value = item
    if (!isStringItem.value) {
      value = getObjectValue(item, props.itemValue)
    }

    return value
  }

  const isMounted = ref(false)
  onMounted(async () => {
    await update()
    setTimeout(() => (isMounted.value = true), 400)
  })

  watch(
    () => props.watch,
    (v) => {
      if (isMounted.value) {
        modelValueRef.value = undefined
      }

      update()
    }
  )
</script>

<style></style>
