<template>
  <div>
    <breadcrumbs />
    <v-container>
      <carousel :data="data.images" />

      <v-row no-gutters class="mt-16" align="center">
        <v-col cols="12">
          <div class="text-h6 font-weight-bold text-capitalize">
            {{ data.name }}
          </div>
          <div class="text-body">
            {{ data.address }}
          </div>
          <div class="mt-6">
            <v-icon class="mr-6" color="primary">
              mdi-book-open-page-variant-outline
            </v-icon> Kurikulum {{ data.curriculum || '-' }}
          </div>
        </v-col>

        <v-col cols="12" class="mt-16">
          <v-tabs v-model="tab" hide-slider>
            <v-tab v-for="(item, index) in tabItems" :key="index" :href="`#tab-${index}`" active-class="v-btn v-btn--contained v-btn--rounded theme--dark v-size--default primary">
              {{ item }}
            </v-tab>
          </v-tabs>
        </v-col>

        <v-col cols="12" class="mt-10">
          <v-tabs-items v-model="tab">
            <!-- kontak sekolah -->
            <v-tab-item value="tab-0" transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
              <v-row class="pl-0">
                <v-col cols="12">
                  <v-icon color="primary" class="mr-4">
                    mdi-phone-in-talk-outline
                  </v-icon> {{ data.phone_number || '-' }}
                </v-col>

                <v-col cols="12">
                  <v-icon color="primary">
                    mdi-email-outline
                  </v-icon> {{ data.email || '-' }}
                </v-col>

                <v-col cols="12">
                  <v-icon color="primary">
                    mdi-web
                  </v-icon> {{ data.website || '-' }}
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- end kontak sekolah -->

            <!-- informasi sekolah -->
            <v-tab-item value="tab-1">
              <v-row class="pl-0">
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Kepala Sekolah
                  </div>
                  <div class="text-primary">
                    {{ data.user || '-' }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Jumlah Siswa
                  </div>
                  <div class="text-primary">
                    {{ data.total_student || '-' }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Akreditasi
                  </div>
                  <div class="text-primary">
                    {{ data.accreditation || '-' }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Status
                  </div>
                  <div class="text-primary">
                    {{ data.status }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Jam Sekolah
                  </div>
                  <div>-</div>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- end informasi sekolah -->

            <!-- biaya sekolah -->
            <v-tab-item value="tab-2">
              <v-row class="pl-0">
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Uang Pangkal
                  </div>
                  <div class="text-primary">
                    Rp -
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    SPP Bulanan
                  </div>
                  <div class="text-primary">
                    Rp -
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Uang Kegiatan
                  </div>
                  <div class="text-primary">
                    Rp -
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Uang Buku
                  </div>
                  <div class="text-primary">
                    Rp -
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Potongan / Diskon
                  </div>
                  <div class="text-primary">
                    -
                  </div>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- end biaya sekolah -->

            <!-- pendaftaran -->
            <v-tab-item value="tab-3">
              <v-row class="ml-0">
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Pendaftaran
                  </div>
                  <div class="text-primary">
                    -
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Pengumuman
                  </div>
                  <div class="text-primary">
                    -
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body text-grey">
                    Daftar Ulang
                  </div>
                  <div class="text-primary">
                    -
                  </div>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- end pendaftaran -->

            <!-- fasilitas -->
            <v-tab-item value="tab-4">
              <div v-if="data.facilities && !data.facilities.length">
                -
              </div>
              <ul v-else>
                <li v-for="(d, index) in data.facilities" :key="index">
                  {{ d }}
                </li>
              </ul>
            </v-tab-item>
            <!-- end fasilitas -->

            <!-- ekstrakulikuler -->
            <v-tab-item value="tab-5">
              <div v-if="data.extracurricular && !data.extracurricular.length">
                -
              </div>
              <ul v-else>
                <li v-for="(d, index) in data.extracurricular" :key="index">
                  {{ d }}
                </li>
              </ul>
            </v-tab-item>
            <!-- end ekstrakulikuler -->
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import Carousel from '~/components/Carousel.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

export default {
  components: { Carousel, Breadcrumbs },
  middleware ({ route, store }) {
    store.commit('setCrumbs', [{
      to: '/',
      exact: true,
      name: 'Daftar Sekolah'
    }, {
      to: route.path,
      exact: true,
      name: 'Detail Sekolah'
    }])
  },
  async fetch () {
    const slug = this.$route.params.detil
    const response = await this.$axios.$get(`/api/schools/${slug}`)
    if (response && _.isEmpty(response.images)) {
      _.each(_.range(2), (d) => {
        response.images.push(require('~/assets/img/placeholder-school.png?webp'))
      })
    }
    this.data = response
    return { slug }
  },
  fetchOnServer: false,
  data () {
    return {
      tab: null,
      tabItems: [
        'Kontak Sekolah',
        'Informasi Sekolah',
        'Biaya Sekolah',
        'Pendaftaran',
        'Fasilitas',
        'Ekstakuliner'
      ],
      data: {}
    }
  },
  methods: {
    get_status_sekolah (args) {
      // if (!args) {
      //   return 'Swasta'
      // }
      // return 'Negeri'
      return args
    }
  }
}
</script>
