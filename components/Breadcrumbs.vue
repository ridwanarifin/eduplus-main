<template>
  <v-container class="px-6 px-md-0">
    <v-breadcrumbs
      v-show="getBreadcrumb.length"
      :items="getBreadcrumb"
      large
    >
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          nuxt
          ripple
          v-bind="item"
          class="text-capitalize"
        >
          {{ capitalize(item.name) }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-container>
</template>

<script>
import _ from 'lodash'
export default {
  computed: {
    getBreadcrumb () {
      return this.$store.state.breadcrumbs
    }
  },
  methods: {
    capitalize: args => _.capitalize(args)
  }
}
</script>
