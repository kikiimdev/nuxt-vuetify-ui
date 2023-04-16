<template>
  <VCardTitle> Filters </VCardTitle>
  <VCardText>
    <KBlock>
      <KFlex>
        <KFilterChip
          v-model="filter.chip"
          v-model:search="search"
          label="All"
          :items="optionsz"
          append-icon="mdi-chevron-down"
        />
      </KFlex>
    </KBlock>
  </VCardText>
</template>

<script setup lang="ts">
  const filter = reactive({
    chip: undefined,
  })
  const search = ref("")
  const options = [
    {
      title: "Option A",
      value: "option_a",
    },
    {
      title: "Option B",
      value: "option_b",
    },
  ]
  const optionsz = ["ea", "ora", "asdasd"]
</script>

<style></style>
