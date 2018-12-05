import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'
const state = {
  contentH: null,
  userinfo: null,
  routerData:{keyPath:null},
  crumbStatus: true,
  navData:null
}
export default {
  state,
  getters,
  actions,
  mutations
}
