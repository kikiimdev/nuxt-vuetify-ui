<template>
  <VForm>
    <VRow no-gutters>
      <VCol
        v-for="(schema, index) in schemas"
        :key="`${schema.inputType}-${index + 1}`"
        v-bind="schema"
        :cols="schema.cols || 12"
      >
        <VCard
          v-if="schema.schemas"
          :variant="hideExpandRef[schema.model + index] ? 'tonal' : 'outlined'"
          v-bind="schema"
          class="mb-6"
        >
          <template #title>
            <KFlex
              @click="
                hideExpandRef[schema.model + index] =
                  !hideExpandRef[schema.model + index]
              "
              class="align-center tw-cursor-pointer"
            >
              <div class="text-h6">{{ schema.label }}</div>
              <VSpacer />
              <VIcon
                :icon="
                  hideExpandRef[schema.model + index]
                    ? 'mdi-chevron-down'
                    : 'mdi-chevron-up'
                "
              />
            </KFlex>
          </template>

          <v-expand-transition>
            <div v-show="!hideExpandRef[schema.model + index]">
              <v-divider></v-divider>

              <KInputKit
                :schemas="schema.schemas"
                v-model="modelValueRef[schema.model]"
                class="px-4"
              />
            </div>
          </v-expand-transition>
        </VCard>

        <hr v-else-if="showInput(schema, 'divider')" v-bind="schema" />
        <h1
          v-else-if="showInput(schema, 'h1')"
          v-bind="schema"
          v-html="schema.text"
        />
        <h2
          v-else-if="showInput(schema, 'h2')"
          v-bind="schema"
          v-html="schema.text"
        />
        <h3
          v-else-if="showInput(schema, 'h3')"
          v-bind="schema"
          v-html="schema.text"
        />

        <KInputSelect
          v-else-if="showInput(schema, 'select')"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
          v-model:search="schema.search"
        />
        <KInputTag
          v-else-if="showInput(schema, 'tag')"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
        />
        <KInputCurrency
          v-else-if="showInput(schema, 'currency')"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
        />
        <KInputArea
          v-else-if="showInput(schema, 'area')"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
        />
        <KInputCheckbox
          v-else-if="showInput(schema, 'checkbox')"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
        />
        <KInputRadio
          v-else-if="showInput(schema, 'radio')"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
        />
        <KInputFile
          v-else-if="showInput(schema, 'file')"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
        />
        <KInputGeolocation
          v-else-if="showInput(schema, 'geolocation')"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
        />
        <KInputText
          v-else-if="showInputText(schema)"
          v-bind="schema"
          v-model="modelValueRef[schema.model]"
        />
      </VCol>
    </VRow>
  </VForm>
</template>

<script setup lang="ts">
  const _inputType = [
    "h1",
    "h2",
    "h3",
    "area",
    "group",
    "divider",
    "select",
    "tag",
    "currency",
    "checkbox",
    "radio",
    "file",
    "geolocation",
  ] as const
  type InputType = typeof _inputType[number]

  type Schema = {
    [x: string | number]: any
    hide?: boolean
    label?: string
    model: string
    inputType?: InputType
    schemas?: Schema[]
  }

  const props = defineProps({
    schemas: {
      type: Array as PropType<Schema[]>,
      default: () => {
        return []
      },
    },
    modelValue: {
      type: Object as PropType<any>,
      default: () => {
        return {}
      },
    },
    search: String,
  })
  const emit = defineEmits(["update:modelValue"])

  const modelValueRef = computed({
    get: () => props.modelValue,
    set: (v) => emit("update:modelValue", v),
  })

  const hideExpandRef = ref<any>({})

  const showInput = (schema: Schema, inputType: InputType) => {
    return schema.inputType === inputType && !schema.hide
  }

  const showInputText = (schema: Schema) => {
    return !_inputType.includes(schema.inputType as InputType) && !schema.hide
  }
</script>

<style></style>
