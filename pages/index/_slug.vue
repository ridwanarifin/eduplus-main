<template>
  <div>
    <secondary-jumbotron :title="title" :sub-title="subtitle" />
    <v-container>
      <breadcrumbs />
      <list-sekolah :loading="isLoading" placeholder-context="blue" :hide-headline="true" @on-click-tab="onClickTab">
        <template #card="{ data: { item } }">
          <card
            :title="item.name"
            :sub-title="item.address"
            :img-source="getImage(item.name, 'blue')"
            :img-attrs="{
              height: 200,
              contain: true
            }"
            @on-click-card="onClickCard(item)"
          />
        </template>
      </list-sekolah>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import getImage from '~/utils/imagesCard'
import ListSekolah from '~/components/ListSekolah.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import SecondaryJumbotron from '~/components/SecondaryJumbotron.vue'

export default {
  components: {
    Breadcrumbs,
    ListSekolah,
    SecondaryJumbotron
  },
  middleware ({ route, store }) {
    const crumbs = [{
      to: '/',
      exact: true,
      name: 'Home'
    }, {
      to: route.fullPath,
      exact: true,
      name: _.upperCase(route.params.slug)
    }]
    store.commit('setCrumbs', crumbs)
  },
  fetch () {
    const title = _.upperCase(this.$route.params.slug)
    this.title = title
  },
  fetchOnServer: false,
  data: () => ({
    title: '',
    subtitle: 'Sekolah Favorit',
    dataSource: [],
    isLoading: false
  }),
  methods: {
    async onClickTab (context) {
      try {
        this.isLoading = true
        const slug = _.upperCase(this.$route.params.slug)
        const { id } = this.$store.getters.getProvByName(slug)
        const { school } = await this.$axios.$get(`/api/favorite/${id}/${context}`)
        this.dataSource = _.orderBy(school, ['name'], ['asc'])
        this.$store.commit('setSchool', _.orderBy(school, ['name'], ['asc']))
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    onClickCard (args) {
      // this.$router.push(`${_.kebabCase(this.$route.params.slug)}/${_.kebabCase(`${args.id}-${args.name}`)}`)
      this.$router.push(`/school/${args.uuid}`)
    },
    getImage: (args, ctx) => getImage(args, ctx)
  }
}
</script>

<style>

</style>
