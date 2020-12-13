<template>
  <swiper
    ref="mySwiper"
    class="swiper"
    :options="swiperOptions"
    :auto-update="true"
    :auto-destroy="true"
    :delete-instance-on-destroy="true"
    :cleanup-styles-on-destroy="true"
  >
    <slot name="slideItem" :data="{ dataSource }">
      <swiper-slide v-for="(item, index) in dataSource" :key="index">
        <v-skeleton-loader v-if="!item" type="image" width="1105" height="400" />
        <v-img v-else :src="item" :lazy-src="item" max-width="1105" max-height="400">
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
    </slot>
  </swiper>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    swiperOptions: {
      type: Object,
      default: () => ({
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  },
  data () {
    return {
      dataSource: this.data
    }
  },
  computed: {
    swiper () { return this.$refs.mySwiper.$swiper }
  },
  watch: {
    data (newVal) {
      this.dataSource = newVal
    }
  }
}
</script>
