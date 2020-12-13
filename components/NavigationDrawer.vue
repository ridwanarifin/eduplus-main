<template>
  <v-navigation-drawer
    v-model="drawerModel"
    :mini-variant="miniVariant"
    :color="colors.blueEduplus"
    class="hidden-sm-and-up"
    fixed
    right
    dark
    app
  >
    <!-- :clipped="clipped" -->
    <v-list>
      <v-list-item
        v-for="(item, i) in data"
        :key="i"
        :to="item.path"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
        </v-list-item-content>
      </v-list-item>

      <v-divider inset class="mx-auto my-5" style="height: 10px !important" />

      <v-list-item-action>
        <v-btn
          dark
          large
          outlined
        >
          Daftarkan Sekolah Anda
        </v-btn>
      </v-list-item-action>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import * as Colors from '~/utils/colors'

export default {
  name: 'NavigationDrawer',
  props: {
    drawer: {
      type: Boolean,
      required: true
    },
    miniVariant: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      drawerModel: this.drawer,
      variant: this.miniVariant,
      colors: Colors
    }
  },
  watch: {
    drawer (args) {
      this.drawerModel = args
    },
    miniVariant (args) {
      this.variant = args
    }
  }
}
</script>
