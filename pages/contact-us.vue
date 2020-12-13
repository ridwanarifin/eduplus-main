<template>
  <v-sheet color="#FAFAFA">
    <v-row align="center" class="container mx-auto">
      <v-col cols="12" class="text-center py-6">
        <div class="text-h4 mx-auto" :style="{color: colors.primary}">
          Hubungin Kami
        </div>
      </v-col>

      <v-col cols="12" class="px-0">
        <v-card max-width="345" class="mx-auto" tile>
          <v-card-text>
            <v-row align="center">
              <v-col cols="3">
                <v-btn link :href="`https://api.whatsapp.com/send?phone=${wa}`" text fab color="success">
                  <v-icon>mdi-whatsapp</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="7">
                <div class="text--primary text-subtitle-2">
                  No. Telepon
                </div>
                <div class="font-weight-bold text-subtitle-1">
                  {{ telp }}
                </div>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="3">
                <v-btn link :href="'mailto:'+mail" text fab color="primary">
                  <v-icon>mdi-email</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="7">
                <div class="text--primary text-subtitle-2">
                  Email
                </div>
                <div class="font-weight-bold text-subtitle-1">
                  {{ mail }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-sheet color="transparent" max-width="400" class="mx-auto" tile>
      <v-row align="center" class="container mx-auto">
        <v-col cols="12">
          <div class="text--primary text-subtitle-2">
            Atau Kirimkan pesan anda
          </div>
        </v-col>

        <v-col cols="12">
          <contact-form :loading="isSubmiting" @on-submit="on_submit" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-sheet>
</template>

<script>
import _ from 'lodash'
import * as Colors from '~/utils/colors'
import ContactForm from '~/components/forms/ContactForm.vue'
export default {
  components: { ContactForm },
  data: () => ({
    colors: Colors,
    telp: '0815 8668 1826',
    mail: 'info@edukasiplus.com',
    isSubmiting: false,
    forms: {
      name: '',
      email: '',
      message: ''
    }
  }),
  computed: {
    wa () {
      const a = _.replace(this.telp, '0', '62')
      return _.replace(a, /\s/g, '')
    }
  },
  methods: {
    async on_submit (args) {
      try {
        this.forms = _.assign(this.forms, args)
        this.isSubmiting = true
        await this.$store.dispatch('contactUs', this.forms)
      } finally {
        this.isSubmiting = false
      }
    }
  }
}
</script>

<style>

</style>
