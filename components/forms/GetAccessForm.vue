<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(on_submit)">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ valid, errors }" name="nama sekolah" rules="required">
            <v-text-field
              v-model="forms.school_name"
              class="input-form"
              label="Nama Sekolah"
              :success="valid"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              filled
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ valid, errors }" name="NPSN" rules="required">
            <v-text-field
              v-model="forms.npsn"
              class="input-form"
              label="NPSN"
              :success="valid"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              hint="Nomor Pokok Sekolah Nasional"
              filled
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ valid, errors }" name="nama" rules="required">
            <v-text-field
              v-model="forms.name"
              class="input-form"
              label="Nama Anda"
              :success="valid"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              filled
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ valid, errors }" name="jabatan" rules="required">
            <v-text-field
              v-model="forms.position"
              class="input-form"
              label="Jabatan"
              :success="valid"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              hint="Jabatan di sekolah"
              filled
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ valid, errors }" name="e-mail" rules="required|email">
            <v-text-field
              v-model="forms.email"
              class="input-form"
              label="E-mail Sekolah"
              :success="valid"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              filled
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ valid, errors }" name="no. telepon sekolah" rules="required">
            <v-text-field
              v-model="forms.phone_number"
              class="input-form"
              label="No. Telepon Sekolah"
              :success="valid"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              filled
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" class="text-center">
          <v-btn
            dark
            large
            rounded
            width="343"
            :loading="loading"
            :color="colors.darkBlueEduPlus"
          >
            Dapatkan Akses
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import * as Colors from '~/utils/colors'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    uuid: {
      type: [String, Boolean],
      default: false
    }
  },
  async fetch () {
    if (!this.uuid) { return }
    await this.$axios.$get(`/api/schools/${this.uuid}`)
      .then((res) => {
        this.forms.school_name = res.name
        this.forms.email = res.email
        this.forms.phone_number = res.phone_number
      })
      .catch(err => console.log(err))
  },
  data: () => ({
    forms: {
      school_name: '',
      npsn: '',
      name: '',
      position: '',
      email: '',
      phone_number: ''
    },
    colors: Colors
  }),
  methods: {
    on_submit () {
      this.$emit('on-submit', this.forms)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .input-form {
  .v-input__slot {
    background: #FFFFFF !important;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05) !important;
    border-radius: 4px !important;
  }
}
</style>
