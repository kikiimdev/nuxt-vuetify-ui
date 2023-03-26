<template>
  <VListItem
    v-if="!$attrs.rail"
    v-bind="{ ...$attrs, ...listItemProp, ...navigation }"
    :value="navigation.title"
  />
</template>

<script setup lang="ts">
  const props = defineProps({
    navigation: Object as PropType<any>,
    listItemProp: Object,
  })
</script>

<style></style>
