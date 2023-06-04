<template>
  <KInputBase v-bind="$attrs">
    <VCombobox
      :key="$attrs.model"
      :items="_items"
      v-bind="{ ...inputStyle, ...$attrs }"
      v-model="modelValueRef"
      v-model:search="searchRef"
      :item-title="props.itemTitle || props['item-title'] || 'value'"
      label=""
      @change="$emit('change', modelValueRef)"
    >
      <template v-slot:item="{ props, item }">
        <VListItem
          v-bind="props"
          :title="getItemTitle(item.raw)"
          :subtitle="getItemSubtitle(item.raw)"
        />
      </template>
    </VCombobox>
    <!-- <VAutocomplete
      :key="$attrs.model"
      v-bind="{ ...inputStyle, ...$attrs }"
      v-model="modelValueRef"
      v-model:search="searchRef"
      label=""
      :items="_items"
      @change="$emit('change', modelValueRef)"
    >
      <template v-slot:item="{ props, item }">
        <VListItem
          v-bind="props"
          :title="getItemTitle(item.raw)"
          :subtitle="getItemSubtitle(item.raw)"
        />
      </template>
    </VAutocomplete> -->
  </KInputBase>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: String,
    search: String,
    fetchItems: {
      type: Function,
    },
    watch: {
      type: undefined,
    },
    itemTitle: {
      type: String,
      default: "title",
    },
    itemDescription: String,
  })
  const emit = defineEmits(["update:modelValue", "update:search", "change"])
  const attrs = useAttrs()

  const inputStyle = useInputStyle()
  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })
  const searchRef = computed({
    get: () => props.search,
    set: (v) => emit("update:search", v),
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

  const isMounted = ref(false)
  onMounted(async () => {
    await update()
    setTimeout(() => (isMounted.value = true), 400)
  })

  const getItemTitle = (v: any) => {
    let key = "name"

    if (props["itemTitle"]) {
      key = props["itemTitle"]
    }

    if (props["item-title"]) {
      key = props["item-title"]
    }

    if (typeof key === "string") {
      return v[key]
    }

    return key
  }

  const getItemSubtitle = (v: any) => {
    let key = "description"

    if (props["itemDesription"]) {
      key = props["itemDesription"]
    }

    if (props["item-description"]) {
      key = props["item-description"]
    }

    if (typeof key === "string") {
      return v[key]
    }

    return key
  }

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
