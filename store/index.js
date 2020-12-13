import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  isPending: false,
  province: [],
  regency: [],
  district: [],
  village: [],
  favorite: [],

  schools: [],

  contact: {
    success: false,
    message: ''
  },

  breadcrumbs: [],

  pending: false,
  isError: false,
  errors: {}
})

export const getters = {
  provInit: (state) => {
    const { province, regency, district, village } = state
    return { province, regency, district, village }
  },

  getProvByName: state => (args) => {
    const upper = _.upperCase(args)
    return _.find(state.province, { name: upper })
  },

  getKotaByProvId: state => (args) => {
    const upper = _.upperCase(args)
    return _.filter(state.regency, { province_id: upper })
  },

  getProvAndKotaByProvName: state => (args) => {
    if (_.isEmpty(state.province)) { return false }
    const upper = _.upperCase(args)
    const prov = _.find(state.province, { name: upper })
    const kota = prov && _.filter(state.regency, { province_id: prov.id })
    return { prov, kota }
  },

  getFavByProvName: state => (args) => {
    return _.find(state.favorite, { name: args })
  },

  getSchools: (state) => {
    const stateSchools = state.schools
    return stateSchools
  }
}

export const mutations = {
  setIsPending (state, payload) {
    state.isPending = payload
  },

  setProvince (state, payload) {
    state.province = payload.province
  },

  setRegency (state, payload) {
    state.regency = payload.regency
  },

  setDistrict (state, payload) {
    state.district = payload.district
  },

  setVillage (state, payload) {
    state.village = payload.village
  },

  setInitFavorite (state, payload) {
    state.favorite = payload
  },

  setSchool (state, payload) {
    state.schools = payload
  },

  setCrumbs (state, payload) {
    state.breadcrumbs = payload
  },

  setIsError (state, payload) {
    state.isError = payload.isError
    state.errors = _.assign(state.errors, payload.errors)
  },

  setContact (state, payload) {
    state.contact = payload
  }
}

export const actions = {
  async init ({ commit }) {
    const response = await this.$axios.$get('/api/search/init')
    commit('setProvince', response)
    commit('setRegency', response)
    commit('setDistrict', response)
    commit('setVillage', response)
  },
  async mainpageByContext ({ commit }, { context }) {
    try {
      commit('setIsPending', true)
      const { school } = await this.$axios.$get(`/api/favorite/${context}`)
      commit('setSchool', _.orderBy(school, ['schools', 'name'], ['desc', 'asc']))
    } catch (error) {
      console.log(error)
    } finally {
      commit('setIsPending', false)
    }
  },
  async contactUs ({ commit }, context) {
    const { success, message } = await this.$axios.$post('/api/contact', { name: context.name, message: context.message })
    commit('setContact', { success, message })
    this.$swal({
      icon: success ? 'success' : 'error',
      title: success ? 'Terkirim' : 'Oops!',
      text: success ? 'Kami akan menindaklanjuti pesan anda secepatnya.' : message
    })
  }
}

export const plugins = [
  createPersistedState()
]
