export const useUserGeolocation = async () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 8000,
    maximumAge: 1,
  }

  const coords = ref({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
  })
  const error = ref<any>(undefined)

  const isLoading = ref(false)

  const asyncGetLocation = async () => {
    try {
      // @ts-ignore
      const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.watchPosition(resolve, reject, options)
      })

      return {
        coords,
        error: null,
      }
    } catch (error) {
      return {
        coords: null,
        error,
      }
    }
  }

  const getLocation = async () => {
    isLoading.value = true
    error.value = null
    const { coords: _coords, error: _error } = await asyncGetLocation()

    coords.value = _coords as any
    error.value = _error
    isLoading.value = false
  }

  return {
    getLocation,
    coords,
    error,
    isLoading,
  }
}
