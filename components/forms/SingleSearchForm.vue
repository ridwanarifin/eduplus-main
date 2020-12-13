<template>
  <validation-observer ref="observer" v-slot="{ invalid, handleSubmit }">
    <form @submit.prevent="handleSubmit(on_submit)">
      <validation-provider v-slot="{ errors, valid }" rules="required" name="Nama instansi">
        <label for="id">Cari sekolah/Tempat Kursus disini</label>
        <v-text-field
          id="id"
          v-model="forms.name"
          class="mt-5"
          :error-messages="errors"
          :success="valid"
          :loading="loading"
          :disabled="loading"
          solo
          rounded
          clearable
          append-icon="mdi-magnify"
        />
      </validation-provider>
      <div class="text-center mt-4">
        <v-btn
          large
          rounded
          type="submit"
          color="primary"
          :disabled="invalid || loading"
          :loading="loading"
        >
          Cari Sekarang
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
  data () {
    return {
      forms: {
        name: ''
      }
    }
  },
  computed: {
    observer () { return this.$refs.observer }
  },
  methods: {
    on_submit () {
      this.$emit('on-submit', this.forms)
      this.observer.reset()
    },
    clear () {
      this.observer.reset()
    }
  }
}
</script>
