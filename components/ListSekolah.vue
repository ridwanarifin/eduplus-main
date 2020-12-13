<template>
  <v-container class="mx-auto">
    <div>
      <div v-show="!hideHeadline" class="text-h4">
        {{ headline }}
      </div>
      <v-row align="center">
        <v-col class="px-0" cols="12">
          <v-tabs v-model="tab" :show-arrows="$vuetify.breakpoint.mobile" hide-slider>
            <v-tab v-for="item in tabItems" :key="item.value" active-class="v-btn v-btn--contained v-btn--rounded theme--dark v-size--default primary" @click.prevent="on_click_tab(item.value)">
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col class="px-0" cols="12">
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in tabItems" :key="item.value" transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
              <v-data-iterator
                :items="data"
                item-key="name"
                :items-per-page="8"
              >
                <template v-slot:default="{ items }">
                  <v-row align="center">
                    <v-col v-for="d in items" :key="d.name" cols="12" sm="3">
                      <slot name="card" v-bind="{ data: { item: d, items: data } }" />
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
import { tabItems } from '~/utils/headers'
import getImage from '~/utils/imagesCard'

export default {
  props: {
    data: { type: [Array, Boolean], required: true, default: false },
    tabItems: { type: Array, default: () => tabItems },
    placeholderContext: { type: String, default: 'green' },
    hideHeadline: { type: Boolean, default: false }
  },
  data () {
    return {
      headline: 'Sekolah Favorit',
      tab: null
    }
  },
  mounted () {
    this.$nextTick(this.__init__())
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
