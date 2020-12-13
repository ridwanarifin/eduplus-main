<template>
  <div>
    <jumbotron />
    <headline-cari-sekolah />
    <breadcrumbs />
    <v-container>
      <list-sekolah :loading="isLoading" @on-click-tab="onClickTab">
        <template #card="{ data: { item } }">
          <card
            :title="item.name"
            :sub-title="`${item.schools.length} ${context}`"
            :img-source="getImage(item.name, 'green')"
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
import Jumbotron from '~/components/Jumbotron.vue'
import ListSekolah from '~/components/ListSekolah.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import HeadlineCariSekolah from '~/components/HeadlineCariSekolah.vue'

export default {
  components: {
    Jumbotron,
    ListSekolah,
    Breadcrumbs,
    HeadlineCariSekolah
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const stateSchool = store.state.schools
    return { schools: stateSchool }
  },
  data: () => ({
    context: '',
    isLoading: false
  }),
  methods: {
    async onClickTab (context) {
      try {
        this.isLoading = true
        this.context = _.upperCase(context)
        const { school } = await this.$axios.$get(`/api/favorite/${context}`)
        this.$store.commit('setSchool', _.orderBy(school, ['schools', 'name'], ['desc', 'asc']))
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    onClickCard (args) {
      this.$router.push(_.kebabCase(args.name))
    },
    getImage: (args, ctx) => getImage(args, ctx)
  }
}
</script>
