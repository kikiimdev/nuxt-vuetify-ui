<template>
  <VAppBar>
    <VContainer :fluid="!container">
      <KFlex class="align-center">
        <slot />
      </KFlex>
    </VContainer>
  </VAppBar>
</template>

<script setup lang="ts">
  defineProps({
    container: Boolean,
  })
</script>

<style></style>
