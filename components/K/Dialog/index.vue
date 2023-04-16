<template>
  <ClientOnly>
    <VDialog
      v-bind="$attrs"
      v-model="modelValueRef"
      scrollable
      :max-width="computedMaxWidth"
    >
      <VCard>
        <VCardTitle
          v-if="$slots.title || title"
          :class="[$attrs.fullscreen === '' && 'elevation-1']"
        >
          <slot name="title">
            <KFlex class="align-center">
              <div>{{ title }}</div>
              <VSpacer />
              <VBtn
                size="small"
                color="black"
                variant="plain"
                icon="mdi-close"
                @click="modelValueRef = false"
              />
            </KFlex>
          </slot>
        </VCardTitle>

        <VDivider />

        <template v-if="searchRef !== undefined">
          <KInputText placeholder="Cari..." v-model="searchRef" hide-details />
        </template>

        <VCardText style="min-height: 100px" class="px-4" :class="[bodyClass]">
          <slot />
        </VCardText>

        <VDivider />
        <VCardActions v-if="$slots.actions" class="px-6 py-4">
          <slot name="actions" />
        </VCardActions>
      </VCard>
    </VDialog>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { useDisplay } from "vuetify"

  const props = defineProps({
    modelValue: Boolean || undefined,
    title: String,
    maxWidth: String || Number,
    bodyClass: String,
    search: String,
  })
  const emit = defineEmits(["update:modelValue", "update:search"])
  const attrs = useAttrs()

  const { xs } = useDisplay()

  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })

  const searchRef = computed({
    get: () => props.search,
    set: (v) => emit("update:search", v),
  })

  const computedMaxWidth = computed(() => {
    let value = xs.value ? "90vw" : "60vw"
    if (props.maxWidth) value = props.maxWidth
    if (attrs.fullscreen === "") value = "100vw"

    return value
  })
</script>

<style></style>
