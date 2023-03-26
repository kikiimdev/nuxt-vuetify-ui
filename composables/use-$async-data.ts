type Opts<T> = {
  immediate?: Boolean
  onSuccess?: (data?: Awaited<T>) => any
  onError?: (e?: any) => any
  onFinish?: Function
  beforeExecute?: Function
}

export const use$AsyncData = async <T>(
  fn: () => Promise<T>,
  opts: Opts<T> = {} as Opts<T>
) => {
  opts = {
    immediate: false,
    ...opts,
  }
  const { immediate, onSuccess, onError, onFinish, beforeExecute } = opts

  const error = ref<any>(undefined)
  const data = ref<T>()
  const loading = ref(false)

  const execute = async () => {
    error.value = undefined
    loading.value = true

    beforeExecute?.()

    try {
      const result = await fn()
      data.value = result
      await onSuccess?.(result)
    } catch (e) {
      error.value = e
      await onError?.(e)
    } finally {
      loading.value = false
      await onFinish?.()
    }
  }

  onMounted(async () => {
    if (immediate) {
      await execute()
    }
  })

  return {
    execute,
    data,
    error,
    loading,
  }
}
