<template>
  <div>
    <secondary-jumbotron :title="title" :sub-title="subtitle" />
    <breadcrumbs />
    <v-container>
      <list-sekolah :data="dataSource" :hide-headline="true" placeholder-context="blue" @on-click-tab="on_click_tab">
        <template #card="{ data: { school: { uuid, name, address }} }">
          <v-spacer />
          <card
            :title="name"
            :sub-title="address"
            :img-source="get_image(name)"
            @on-click-card="on_click_card({ uuid, name })"
          />
        </template>
      </list-sekolah>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import getImage from '~/utils/imagesCard'
import Card from '~/components/Card.vue'
import ListSekolah from '~/components/ListSekolah.vue'
import SecondaryJumbotron from '~/components/SecondaryJumbotron.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

export default {
  components: { ListSekolah, Card, SecondaryJumbotron, Breadcrumbs },
  middleware ({ route, store, params }) {
    // eslint-disable-next-line
    const [id, slug] = _.split(params.slug, '-')
    const crumbs = [{
      to: '/',
      exact: true,
      name: 'Home'
    }, {
      to: `/${params.prov}`,
      exact: true,
      name: _.upperCase(params.prov)
    }, {
      to: route.fullPath,
      exact: true,
      name: _.upperCase(slug)
    }]
    store.commit('setCrumbs', crumbs)
  },
  async fetch () {
    // eslint-disable-next-line
    const [idKota, titleSlug] = _.split(this.$route.params.slug, '-')
    this.title = _.upperCase(titleSlug)
    if (!_.isEmpty(this.$store.state.province)) {
      return
    }
    const prov = this.$route.params.prov
    const response = this.$store.getters.getProvAndKotaByProvName(_.upperCase(prov))
    response && await this.$axios.$get(`/api/search/get-regency/${response.id}`)
      .then((response) => {
        this.$store.commit('setRegency', { regency: response.data })
      })
  },
  fetchOnServer: false,
  data () {
    return {
      dataSource: [],
      title: '',
      subtitle: 'Sekolah Favorit'
    }
  },
  computed: {
    regency () {
      return this.$store.state.regency
    }
  },
  methods: {
    on_click_tab (args) {
      // eslint-disable-next-line
      const [id, kota] = _.split(this.$route.params.slug, '-')
      const stage = _.upperCase(args)
      this.post_get_fav_school({ stage, regency: id, desc: true })
    },
    on_click_card ({ uuid, name }) {
      // eslint-disable-next-line
      const [id, kota] = _.split(this.$route.params.slug, '-')
      this.$router.push(`/school/${uuid}`)
    },
    async post_get_fav_school (args) {
      const { data } = await this.$axios.$post('/api/search/favorite', args)
      this.dataSource = data
    },
    get_image: args => getImage(args, 'school')
  }
}
</script>

<style>

</style>
