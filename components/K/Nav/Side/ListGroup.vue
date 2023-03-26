<template>
  <VListGroup :value="navigation.title">
    <template v-slot:activator="{ props }">
      <KNavSideListItem v-bind="{ ...props, ...listItemProp, navigation }" />
    </template>

    <template v-for="subNavigation in navigation.subs">
      <KNavSideListGroup
        v-if="isGroup(subNavigation)"
        :key="navigation.title + '-sub-group'"
        :navigation="subNavigation"
        :listItemProp="listItemProp"
        :rail="$attrs.rail"
      />
      <KNavSideListItem
        v-else
        :key="navigation.title + '-sub'"
        :navigation="subNavigation"
        :listItemProp="listItemProp"
        :rail="$attrs.rail"
      />
    </template>
  </VListGroup>
</template>

<script setup lang="ts">
  const props = defineProps({
    navigation: Object as PropType<any>,
    listItemProp: Object,
  })

  const isGroup = (navigation: any) => navigation && navigation.subs
</script>

<style></style>
