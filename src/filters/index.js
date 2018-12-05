import Vue from 'vue'
Vue.filter('date', require('./date').default)
Vue.filter('matchbreadcrumb', require('./matchbreadcrumb').default)
