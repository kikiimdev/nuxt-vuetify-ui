<template>
  <KBlock>
    <KFlex class="px-4">
      <h3 v-if="title" class="text-h6">
        {{ title }}
      </h3>
    </KFlex>
    <slot name="prepend-table" />
    <NuxtErrorBoundary>
      <slot name="table" :items="items" :total="total">
        <VDataTableServer
          :headers="headers"
          :loading="pending"
          :items="items"
          :items-length="total"
          :items-per-page="options.itemsPerPage"
          :class="tableClass"
          @update:options="updateOptions($event)"
        >
          <template
            v-for="header of headers"
            #[`item.${header.key}`]="{ item }"
          >
            <slot
              :key="`item.${header.key}`"
              :name="`item.${header.key}`"
              :item="item"
              :header="header"
            >
              <div :class="header.class">
                {{ getValue(item, header) }}
              </div>
            </slot>
          </template>
        </VDataTableServer>
      </slot>
      <template #error="{ error }">
        <div>
          <p>Oops, it looks like the video player broke :/</p>
          <p>{{ error.message }}</p>
          <p><button @click="recoverFromError(error)">Go back home</button></p>
        </div>
      </template>
    </NuxtErrorBoundary>
    <slot name="append-table" />
  </KBlock>
</template>

<script setup lang="ts">
  import { VDataTableServer } from "vuetify/lib/labs/components"

  const props = defineProps({
    title: String,
    url: String,
    headers: Array as PropType<any[]>,
    dataKey: {
      type: String,
      default: "results",
    },
    totalKey: {
      type: String,
      default: "total",
    },
    query: {
      type: Object as PropType<any>,
      default: () => {
        return {}
      },
    },
    tableClass: {
      type: String,
    },
  })

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
  })

  const updateCount = ref(0)
  const updateOptions = (newOptions: any) => {
    if (updateCount.value > 0) {
      options.value = newOptions
    }
    updateCount.value++
  }

  const urlQuery = computed(() => {
    const usedQuery = {
      page: options.value.page,
      itemsPerPage: options.value.itemsPerPage,
      ...props.query,
    }

    if (options.value.sortBy?.length) {
      const _sortBy: any = options.value.sortBy[0]
      usedQuery.sortBy = `${_sortBy.key}:${_sortBy.order}`
    }

    return usedQuery
  })

  const { data, pending, refresh } = await useFetch<any>(props.url!, {
    query: urlQuery,
    watch: [urlQuery],
    async onRequest({ request, options }) {
      // Log request
      // console.log("[fetch request]", request, options)
    },
    async onRequestError({ request, options, error }) {
      // Log error
      console.log("[fetch request error]", request, error)
    },
    async onResponse({ request, response, options }) {
      // Log response
      // console.log("[fetch response]", request, response.status, response.body)
    },
    async onResponseError({ request, response, options }) {
      // Log error
      // console.log(
      //   "[fetch response error]",
      //   request
      //   // response.status
      //   // response.body
      // )
      // console.error({ data: response._data })
      throw createError(response._data)
    },
  })

  const items = computed(() => {
    const selectedData = props.dataKey ? data.value[props.dataKey] : data.value
    if (!selectedData) {
      return []
    }

    return selectedData
  })

  const total = computed(() =>
    data.value && props.totalKey ? data.value[props.totalKey] : 0
  )

  const getObjectValue = (obj: any, path: string): any => {
    if (obj === null || obj === undefined) return null
    if (!path) return obj
    const properties: any[] = path.split(".")

    return getObjectValue(obj[properties.shift()], properties.join("."))
  }

  const getValue = (item: any, header: any) => {
    let value = getObjectValue(toRaw(item.raw), header.key)
    if (header.transform) {
      value = header.transform(value)
    }

    return value
  }

  const recoverFromError = async (error: any) => {
    // await navigateTo('/');
    error.value = null
  }

  defineExpose({
    refresh,
  })
</script>

<style></style>
