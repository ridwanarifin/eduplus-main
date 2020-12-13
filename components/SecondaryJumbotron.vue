<template>
  <v-sheet class="edu-jumbotron d-flex align-center" width="100vw" :color="colors.blueEduplus" dark>
    <v-row class="container ma-auto text-center" align="center" justify="center">
      <v-col cols="12" sm="6">
        <div class="text-body font-weight-bold">
          {{ subTitle }}
        </div>
        <div class="text-h4 mt-6">
          {{ title }}
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import * as Colors from '~/utils/colors'

export default {
  props: {
    subTitle: { type: String, required: true },
    title: { type: String, required: true }
  },
  data: () => ({
    colors: Colors
  })
}
</script>

<style lang="scss" scoped>
.edu-jumbotron {
  @media #{map-get($display-breakpoints, 'sm-and-up')} {
    height: 280px !important;
  }
}
</style>
