<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(on_submit)">
      <validation-provider v-slot="{ valid, errors }" name="e-mail" rules="required|email">
        <v-text-field
          v-model="forms.email"
          :success="valid"
          :loading="loading"
          :disabled="loding"
          :error-messages="errors"
          filled
          type="email"
          label="E-mail"
          class="input-form"
        />
      </validation-provider>
      <validation-provider v-slot="{ valid, errors }" name="password" rules="required">
        <v-text-field
          v-model="forms.password"
          :success="valid"
          :loading="loading"
          :disabled="loading"
          :error-messages="errors"
          filled
          type="password"
          label="Password"
          class="input-form"
        />
      </validation-provider>

      <div class="text-right">
        <v-btn small text color="primary">
          Lupa password ?
        </v-btn>
      </div>

      <div class="text-center mt-5">
        <v-btn large type="submit" color="primary" class="px-sm-16">
          Masuk
        </v-btn>
      </div>
    </form>
  </validation-observer>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    forms: {
      email: '',
      password: ''
    }
  }),
  computed: {
    observer () { return this.$refs.observer }
  },
  methods: {
    on_submit () {
      this.$emit('on-submit', this.forms)
      this.clear()
    },
    clear () {
      this.observer.reset()
      this.forms = {
        email: '',
        password: ''
      }
    }
  }
}
</script>
