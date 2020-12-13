<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(on_submit)">
      <validation-provider v-slot="{ valid, errors }" name="nama" rules="required">
        <v-text-field
          v-model="forms.name"
          :error-messages="errors"
          :success="valid"
          :loading="loading"
          label="Nama"
          placeholder="Masukan nama anda"
          filled
          required
          clearable
          class="input-form"
        />
      </validation-provider>

      <validation-provider v-slot="{ valid, errors }" name="email" rules="required|email">
        <v-text-field
          v-model="forms.email"
          :error-messages="errors"
          :success="valid"
          :loading="loading"
          label="Email"
          placeholder="Masukan email anda"
          type="email"
          filled
          required
          clearable
          class="input-form"
        />
      </validation-provider>

      <validation-provider v-slot="{ valid, errors }" name="pesan" rules="required">
        <v-textarea
          v-model="forms.message"
          :error-messages="errors"
          :success="valid"
          :loading="loading"
          label="Pesan"
          placeholder="Masukan pesan anda"
          counter-value
          filled
          required
          clearable
          class="input-form"
        />
      </validation-provider>

      <v-btn
        large
        rounded
        width="343"
        type="submit"
        color="primary"
        :disabled="loading"
      >
        Kirim
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, default: false }
  },
  data: () => ({
    forms: {
      name: '',
      email: '',
      message: ''
    }
  }),
  computed: {
    observer () {
      return this.$refs.observer
    }
  },
  methods: {
    on_submit () {
      this.$emit('on-submit', this.forms)
      this.clear()
    },
    clear () {
      this.forms = {
        name: '',
        email: '',
        message: ''
      }
      this.observer.reset()
    }
  }
}
</script>
