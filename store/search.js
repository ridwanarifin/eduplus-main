import _ from 'lodash'

export const state = () => ({
  result: {},
  contextSearch: {}
})

export const mutations = {
  setResult (state, payload) {
    state.result = payload
  },
  setContextSearch (state, payload) {
    state.contextSearch = payload
  }
}

export const actions = {
  async searchSchool ({ commit }, context) {
    let formData = {}
    let contextData = {}
    _.each(context, (value, key) => {
      if (value) {
        if (_.isPlainObject(value)) {
          formData = _.assign(formData, { [key]: _.toString(value.id) })
        } else {
          formData = _.assign(formData, { [key]: value })
        }
        contextData = _.assign(contextData, { [key]: value })
      }
    })

    if (_.isEmpty(formData)) {
      return
    }

    const { data } = await this.$axios.$post('/api/search', formData)
    console.log(data)
    commit('setResult', data)
    commit('setContextSearch', contextData)
  },

  async searchByName ({ commit, state }, context) {
    const { data } = await this.$axios.$post('/api/search/schools', context)
    commit('setResult', data)
    commit('setContextSearch', { ...state.contextSearch, ...context, stage: false })
  },

  async searchPagination ({ commit, state }, context) {
    let formData = {}
    _.each(state.contextSearch, (value, key) => {
      if (_.isPlainObject(value)) {
        formData = _.assign(formData, { [key]: _.toString(value.id) })
      } else {
        formData = _.assign(formData, { [key]: value })
      }
    })
    const { stage, name } = state.contextSearch
    const { data: { data } } = await this.$axios({
      method: 'post',
      url: context,
      data: stage ? formData : { name }
    })
    console.log('data from search pagination', data)
    commit('setResult', data)
  }
}
