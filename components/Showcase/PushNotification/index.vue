<template>
  <div class="pa-4">
    <VBtn class="text-none" prepend-icon="mdi-bell" @click="pushNotification()">
      Notify Me!
    </VBtn>
  </div>
</template>

<script setup lang="ts">
  const { createNotification } = usePushNotification()

  const pushNotification = () =>
    createNotification("Try to CLICK me!", {
      body: `Push notification test ${Math.random()}`,
      data: {
        myUrl: "https://google.com",
      },
      onClick: (e, notification) => {
        window.open(notification.data.myUrl, "blank")
        notification.close()
      },
    })
</script>

<style></style>
