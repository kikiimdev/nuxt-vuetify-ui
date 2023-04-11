<template>
  <VBottomNavigation
    v-model="activeNavigation"
    v-bind="$attrs"
    :active="activeRef"
    :color="color"
  >
    <template
      v-for="(navigation, index) in mainNavigations"
      :key="index + JSON.stringify(navigation)"
    >
      <VBtn
        :to="navigation.to"
        :exact="navigation.exact"
        @click="navigation.subs && selectSub(navigation)"
      >
        <VIcon>{{ navigation.icon }}</VIcon>

        {{ navigation.title }}
      </VBtn>
    </template>
  </VBottomNavigation>

  <KDialog v-model="subDialog" class="pa-0">
    <VList v-if="selectedSub" class="pa-0 ma-0">
      <VListItem
        v-for="({ title, icon, to }, index) in selectedSub.subs"
        :key="index"
        :to="to"
        @click="subDialog = false"
      >
        <KFlex>
          <VIcon v-if="icon">{{ icon }}</VIcon>
          <span v-if="title">{{ title }}</span>
        </KFlex>
      </VListItem>
    </VList>
  </KDialog>
</template>

<script setup lang="ts">
  const props = defineProps({
    navigations: {
      type: Array as PropType<any[]>,
    },
    color: {
      type: String,
      default: "primary",
    },
    btnProp: Object,
    active: Boolean,
  })

  const emit = defineEmits(["update:active"])
  const activeRef = computed({
    get: () => props.active,
    set: (v: any) => emit("update:active", v),
  })

  const activeNavigation = ref()

  const mainNavigations = computed(() => {
    let totalCut = props.navigations?.length || 0
    if (props.navigations?.length === 5) totalCut = 5
    else if (props.navigations?.length || 0 > 5) totalCut = 4
    // const totalCut = props.navigations?.length >

    return props.navigations?.slice(0, totalCut - 1)
  })

  const additionalNavigations = computed(() => {
    const navTotal = props.navigations?.length || 0
    if (navTotal < 6) return []
    return props.navigations?.slice(5)
  })

  const selectedSub = ref()
  const subDialog = ref(false)
  const additionalDialog = ref(false)
  const isGroup = (navigation: any) => navigation && navigation.subs
  const selectSub = (navigation: any) => {
    selectedSub.value = navigation
    subDialog.value = true
  }
</script>

<style></style>
