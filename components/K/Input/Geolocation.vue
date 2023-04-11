<template>
  <KInputBase v-bind="$attrs">
    <div
      style="width: 100%; z-index: 0"
      :style="{
        height: xs ? '60vh' : '50vh',
      }"
    >
      <LMap
        ref="map"
        :useGlobalLeaflet="false"
        v-model:zoom="zoom"
        v-model:center="mapCenter"
        @update:zoom="handleZoom"
        @click="handleMapClick"
      >
        <LTileLayer
          :url="tileLayer"
          layer-type="base"
          name="OpenStreetMap"
        ></LTileLayer>

        <LMarker
          v-if="userLocation"
          :lat-lng="userLocation"
          :icon="greenIcon"
          style="pointer-events: none"
        >
          <LTooltip>Posisi anda saat ini</LTooltip>
        </LMarker>

        <LMarker
          v-if="convertedModelValue"
          :lat-lng="convertedModelValue"
          :icon="redIcon"
        >
          <LTooltip>Posisi yang dipilih</LTooltip>
        </LMarker>

        <LControl :position="'bottomleft'">
          <VBtn
            color="primary"
            class="text-none mr-2 mt-2 mt-sm-0"
            size="small"
            prepend-icon="mdi-crosshairs-gps"
            :loading="fetchingUserLocation"
            @click="locationPermissionRequest()"
          >
            Ambil posisi sekarang
          </VBtn>
          <VBtn
            v-show="!isOnUserLocation"
            color="success"
            class="text-none mr-2 mt-2 mt-sm-0"
            size="small"
            prepend-icon="mdi-map-marker-radius-outline"
            @click="moveToUserLocation()"
          >
            Ke lokasi user
          </VBtn>
          <VBtn
            v-show="isOnUserLocation"
            color="success"
            class="text-none mr-2 mt-2 mt-sm-0"
            size="small"
            prepend-icon="mdi-map-marker-radius-outline"
            @click="moveToDestination()"
          >
            Ke lokasi tujuan
          </VBtn>
          <VBtn
            color="error"
            class="text-none mt-2 mt-sm-0"
            size="small"
            prepend-icon="mdi-map-marker-up"
            @click="setModelValueToUserLocation()"
          >
            Gunakan posisi user
          </VBtn>
        </LControl>

        <slot />
      </LMap>
    </div>

    <span v-if="!isLocationAccurate" class="mb-4"> Map tidak akurat </span>

    <VRow v-if="showManualInput" class="mt-n2" :no-gutters="xs">
      <VCol v-if="modelValueRef?.latitude" cols="12" md="6">
        <KInputText v-model="modelValueRef.latitude" label="Latitude" />
      </VCol>
      <VCol v-if="modelValueRef?.longitude" cols="12" md="6">
        <KInputText v-model="modelValueRef.longitude" label="Longitude" />
      </VCol>
    </VRow>

    <VBtn :loading="fetchingUserLocation" @click="locationPermissionRequest()">
      Get Location
    </VBtn>
  </KInputBase>

  <KDialog title="Izin Lokasi" v-model="showLocationPermissionRequest">
    <KBlock class="align-center">
      <VImg
        src="@/assets/location-request.png"
        contain
        position="center center"
        class="py-4 mt-8"
        max-height="256px"
      />
      <VCardTitle class="text--primary text-center text-break">
        Kami perlu izin akses lokasi nih
      </VCardTitle>
      <VCardText class="text-break text-center">
        Biar bisa ambil titik lebih akurat pastinya~
      </VCardText>

      <div class="pa-4" style="width: 100%">
        <VBtn block depressed color="primary" @click="requestLocation()">
          <div class="text-none">Berikan izin</div>
        </VBtn>
      </div>
    </KBlock>
  </KDialog>
</template>

