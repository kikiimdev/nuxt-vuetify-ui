type CreateOptions = NotificationOptions & {
  onError?: (e: Event, notification: Notification) => void
  onClose?: (e: Event, notification: Notification) => void
  onClick?: (e: Event, notification: Notification) => void
  onShow?: (e: Event, notification: Notification) => void
}

export const usePushNotification = () => {
  const requestPermission = (
    fn: (permission: NotificationPermission) => void
  ) => Notification.requestPermission().then((permission) => fn(permission))

  const createNotification = (
    title: string,
    options?: CreateOptions | undefined
  ) =>
    requestPermission((permission) => {
      let notification: Notification

      const { onClose, onError, onClick, onShow } = options || {}

      if (permission === "denied") {
        alert("Push notification permission is denied")
      }

      if (permission === "granted") {
        notification = new Notification(title, options)

        if (onClose) {
          notification?.addEventListener("close", (e) =>
            onClose?.(e, notification)
          )
        }

        if (onError) {
          notification?.addEventListener("error", (e) =>
            onError?.(e, notification)
          )
        }

        if (onClick) {
          notification?.addEventListener("click", (e) =>
            onClick?.(e, notification)
          )
        }

        if (onShow) {
          notification?.addEventListener("show", (e) =>
            onShow?.(e, notification)
          )
        }
      }

      // @ts-expect-error
      return notification
    })

  return {
    createNotification,
    requestPermission,
  }
}
