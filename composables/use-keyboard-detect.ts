import { useDisplay } from "vuetify/lib/framework.mjs"

export const useKeyboardDetect = () => {
  const { xs } = useDisplay()

  let unsubscribe: any
  const initialHeight = ref(0)
  const currentHeight = ref(0)
  const isKeyboardVisible = computed(
    () =>
      xs.value &&
      initialHeight.value > 0 &&
      currentHeight.value > 0 &&
      initialHeight.value > currentHeight.value
  )

  const handleResize = () => {
    currentHeight.value = window.innerHeight
  }

  onMounted(() => {
    initialHeight.value = window.innerHeight
    currentHeight.value = window.innerHeight

    unsubscribe = window.addEventListener("resize", handleResize)
  })

  onUnmounted(() => unsubscribe?.())

  return {
    isKeyboardVisible,
  }
}
