// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import Vuex from 'vuex'
import './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/basic.css'
import { initCountly, countlyUserDetail } from '@/util/access'
Vue.use(Vuex)
Vue.use(ElementUI)
sync(store, router)
window.$store = store
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let h =  window.innerHeight
  store.commit('CONTENTH', {contentH: h})
  if (to.meta.needLogin) {
    next({path: '/login'})
  } else {
    let userinfo = store.getters.userinfo
    if (userinfo) {
      initCountly()
      let info = {
        'name': userinfo.nickName,
        'username': userinfo.nameDisplay,
        'email': userinfo.email,
        'organization': userinfo.tenantOrgs[0].orgName,
        'phone': userinfo.phone,
        'picture': userinfo.job,
        'gender': userinfo.gender,
        'custom': {
          '工号': '#' + userinfo.empNo,
          '职位': userinfo.position,
          'userId': userinfo.userId
        }
      }
      countlyUserDetail(info)
    }
    next()
  }
})
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
