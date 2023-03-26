<template>
  <VRow
    style="height: 100vh"
    :align="$vuetify.display.xs ? 'end' : 'center'"
    justify="center"
  >
    <VCol
      cols="11"
      sm="7"
      md="5"
      lg="4"
      :style="[!$vuetify.display.xs && 'height: 100vh']"
    >
      <slot name="header" />
      <VCard flat class="fill-height">
        <KBlock class="justify-end fill-height">
          <slot name="prepend" />
          <slot name="form">
            <KBlock class="mb-8 mt-10">
              <VTextField
                label="Username"
                placeholder="Username you register before"
              />
              <VTextField
                type="password"
                label="Password"
                placeholder="Your secret password"
              />
            </KBlock>
          </slot>

          <slot name="action">
            <VBtn variant="flat" color="primary" class="text-none">
              Login
            </VBtn>
            <VBtn variant="outlined" color="primary" class="text-none mt-3">
              Create new account
            </VBtn>
          </slot>
          <slot name="append" />
        </KBlock>
      </VCard>
      <slot name="footer" />
    </VCol>
  </VRow>
</template>

<script setup lang="ts"></script>

<style></style>
