type FetchArgs = Parameters<typeof $fetch>
type Opts = FetchArgs[1] & {
  immediate?: Boolean
  onSuccess?: Function
  onError?: Function
}

type MaybeRef<T> = Ref<T> | T

export const use$Fetch = async (url: MaybeRef<FetchArgs[0]>, opts: Opts) => {
  opts = {
    immediate: false,
    ...opts,
  }
  const { immediate, onSuccess, onError, ...fetchOpts } = opts

  const error = ref<any>(undefined)
  const data = ref()
  const loading = ref(false)

  const execute = async () => {
    error.value = undefined
    loading.value = true

    if (isRef(fetchOpts.body)) {
      ;(fetchOpts as any).body = unref(fetchOpts.body)
    }

    try {
      const result = await $fetch(unref(url), fetchOpts)
      data.value = result
      onSuccess?.(result)
    } catch (e) {
      error.value = e
      onError?.(e)
    } finally {
      loading.value = false
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
