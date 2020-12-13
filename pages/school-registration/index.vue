<template>
  <v-sheet class="container pb-16">
    <v-row align="center" class="mb-8">
      <v-col cols="12">
        <div class="text--headline text-h4 hidden-xs-only">
          {{ headline }}
        </div>
        <div class="text--headline text-h3 hidden-sm-and-up">
          {{ headlineMobile }}
        </div>

        <div class="text--primary text-body my-5">
          {{ subtitle }}
        </div>
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(on_submit)">
            <validation-provider v-slot="{ valid, errors }" name="name" rules="required">
              <v-text-field
                v-model.lazy="forms.name"
                :success="valid"
                :loading="loading"
                :disabled="loading"
                :error-messages="errors"
                solo
                rounded
                clearable
                append-icon="mdi-magnify"
                placeholder="Input sekolah / tempat kursus"
                @click:append="handleSubmit(on_submit)"
              />
            </validation-provider>
          </form>
        </validation-observer>
        <div v-show="resultDetail.old_value" class="text--primary text-body">
          Hasil untuk <strong> {{ resultDetail.old_value }} </strong> ({{ resultDetail.school_count }} data)
        </div>
      </v-col>
    </v-row>

    <!-- <v-row v-show="resultData.length" align="center">
      <v-col v-for="(item, index) in resultData" :key="index" cols="12" sm="6" md="4">
        <lazy-card
          :img-source="getImage(item.name, 'school')"
          :img-attrs="{ height: 200, contain: true }"
          @on-click-card="!item.user ? $router.push({path: 'school-registration/get-access', query: { school: item.uuid }}) : to_login_operator()"
        >
          <v-card-title
            class="d-inline-block text-truncate"
            style="max-width: 330px;"
          >
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>{{ item.address }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              large
              rounded
              color="primary"
              class="mx-auto"
              width="297"
              :nuxt="!item.user"
              :to="!item.user ? { path: 'school-registration/get-access', query: { school: item.uuid } } : false"
              :link="item.user"
              :href="!item.path ? 'https://operator.edukasiplus.com/' : false"
            >
              {{ item.user ? 'Login' : 'Dapatkan Akses' }}
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center">
            {{ item.user ? textUserFound : textUserNotFound }}
          </v-card-text>
        </lazy-card>
      </v-col>
    </v-row> -->

    <v-data-iterator
      :items="resultData"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
    >
      <template v-slot:default="{ items }">
        <v-row align="center">
          <v-col v-for="item in items" :key="item.name" cols="12" sm="4">
            <lazy-card
              :loading="loading"
              :img-source="getImage(item.name, 'school')"
              :img-attrs="{ height: 200, contain: true }"
              @on-click-card="!item.user ? $router.push({ path: 'school-registration/get-access', query: { school: item.uuid } }) : to_login_operator()"
            >
              <v-card-title
                class="d-inline-block text-truncate"
                style="max-width: 330px;"
              >
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle>{{ item.address }}</v-card-subtitle>
              <v-card-actions>
                <v-btn
                  large
                  rounded
                  color="primary"
                  class="mx-auto"
                  width="297"
                  :nuxt="!item.user"
                  :to="!item.user ? { path: 'school-registration/get-access', query: { school: item.uuid } } : false"
                  :link="item.user"
                  :href="!item.path ? 'https://operator.edukasiplus.com/' : false"
                >
                  {{ item.user ? 'Login' : 'Dapatkan Akses' }}
                </v-btn>
              </v-card-actions>
              <v-card-text class="text-center">
                {{ item.user ? textUserFound : textUserNotFound }}
              </v-card-text>
            </lazy-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row align="center">
          <v-spacer />
          <v-col v-show="resultData.length" cols="6">
            Page {{ page }} of {{ numberOfPages }}
          </v-col>

          <v-col v-show="resultData.length" cols="6">
            <v-pagination
              v-model="page"
              circle
              class="ml-auto my-4"
              :length="numberOfPages"
              :total-visible="7"
              @input="on_click_input"
              @next="on_click_next"
              @previous="on_click_prev"
            />
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <v-row v-show="init" align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-divider class="mb-5" />
        <div class="text--primary text-body mb-10">
          Tidak Menemukan Data Sekolah/Tempat Kursus? Klik button dibawah untuk daftarkan sekolah/tempat kursus
        </div>
        <v-btn
          nuxt
          large
          rounded
          color="white"
          class="btn-primary-registration font-weight-black"
          to="/school-registration/get-access"
        >
          Daftarkan sekolah/tempat kursus
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-show="!init && !resultData.length" align="center" justify="center" class="mt-5">
      <v-col cols="12" class="text-center">
        <div class="text--primary text-body" v-html="notFoundData" />
      </v-col>
      <v-col cols="auto" class="align-center">
        <v-img
          :src="require('~/assets/img/close-outline.png?webp')"
          :lazy-src="require('~/assets/img/close-outline.png?webp')"
          max-width="100"
        />
      </v-col>
      <v-col cols="12" align-self="center" class="text-center mt-3">
        <v-btn
          dark
          rounded
          large
          width="343"
          nuxt
          to="/school-registration/get-access"
          :color="colors.darkBlueEduPlus"
        >
          Dapatkan akses
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import _ from 'lodash'
import { mdiCloseCircleOutline } from '@mdi/js'
import * as Colors from '~/utils/colors'
import getImage from '~/utils/imagesCard'

export default {
  data: () => ({
    init: true,
    colors: Colors,
    headline: 'Daftarkan Sekolah',
    headlineMobile: 'Daftarkan Sekolah / Tempat Kursus',
    subtitle: 'Cari sekolah / Tempat Kursus disini',
    textUserFound: 'Sekolah ini sudah memilik operator, silahkan login untuk mengubah data di sekolah ini',
    textUserNotFound: 'Klik tombol dapatkan akses untuk mengubah data di sekolah ini',
    notFoundData: 'Data sekolah/Tempat kursus tidak ditemukan. Klik tombol<br/>dibawah untuk daftarkan sekolah/tempat kursus',

    resultData: [],
    resultDetail: {},
    page: 1,
    itemsPerPage: 15,

    loading: false,
    forms: {
      name: ''
    },
    current_forms: {
      name: ''
    },
    iconClose: mdiCloseCircleOutline
  }),
  computed: {
    observer () { return this.$refs.observer },
    numberOfPages () {
      return Math.ceil(this.resultDetail.school_count / this.itemsPerPage)
    }
  },
  watch: {
    resultDetail (newVal) {
      this.page = newVal.data.current_page
      this.itemsPerPage = newVal.data.per_page
    }
  },
  methods: {
    async on_submit () {
      this.loading = true
      await this.$axios.$post('/api/search/schools', this.forms)
        .then((response) => {
          this.resultDetail = response
          this.resultData = response && response.data.data
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.loading = false
          this.init = false
          this.clear()
        })
    },
    clear () {
      this.observer.reset()
      this.current_forms = _.assign(this.current_forms, this.forms)
      this.forms = { name: '' }
    },
    to_login_operator () {
      location.assign('https://operator.edukasiplus.com')
    },
    getImage (args, context) { return getImage(args, context) },

    async on_click_input (page) {
      const { data } = this.resultDetail
      await this.pagination_search(`${data.path}?page=${page}`)
    },

    async on_click_next () {
      const { data } = this.resultDetail
      await this.pagination_search(data.next_page_url)
    },

    async on_click_prev () {
      const { data } = this.resultDetail
      await this.pagination_search(data.prev_page_url)
    },

    async pagination_search (context) {
      this.loading = true
      await this.$axios.$post(context, this.current_forms)
        .then((response) => {
          this.resultDetail = response
          this.resultData = response && response.data.data
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$darkBlue: #1A6EB2;
.text--headline {
  color: $darkBlue;
}
.btn-primary-registration {
  ::v-deep .v-btn__content {
    color: $darkBlue;
  }
}
</style>
