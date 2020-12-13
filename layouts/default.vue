<template>
  <v-app>
    <!-- Navigation drawer -->
    <navigation-drawer
      :drawer="drawer"
      :mini-variant="miniVariant"
      :data="items"
    />
    <!-- end Navigation drawer -->

    <!-- Appbar -->
    <app-bar
      :title="title"
      :data="items"
      :drawer="drawer"
      :mini-variant="miniVariant"
      @on-click-drawer="drawer = !drawer"
      @on-click-mini-variant="miniVariant = !miniVariant"
    />

    <!-- Main -->
    <v-main class="pr-sm-0">
      <nuxt />
    </v-main>
    <!-- end Main -->

    <!-- Footer -->
    <Footer />
    <!-- end Footer -->
  </v-app>
</template>

<script>
import {
  mdiHomeOutline,
  mdiSearchWeb,
  mdiContactsOutline,
  mdiLogin
} from '@mdi/js'
import NavigationDrawer from '~/components/NavigationDrawer.vue'
import AppBar from '~/components/AppBar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    NavigationDrawer,
    AppBar,
    Footer
  },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [{
        name: 'Home',
        icon: mdiHomeOutline,
        path: '/'
      }, {
        name: 'Cari Sekolah',
        icon: mdiSearchWeb,
        path: '/search'
      }, {
        name: 'Hubungin Kami',
        icon: mdiContactsOutline,
        path: '/contact-us'
      }, {
        name: 'Login',
        icon: mdiLogin,
        path: false
      }],
      miniVariant: false,
      title: 'eduplus +'
    }
  }
}
</script>
