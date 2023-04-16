<template>
  <div @click="showDialog = true">
    <slot>
      <VChip :color="getItemTitle(modelValueRef) ? activeColor : ''">
        <KFlex>
          <VIcon v-if="prependIcon" :icon="prependIcon" />
          <span v-if="label">{{ label }}</span>
          <span v-if="modelValueRef">
            : <b>{{ getItemTitle(modelValueRef) }}</b>
          </span>
          <VIcon v-if="appendIcon" :icon="appendIcon" />
        </KFlex>
      </VChip>
    </slot>
  </div>

  <KDialog v-model="showDialog" v-model:search="searchRef" :title="label">
    <KBlock>
      <VList class="mx-n4 py-0">
        <VListItem
          v-for="(item, index) in items"
          :key="index + getItemTitle(item)"
          link
          :class="[isSelected(item) && activeListClass + ' font-weight-bold']"
          @click="selectItem(item)"
        >
          <KFlex>
            <VIcon v-if="item.prependIcon" :icon="item.prependIcon" />
            <span v-if="getItemTitle(item)">{{ getItemTitle(item) }}</span>
            <template v-if="item.appendIcon">
              <VSpacer />
              <VIcon :icon="item.appendIcon" />
            </template>
          </KFlex>
        </VListItem>
      </VList>
    </KBlock>

    <template v-if="modelValueRef" #actions>
      <VSpacer />
      <VBtn
        variant="flat"
        color="grey-lighten-3"
        class="text-none"
        @click="clearFilter()"
      >
        Hapus Filter {{ label }}
      </VBtn>
    </template>
  </KDialog>
</template>

<script setup lang="ts">
  const props = defineProps({
    label: String,
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
    activeListClass: {
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

  const getItemValue = (item: any) => {
    if (!isObject(item) || props.returnObject) {
      return item
    }

    return item[props.itemValue]
  }

  const selectItem = (item: any) => {
    modelValueRef.value = getItemValue(item)

    if (!props.stayOnSelect) {
      showDialog.value = false
    }
  }

  const clearFilter = () => {
    modelValueRef.value = undefined

    if (!props.stayOnSelect) {
      showDialog.value = false
    }
  }

  const isSelected = (item: any) => {
    if (!isObject(item) || props.returnObject) {
      return modelValueRef.value === item
    }

    return (
      JSON.stringify(getItemValue(item)) === JSON.stringify(modelValueRef.value)
    )
  }
</script>

<style></style>
