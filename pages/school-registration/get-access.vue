<template>
  <v-sheet color="#FAFAFA" class="pb-16">
    <breadcrumbs />
    <div class="text-h4 my-10 text-center text-dark-blue">
      Dapatkan Akses
    </div>
    <v-container>
      <get-access-form :uuid="uuid" @on-submit="on_submit" />
      <div class="mt-6 mx-auto text-center text--primary text-body-1">
        Pihak Eduplus melalui email <strong><a class="text--primary" :href="`mailto:${mail}`">{{ mail }}</a></strong> atau no. telp. <strong><a class="text--primary" :href="`https://api.whatsapp.com/send?phone=${phoneTrim}`">{{ phone }}</a></strong> akan segera <br class="hidden-xs-only">
        menghubungi anda untuk melakukan verifikasi lebih lanjut, Terimakasih
      </div>
    </v-container>
  </v-sheet>
</template>

<script>
import _ from 'lodash'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import GetAccessForm from '~/components/forms/GetAccessForm.vue'

export default {
  meta: {
    crumbs: [{
      name: 'Home',
      to: '/',
      exact: true,
      replace: true
    }, {
      name: 'Pencarian Sekolah',
      to: '/school-registration',
      exact: true
    }, {
      name: 'Dapatkan Akses',
      to: '/school-registration/get-access',
      exact: true,
      disable: true
    }]
  },
  watchQuery: true,
  components: { Breadcrumbs, GetAccessForm },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    return { uuid: query.school && query.school }
  },
  data: () => ({
    mail: 'halo@eduplus.com',
    phone: '+62 815 8668 1826',
    uuid: false
  }),
  computed: {
    phoneTrim () {
      return _.replace(this.phone, /\s/g, '')
    }
  },
  methods: {
    on_submit (args) {
      console.log(args)
    }
  }
}
</script>

<style>
</style>
