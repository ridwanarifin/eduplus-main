<template>
  <v-container class="mx-auto">
    <div>
      <div v-show="!hideHeadline" class="text-h4">
        {{ headline }}
      </div>
      <v-row align="center">
        <v-col class="px-0" cols="12">
          <v-tabs v-model="tab" :show-arrows="$vuetify.breakpoint.mobile" hide-slider>
            <v-tab
              v-for="item in tabItems"
              :key="item.value"
              :href="'#' + item.value"
              active-class="v-btn v-btn--contained v-btn--rounded theme--dark v-size--default primary"
              @change="on_click_tab(item.value)"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col class="px-0" cols="12">
          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="item in tabItems"
              :key="item.value"
              :value="item.value"
            >
              <v-row v-if="loading">
                <v-col v-for="d in 8" :key="d" cols="12" sm="3">
                  <v-skeleton-loader type="card" />
                </v-col>
              </v-row>
              <v-data-iterator
                v-else
                :items="schools"
                item-key="name"
                :items-per-page="8"
              >
                <template v-slot:default="{ items }">
                  <v-row align="center">
                    <v-col v-for="d in items" :key="d.name" cols="12" sm="3">
                      <slot name="card" v-bind="{ data: { item: d, items: schools } }" />
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { tabItems } from '~/utils/headers'
import getImage from '~/utils/imagesCard'

export default {
  props: {
    data: { type: [Array, Boolean], required: true, default: false },
    tabItems: { type: Array, default: () => tabItems },
    placeholderContext: { type: String, default: 'green' },
    hideHeadline: { type: Boolean, default: false },
    loading: { type: Boolean, default: true }
  },
  data () {
    return {
      headline: 'Sekolah Favorit',
      tab: null
    }
  },
  computed: {
    ...mapState({
      schools: s => s.schools
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.__init__()
    })
  },
  methods: {
    __init__ () {
      this.on_click_tab('sd')
    },
    on_click_tab (context) {
      this.$emit('on-click-tab', context)
    },
    on_click_card (args) {
      this.$emit('on-click-card', args)
    },
    getImage: (args, ctx) => getImage(args, ctx)
  }
}
</script>
