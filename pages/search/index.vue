<template>
  <v-sheet color="#FAFAFA" min-height="100vh">
    <v-container>
      <breadcrumbs />
    </v-container>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-h4 text-center" :style="{color: '#1A6EB2'}">
          Cari nama sekolah
        </div>

        <v-container class="mx-auto mt-10">
          <single-search-form :loading="isPending" @on-submit="on_submit_single_search" />
        </v-container>
      </v-col>

      <v-col cols="12" class="px-0">
        <v-row align="center" justify="center" class="mx-auto container">
          <v-col cols="12">
            <div class="mt-16 text-h4 text-center" :style="{color: '#1A6EB2'}">
              Atau Cari Sesuai Alamat
            </div>
          </v-col>

          <v-col cols="12" class="px-0 mt-5">
            <search-form
              :loading="isPending"
              @on-submit="on_submit"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import _ from 'lodash'
import SingleSearchForm from '~/components/forms/SingleSearchForm.vue'
import SearchForm from '~/components/forms/SearchForm.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

export default {
  components: {
    SingleSearchForm,
    SearchForm,
    Breadcrumbs
  },
  meta: {
    crumbs: [{
      name: 'Home',
      to: '/',
      exact: true
    }, {
      name: 'Cari Sekolah',
      to: '/search',
      exact: true
    }]
  },
  data () {
    return {
      forms_single: {
        name: ''
      },
      forms: {
        province: '',
        regency: '',
        district: '',
        village: '',
        stage: '',
        status: ''
      }
    }
  },
  computed: {
    isPending () {
      return this.$store.getters['search/isPending']
    }
  },
  methods: {
    async on_submit_single_search (formData) {
      try {
        this.forms_single = _.assign(this.forms_single, formData)
        await this.$store.dispatch('search/searchByName', this.forms_single)
      } finally {
        this.$router.push('/search/result')
      }
    },
    async on_submit (formData) {
      // this.forms.search = search
      try {
        this.forms = _.assign(this.forms, formData)
        await this.$store.dispatch('search/searchSchool', this.forms)
      } finally {
        this.$router.push('/search/result')
      }
    }
  }
}
</script>
