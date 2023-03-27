<template>
  <div>
    <KToastListItem
      v-for="(notification, index) in notifications"
      :key="notification.id"
      multi-line
      :location="xs ? 'bottom' : 'bottom right'"
      v-bind="notification"
      :on-close="() => remove(index)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useDisplay } from "vuetify"

  const { xs } = useDisplay()
  const { notifications, remove } = useNotify()
</script>

<style></style>
