<template id="">
  <div class="">
    <input type="hidden" name="" v-model="router">
    <input type="hidden" name="" value="" v-model="crumbs">
    <iframe :src="path" width="" :style="{minHeight:heightT +'px'}" class="iframe"></iframe>
  </div>
</template>
<script type="text/javascript">
export default {
  computed:{
    router () {
      let router = this.$route.query.router
      this.setRouterData(router)
      return router
    },
    path () {
      console.log('path' + this.$route.query.path)
      return this.$route.query.path
      // return 'https://www.baidu.com/'
    },
    heightT () {
      return this.$store.getters.contentH - 55
    },
    crumbs () {
      let crumbs = this.$route.query.crumbs === 'true'
      this.$store.commit('CRUMBSTATUS', {crumbStatus: crumbs})
      return crumbs
    }
  },
  mounted () {
    // this.getList(this.router)
  },
  data () {
    return {

    }
  },
  watch:{

  },
  methods: {
    setRouterData (router) {
      let vm = this
      let routerdata = {keyPath:router}
      vm.$store.commit('ROUTERDATA', {routerData: routerdata})
    }
  }
}
</script>
<style media="screen">
  .iframe{
    border: 0px;
    width: 100%;
    height: 100%;
  }
</style>
