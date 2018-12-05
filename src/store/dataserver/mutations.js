import * as types from './types'
export const mutations = {
  [types.CONTENTH] (state, {contentH}) {
    state.contentH = contentH
  },
  [types.USERINFO] (state, {userinfo}) {
    state.userinfo = userinfo
  },
  [types.ROUTERDATA] (state, {routerData}) {
    state.routerData = routerData
  },
  [types.NAVDATA] (state, {navData}) {
    state.navData = navData
  },
  [types.CRUMBSTATUS] (state, {crumbStatus}) {
    state.crumbStatus = crumbStatus
  }
}
