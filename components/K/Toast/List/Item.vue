<template>
  <VSnackbar v-model="showNotif" v-bind="$attrs">
    <div v-html="text" />

    <template v-slot:actions>
      <v-btn color="pink" icon="mdi-close" @click="showNotif = false"> </v-btn>
    </template>
  </VSnackbar>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: String,
    onClose: Function,
  })

  const showNotif = ref(true)

  watch(showNotif, (v) => {
    if (!v) {
      props.onClose?.()
    }
  })
</script>

<style></style>
