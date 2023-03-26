<template>
  <VRow justify="center" style="height: 100vh">
    <VCol cols="11" sm="8" md="6">
      <KBlock class="align-center text-center">
        <h1 class="text-h3 py-10">
          <slot name="title">
            No more operational headaches.
            <span class="text-primary">Nice</span>
          </slot>
        </h1>

        <p class="text-h6 mb-10">
          <slot name="description">
            Use <span class="text-primary">NiceCommerce</span> to offer quicker,
            boost your bottom lines and get back to focusing on the stuff that
            really matters.
          </slot>
        </p>

        <slot name="cta">
          <VBtn variant="flat" size="large" class="text-none">
            Let's Chat
          </VBtn>
        </slot>
      </KBlock>
    </VCol>
  </VRow>
</template>

<script setup lang="ts"></script>

<style></style>
