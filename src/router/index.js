import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import table from '@/components/table'
import iframe from '@/components/iframe'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 切换路径模式，变成history模式,不然路径为/#/home
  scrollBehavior: () => ({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    y: 0
  }),
  routes: [
    {
      path: '/',
      component: index,
      redirect:'/hello',
      children:[
        {
          path: '/hello',
          name: 'hello',
          component: HelloWorld,
        },
        {
          path: '/table',
          name: 'table',
          component: table,
        },
        {
          path: '/iframe',
          name: 'iframe',
          component: iframe,
        }
      ]
    }
  ]
})
