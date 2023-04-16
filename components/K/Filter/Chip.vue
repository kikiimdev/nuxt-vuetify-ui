<template>
  <KFilterBase
    v-bind="{ ...$attrs, ...props }"
    v-model="modelValueRef"
    v-model:search="searchRef"
    #default="{ title }"
  >
    <VChip
      :label="square"
      :color="title ? activeColor : ''"
      :disabled="disabled"
      @click="showDialog = true"
    >
      <KFlex>
        <VIcon v-if="prependIcon" :icon="prependIcon" />
        <span v-if="label">{{ label }}</span>
        <span v-if="modelValueRef !== undefined">
          : <b>{{ title }}</b>
        </span>
        <VIcon v-if="appendIcon" :icon="appendIcon" />
      </KFlex>
    </VChip>
  </KFilterBase>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: String,
    disabled: Boolean,
    square: Boolean,
    prependIcon: String,
    appendIcon: String,
    search: String,
    modelValue: Object as PropType<any>,
    items: Array as PropType<any[]>,
    itemTitle: {
      type: String,
      default: "title",
    },
    itemValue: {
      type: String,
      default: "value",
    },
    returnObject: Boolean,
    stayOnSelect: Boolean,
    activeColor: {
      type: String,
      default: "primary",
    },
    selectedClass: {
      type: String,
      default: "bg-grey-lighten-3",
    },
  })

  const emit = defineEmits(["update:search", "update:modelValue"])

  const searchRef = computed({
    get: () => props.search,
    set: (v: any) => emit("update:search", v),
  })

  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v: any) => emit("update:modelValue", v),
  })

  const showDialog = ref(false)

  const isObject = (item: any) => {
    return typeof item === "object" && !Array.isArray(item) && item !== null
  }

  const getItemTitle = (item: any) => {
    if (!isObject(item)) {
      return item
    }

    return item[props.itemTitle]
  }
</script>

<style></style>
