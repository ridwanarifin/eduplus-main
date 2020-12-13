<template>
  <v-app-bar
    :color="colors.blueEduplus"
    class="px-sm-10"
    width="100vw"
    fixed
    dark
    app
  >
    <nuxt-link to="/" exact replace>
      <img
        :src="require('@/static/icon.png?webp')"
        :srcset="require('@/static/icon.png?webp')"
        alt="logo-eduplus"
        width="100px"
      >
    </nuxt-link>
    <v-spacer />

    <v-sheet color="transparent" class="hidden-xs-only">
      <v-btn
        v-for="(item, i) in data"
        :key="i"
        :to="item.path"
        :link="!item.path"
        :nuxt="item.path"
        :href="!item.path ? 'https://operator.edukasiplus.com/' : false"
        exact
        text
      >
        {{ item.name }}
      </v-btn>

      <v-btn
        large
        light
        rounded
        nuxt
        exact
        to="/school-registration"
        color="white"
        class="btn-primary-registration font-weight-black ml-md-5"
      >
        Daftarkan sekolah anda
      </v-btn>
    </v-sheet>

    <v-sheet class="hidden-sm-and-up" color="transparent">
      <v-btn icon @click.stop="on_click_mini_variant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon @click.stop="on_click_drawer" />
    </v-sheet>
  </v-app-bar>
</template>

<script>
import * as Colors from '~/utils/colors'

export default {
  name: 'AppBar',
  props: {
    title: {
      type: String,
      required: true
    },
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
      drawerModel: false,
      variant: this.miniVariant,
      colors: Colors
    }
  },
  watch: {
    drawer (args) {
      this.drawerModel = this.drawerModel !== args && this.args
    },
    miniVariant (args) {
      this.variant = args
    }
  },
  methods: {
    on_click_drawer () {
      this.$emit('on-click-drawer')
    },
    on_click_mini_variant () {
      this.$emit('on-click-mini-variant')
    }
  }
}
</script>

<style lang="scss" scoped>
$darkBlue: #1A6EB2;
.btn-primary-registration {
  ::v-deep .v-btn__content {
    color: $darkBlue;
  }
}
</style>
