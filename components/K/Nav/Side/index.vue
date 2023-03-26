<template>
  <VNavigationDrawer v-bind="$attrs" v-model:opened="open">
    <template #prepend>
      <slot name="prepend" />
    </template>
    <slot />
    <VList v-if="navigations" v-bind="listProp">
      <template v-for="navigation in navigations">
        <template v-if="navigation.show !== false">
          <KNavSideListGroup
            v-if="isGroup(navigation)"
            :key="navigation.title + '-group'"
            :navigation="navigation"
            :listItemProp="listItemProp"
            :rail="$attrs.rail"
          />
          <KNavSideListItem
            v-else
            :key="navigation.title"
            :navigation="navigation"
            :value="navigation.title"
            :listItemProp="listItemProp"
          />
        </template>
      </template>
    </VList>
    <template #append>
      <slot name="append" />
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
  const props = defineProps({
    navigations: {
      type: Array as PropType<any[]>,
    },
    listProp: Object,
    listItemProp: Object,
  })

  const open = ref([])

  const isGroup = (navigation: any) => navigation && navigation.subs
</script>

<style></style>
