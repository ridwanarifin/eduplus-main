<template>
  <v-card
    :to="to"
    :disabled="loading"
    :loading="loading"
    tile
    nuxt
    rounded
    @click.prevent="$emit('on-click-card')"
  >
    <lazy-image
      :source="imgSource"
      v-bind="imgAttrs"
    />

    <slot>
      <v-card-title class="text-truncate">
        {{ title }}
      </v-card-title>
      <v-card-subtitle>
        {{ subTitle }}
      </v-card-subtitle>
    </slot>
  </v-card>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Boolean],
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    imgSource: {
      type: String,
      required: true
    },
    imgAttrs: {
      type: Object,
      default: () => ({
        width: 200,
        height: 200
      })
    }
  }
}
</script>

<style>

</style>
