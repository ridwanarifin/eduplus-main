import _ from 'lodash'

export default function ({ store }) {
  if (_.isEmpty(store.state.province)) {
    store.dispatch('init')
  }
}
