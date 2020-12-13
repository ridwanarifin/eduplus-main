<template>
  <v-sheet class="headline-ss" width="100vw" dark>
    <v-container class="mx-auto text-center">
      <div class="text-h5 text-sm-h4">
        {{ headline }}
      </div>

      <v-btn nuxt rounded color="white" class="headline-ss-action-search font-weight-bold" to="/search">
        Cari sekarang
      </v-btn>

      <div class="headline-ss-content text-subtitle-1 font-weight-medium text-sm-h6 mx-auto">
        {{ content }} <v-btn nuxt text to="/school-registration">
          disini
        </v-btn>
      </div>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data () {
    return {
      headline: 'Mulai cari informasi sekolah disini',
      content: 'Daftarkan Sekolah atau tempat kursus anda '
    }
  }
}
</script>

<style lang="scss" scoped>
$grenn: #00D1B2;
$greenTosa: #17DABD;

.headline-ss {
  @media #{map-get($display-breakpoints, 'xs-only')} {
    background: url('~assets/img/bg-green-eduplus-mobile.svg'), linear-gradient(90deg, #00D1B2 -0.03%, #50F0D8 99.97%), #FAFAFA;;
    padding: 40px 15px 61px !important;
  }

  @media #{map-get($display-breakpoints, 'sm-and-up')} {
    background: url('~assets/img/bg-green-eduplus.svg'), linear-gradient(90deg, #00D1B2 -0.03%, #50F0D8 99.97%), #FAFAFA;;
    padding-top: 50px !important;
    padding-bottom: 30px !important;
  }

  ::v-deep &-action-search {
    height: 48px !important;
    .v-btn__content {
      color: $greenTosa !important;
    };

    @media #{map-get($display-breakpoints, 'xs-only')} {
      width: 227px !important;
      margin: 55px 0 !important;
    }

    @media #{map-get($display-breakpoints, 'sm-and-up')} {
      width: 343px !important;
      margin: 45px 0 24px !important;
    }
  }

  &-content {
    width: 284px !important;
  }
}
</style>
