<template>
  <v-img
    :src="source"
    :lazy-src="source"
  >
    <template #placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        />
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: true
    }
  }
}
</script>
