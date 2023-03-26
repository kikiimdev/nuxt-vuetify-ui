type Notification = {
  id: number
  text: string
  timeout: number
}

export const useNotify = () => {
  const notifications = useState<Partial<Notification>[]>(
    "notifications",
    () => []
  )

  const add = (notif: Partial<Notification>) => {
    const defaultTimeout = 4000

    notifications.value.unshift({
      id: useUniqueId(),
      timeout: defaultTimeout,
      ...unref(notif),
    })

    setTimeout(
      () => remove(notifications.value.length),
      notif.timeout || defaultTimeout
    )
  }

  const remove = (index: number) => {
    notifications.value.splice(index, 1)
  }

  return {
    notifications,
    add,
    remove,
  }
}
