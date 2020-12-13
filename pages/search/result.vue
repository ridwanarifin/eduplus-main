<template>
  <v-sheet>
    <breadcrumbs />
    <v-container>
      <div class="mt-5 text-h4" :style="{color: colors.primary}">
        <!-- Daftar {{ getStage(response.stage) }} {{ getStatus(response.status) }} -->
      </div>

      <div class="text--secondary mt-5">
        {{ renderContextSearch() }}
      </div>

      <v-divider class="mt-3" />
    </v-container>

    <v-row no-gutters align="center" class="mx-auto container">
      <v-col cols="12" sm="4" class="px-0">
        <v-row align="center">
          <v-col cols="6">
            <v-btn text color="primary" @click.stop="asc = !asc">
              <v-icon class="mr-3">
                mdi-order-alphabetical-{{ asc ? 'ascending' : 'descending' }}
              </v-icon> Urutkan
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn text color="primary">
              <v-icon class="mr-3">
                mdi-filter-outline
              </v-icon> Filter
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="mt-3">
        <v-btn rounded color="primary">
          {{ countData() }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="center" class="mx-auto container">
      <v-col
        v-for="(item, index) in data"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <card
          :title="item.name"
          :sub-title="item.address"
          :img-source="getImage(item.name, 'school')"
          @on-click-card="$router.push(`/school/${item.uuid}`)"
        />
      </v-col>

      <v-col>
        {{ result.data.current_page }}
      </v-col>

      <v-col cols="12" class="pt-15 pb-5">
        <v-pagination
          v-model.lazy="result.current_page"
          circle
          :length="pagination_length"
          :total-visible="7"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          @input="on_click_input"
          @next="on_click_next"
          @previous="on_click_prev"
        />
      </v-col>
    </v-row>

    <div class="container mx-auto text-center mt-5">
      <v-btn
        to="/search"
        replace
        rounded
        large
        nuxt
        color="primary"
      >
        Cari Sekolah Lainnya
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import * as Colors from '~/utils/colors'
import { getStage } from '~/utils/stageSchools'
import getImage from '~/utils/imagesCard'

import Breadcrumbs from '~/components/Breadcrumbs.vue'
// import Card from '~/components/Card.vue'

export default {
  components: { Breadcrumbs },
  meta: {
    crumbs: [{
      name: 'Home',
      to: '/',
      exact: true
    }, {
      name: 'Cari Sekolah',
      to: '/search',
      exact: true
    }, {
      name: 'Hasil Pencarian',
      to: '/search/result',
      exact: true
    }]
  },
  data () {
    return {
      colors: Colors,
      asc: true
    }
  },
  computed: {
    ...mapState({
      result: state => state.search.result,
      contextSearch: state => state.search.contextSearch
    }),
    data () {
      const newData = this.result && this.result.data
      return this.asc ? _.orderBy(newData, ['name'], ['asc']) : _.orderBy(newData, ['name'], ['desc'])
    },
    pagination_length () {
      return Math.ceil(this.result.total / this.result.per_page)
    }
  },
  methods: {
    getImage: (args, ctx) => getImage(args, ctx),
    getStage (args) { return getStage(args).text },
    getStatus (args) {
      // eslint-disable-next-line
      if (_.parseInt(args))
        return 'Negeri'
      return 'Swasta'
    },
    countData () {
      const { data } = this.result
      const stage = this.contextSearch.stage && _.capitalize(getStage(this.contextSearch.stage).value)
      if (_.isEmpty(data)) {
        return 'No data available'
      } else if (stage) {
        return `${this.result.total} ${stage} Ditemukan`
      } else {
        return `${this.result.total} Sekolah Ditemukan`
      }
    },
    renderContextSearch () {
      const result = []
      _.each(this.contextSearch, (value, key) => {
        if (_.isPlainObject(value)) {
          if (!value.name) {
            return
          }
          if (key === 'village') {
            result.push(value.name)
          } else if (key === 'district') {
            result.push(value.name)
          } else if (key === 'regency') {
            result.push(value.name)
          } else {
            result.push(value.name)
          }
        }
      })
      return _.join(_.reverse(result), ', ')
    },
    async on_click_next () {
      await this.paginationSearch(this.result.next_page_url)
    },
    async on_click_prev () {
      await this.paginationSearch(this.result.prev_page_url)
    },
    async on_click_input (page) {
      await this.paginationSearch(`${this.result.path}?page=${page}`)
    },
    async paginationSearch (context) {
      await this.$store.dispatch('search/searchPagination', context)
    }
  }
}
</script>

<style>

</style>
