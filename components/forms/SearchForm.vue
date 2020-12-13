<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(on_submit)">
      <v-row align="center" justify="center">
        <!-- Provinsi -->
        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ errors }" name="provinsi" rules="required">
            <v-select
              v-model="forms.province"
              :items="models.province"
              item-text="name"
              item-value="id"
              label="Provisi"
              :loading="loadingProv || loading"
              :disabled="loadingProv"
              :error-messages="errors"
              filled
              clearable
              required
              return-object
              class="select-form"
              @change="get_regency"
            />
          </validation-provider>
        </v-col>
        <!-- end Provinsi -->

        <!-- Kota / Kabupaten -->
        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ errors }" name="kota / kabupaten">
            <v-select
              v-model="forms.regency"
              :items="models.regency"
              item-text="name"
              item-value="id"
              label="Kota / Kabupaten"
              :loading="loadingReg || loading"
              :disabled="loadingReg || !forms.province"
              :error-messages="errors"
              filled
              clearable
              return-object
              class="select-form"
              @change="get_district"
            />
          </validation-provider>
        </v-col>
        <!-- end Kota / Kabupaten -->

        <!-- Kecamatan -->
        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ errors }" name="kecamatan">
            <v-select
              v-model="forms.district"
              :items="models.district"
              item-text="name"
              item-value="id"
              label="Kecamatan"
              :loading="loadingDist || loading"
              :disabled="loadingDist || !forms.regency"
              :error-messages="errors"
              filled
              clearable
              return-object
              class="select-form"
              @change="get_village"
            />
          </validation-provider>
        </v-col>
        <!-- end Kecamatan -->

        <!-- Kelurahan -->
        <v-col cols="12" sm="6">
          <validation-provider v-slot="{ errors }" name="kelurahan">
            <v-select
              v-model="forms.village"
              :items="models.village"
              item-text="name"
              item-value="id"
              label="Kelurahan"
              :loading="loadingVill || loading"
              :disabled="loadingVill || !forms.district"
              :error-messages="errors"
              filled
              clearable
              return-object
              class="select-form"
            />
          </validation-provider>
        </v-col>
        <!-- end Kelurahan -->

        <!-- Jenjang Pendidikan -->
        <v-col cols="12">
          <div class="text-body text--primary font-weight-bold">
            Pilih Jenjang Pendidikan
          </div>
          <validation-provider v-slot="{ errors }" name="jenjang pendidikan" rules="required">
            <v-radio-group v-model="forms.stage" :error-messages="errors">
              <v-row align="center">
                <v-col v-for="item in stage_schools()" :key="item.value" cols="12" sm="6" md="3">
                  <v-radio color="white" :label="item.text" :value="item.value" class="pa-3 rounded radio-form" />
                </v-col>
              </v-row>
            </v-radio-group>
          </validation-provider>
        </v-col>
        <!-- end Jenjang Pendidikan -->

        <!-- Status Sekolah -->
        <v-col cols="12">
          <div class="text-body text--primary font-weight-bold">
            Filter Status Sekolah
          </div>
          <validation-provider v-slot="{ errors }" name="status sekolah" rules="required">
            <v-radio-group v-model="forms.status" :error-messages="errors">
              <v-row align="center">
                <v-col cols="12" sm="6" md="3">
                  <v-radio color="white" label="Negeri" value="1" class="pa-3 rounded radio-form" />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-radio color="white" label="Swasta" value="0" class="pa-3 rounded radio-form" />
                </v-col>
              </v-row>
            </v-radio-group>
          </validation-provider>
        </v-col>
        <!-- end Status Sekolah -->

        <v-col cols="12" class="mt-10 text-center">
          <v-btn large rounded width="343" color="primary" type="submit">
            Cari Sekarang
          </v-btn>

          <div class="registration-scope font-weight-medium mt-8 px-4 mx-auto">
            Daftarkan Sekolah atau Tempat <br>
            Kursus anda <v-btn nuxt text color="primary" to="/school-registration" class="registration-scope-btn text-lowercase">
              disini
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import { stagesAll } from '~/utils/stageSchools'

export default {
  props: {
    loading: { type: Boolean, default: false }
  },
  fetch () {
    Promise.all([
      this.get_province()
    ])
  },
  fetchOnServer: false,
  data () {
    return {
      forms: {
        province: '',
        regency: '',
        district: '',
        village: '',
        stage: '',
        status: ''
      },
      models: {
        province: [],
        regency: [],
        district: [],
        village: []
      },
      loadingProv: false,
      loadingReg: false,
      loadingDist: false,
      loadingVill: false
    }
  },
  computed: {
    observer () { return this.$refs.observer }
  },
  methods: {
    stage_schools () { return stagesAll },
    on_submit () {
      this.$emit('on-submit', this.forms)
      this.clear()
      this.forms = {
        province: '',
        regency: '',
        district: '',
        village: '',
        stage: '',
        status: ''
      }
    },
    clear () {
      this.observer.reset()
    },
    /**
     * get province
     */
    async get_province () {
      try {
        this.loadingProv = true
        const { province } = await this.$axios.$get('/api/search/init')
        // console.log('Province: ', province)
        this.models.province = province
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingProv = false
      }
    },
    /**
     * end province
     */

    /**
     * get regency
     */
    async get_regency (args) {
      try {
        // console.log('forms province: ', this.forms.province)
        const { id } = args
        this.loadingReg = true
        const { data } = await this.$axios.$get(`/api/search/get-regency/${id}`)
        // console.log('Regency: ', data)
        this.models.regency = data
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingReg = false
      }
    },
    /**
     * end get regency
     */

    /**
     * get district
     */
    async get_district (args) {
      try {
        // console.log('forms regency: ', this.forms.regency)
        const { id } = args
        this.loadingDist = true
        const { data } = await this.$axios.$get(`/api/search/get-district/${id}`)
        // console.log('District: ', data)
        this.models.district = data
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingDist = false
      }
    },
    /**
     * end get district
     */

    /**
     * get village
     */
    async get_village (args) {
      try {
        // console.log('forms district: ', this.forms.district)
        const { id } = args
        this.loadingVill = true
        const { data } = await this.$axios.$get(`/api/search/get-village/${id}`)
        // console.log('Village: ', data)
        this.models.village = data
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingVill = false
      }
    }
    /**
     * end get village
     */
  }
}
</script>

<style lang="scss" scoped>
  .v-radio.radio-form {
    background: #FFFFFF !important;
    border: 0.4px solid #9B9B9B !important;
    ::v-deep .v-label {
      font-weight: 600 !important;
    }

    ::v-deep &.v-item--active {
      background: #1976d2 !important;
      border: 0.4px solid #1976d2 !important;
      .v-label {
        color: white !important;
      }
    }
  }

  .v-input.select-form {
    ::v-deep .v-input__slot {
      background: #FFFFFF !important;
      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05) !important;
      border-radius: 4px !important;
    }
  }

  .registration-scope {
    width: 284px !important;
    &-btn {
      font-size: 16px !important;
    }
  }
</style>