<script setup lang="ts">
  import "leaflet/dist/leaflet.css"
  import {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControl,
    // @ts-ignore
  } from "@vue-leaflet/vue-leaflet"
  import { useDisplay } from "vuetify/lib/framework.mjs"

  type Geolocation = {
    latitude: number
    longitude: number
  }

  const { xs } = useDisplay()

  const {
    getLocation,
    coords,
    error,
    isLoading: fetchingUserLocation,
  } = await useUserGeolocation()

  const props = defineProps({
    showManualInput: Boolean,
    modelValue: {
      type: Object as PropType<Geolocation>,
      default: () => {
        return { latitude: undefined, longitude: undefined }
      },
    },
    tileLayer: {
      type: String,
      default: "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
    },
    onError: Function,
    immediate: Boolean,
  })
  const emit = defineEmits(["update:modelValue"])

  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })

  const inputStyle = useInputStyle()

  const toGeolocation = (value: any) => {
    if (!value) {
      return {
        latitude: undefined,
        longitude: undefined,
      }
    }

    if (value.latitude) {
      return value
    }

    if (value.lat) {
      return {
        latitude: value.lat,
        longitude: value.lng,
      }
    }

    if (Array.isArray(value)) {
      return {
        latitude: value[0],
        longitude: value[1],
      }
    }

    return value
  }

  const toArrayGeolocation = (value: any) => {
    if (!value) {
      return [undefined, undefined]
    }

    if (value.latitude) {
      const _latitude = String(value.latitude)
      const _longitude = String(value.longitude)

      return [Number(_latitude), Number(_longitude)]
    }

    if (value.lat) {
      const _latitude = String(value.lat)
      const _longitude = String(value.lng)

      return [Number(_latitude), Number(_longitude)]
    }

    if (Array.isArray(value)) {
      return value
    }
    console.log(value)
  }

  const isOnUserLocation = computed(
    () =>
      toArrayGeolocation(mapCenter.value) ===
      toArrayGeolocation(userLocation.value)
  )

  const map = ref()
  const zoom = ref(13.5)

  const defaultGeolocation = [-3.320303, 114.595299]
  const mapCenter = ref(
    modelValueRef.value?.latitude
      ? toArrayGeolocation(modelValueRef.value)
      : defaultGeolocation
  )

  const userLocation = ref(undefined)

  const handleMapClick = (event: any) => {
    const latlng = event.latlng

    if (!latlng) return

    const { lat, lng } = latlng
    const location = { latitude: lat, longitude: lng }

    modelValueRef.value = location
    mapCenter.value = [lat, lng]
  }
  const handleZoom = (zoomValue: number) => {
    zoom.value = zoomValue
  }

  const convertedModelValue = computed(() => {
    if (!modelValueRef.value || !modelValueRef.value?.latitude)
      return [undefined, undefined]

    return toArrayGeolocation(modelValueRef.value)
  })

  const moveToDestination = () => {
    mapCenter.value = toArrayGeolocation(modelValueRef.value)
  }

  const moveToUserLocation = () => {
    mapCenter.value = toArrayGeolocation(userLocation.value)
  }

  const setModelValueToUserLocation = () => {
    modelValueRef.value = toGeolocation(userLocation.value)
    moveToUserLocation()
  }

  const greenIcon = ref()
  const redIcon = ref()

  const initLeaflet = async () => {
    // @ts-ignore
    const { Icon } = await import("leaflet/dist/leaflet-src.esm")

    greenIcon.value = new Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

    redIcon.value = new Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }

  onBeforeMount(async () => {
    await initLeaflet()
  })

  const showLocationPermissionRequest = ref(false)
  const isTryGetLocation = ref(false)
  const isLocationAccurate = ref(true)

  const locationPermissionRequest = async () => {
    const permissionStatus = await navigator?.permissions?.query({
      name: "geolocation",
    })
    const hasPermission = permissionStatus?.state == "granted"

    if (!hasPermission) showLocationPermissionRequest.value = true
    else requestLocation()
  }

  const requestLocation = async (): Promise<any> => {
    showLocationPermissionRequest.value = false
    isTryGetLocation.value = true

    await getLocation()

    if (error.value) {
      if (props.onError) {
        props.onError?.(error.value)
      } else {
        alert(
          "Ada kesalahan, silahkan muat ulang halaman\n" + error.value?.message
        )
      }

      isTryGetLocation.value = false
      mapCenter.value = defaultGeolocation

      return
    }

    const { latitude, longitude, accuracy }: any = coords.value
    const treshold = 100
    const isAccurate = accuracy && accuracy < treshold
    isLocationAccurate.value = isAccurate
    if (isAccurate) {
      modelValueRef.value = toGeolocation([latitude, longitude])
    }
    // mapAccuration.value = accuracy

    userLocation.value = toArrayGeolocation([latitude, longitude]) as any
    mapCenter.value = toArrayGeolocation([latitude, longitude])

    isTryGetLocation.value = false
  }

  onMounted(async () => {
    if (props.immediate) {
      await locationPermissionRequest()
    }
  })
</script>

<style></style>
