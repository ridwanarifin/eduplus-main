import _ from 'lodash'

export default function ({ route, store }) {
  const defaultCrumbs = [{
    to: route.fullPath,
    exact: true,
    name: route.name === 'index' ? 'Home' : _.capitalize(_.upperCase(route.name))
  }]

  const initCrumbs = _.reduce(route.meta, (crumbs, meta) => meta.crumbs || crumbs, defaultCrumbs)
  store.commit('setCrumbs', initCrumbs)
}
