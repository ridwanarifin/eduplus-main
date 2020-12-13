<template>
  <v-footer
    dark
    class="py-5 px-3 px-sm-10"
    :color="colors.blueEduplus"
  >
    <v-row no-gutters align="center" justify="space-between" class="mx-auto">
      <v-col cols="12" sm="6">
        <v-img
          :src="require('~/static/icon.png?webp')"
          :lazy-src="require('~/static/icon.png?webp')"
          max-width="138"
          max-height="52"
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

        <div class="mt-5 text-sm-body-1" v-html="headline" />
      </v-col>

      <v-col align-self="end" cols="12" sm="6" class="d-flex justify-end">
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
      </v-col>

      <v-col cols="12" class="mt-4 pt-5">
        <v-divider :style="{borderWidth: '1px', borderColor: 'rgba(255, 255, 255, 0.5)'}" />
        <div class="mt-4 d-flex align-center justify-center">
          {{ $moment().format('YYYY') }} <v-icon class="mx-1" size="15">
            {{ icons[0] }}
          </v-icon> Edu<v-icon size="15">
            {{ icons[1] }}
          </v-icon>. All rights reserved.
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mdiCopyright, mdiPlus } from '@mdi/js'
import * as Colors from '~/utils/colors'
export default {
  data: () => ({
    colors: Colors,
    icons: [mdiCopyright, mdiPlus],
    headline: 'Cari sekolah favorit untuk masa depan yang cerah <br class="hidden-xs-only">semua ada di EDUKASI PLUS',
    data: [{
      name: 'Home',
      path: '/'
    }, {
      name: 'Cari Sekolah',
      path: '/search'
    }, {
      name: 'Hubungin Kami',
      path: '/contact-us'
    }, {
      name: 'Login',
      path: false
    }, {
      name: 'Daftarkan Sekolah Anda',
      path: '/school-registration'
    }]
  })
}
</script>
