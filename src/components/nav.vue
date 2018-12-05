<template id="">
  <div class="navbox">
    <input type="hidden" name="" value="" v-model="routerData">
    <el-scrollbar :style="{height:heightT +'px',background:'rgb(52, 62, 81)'}">
      <el-menu class=""
        :default-active="active"
        :default-openeds="defaultOpen"
        @select="handleSelect"
        class="navcontain"
        @open="handleOpen"
        @close="handleClose"
        background-color="rgb(52, 62, 81)"
        text-color="#fff"
        :style="{height:heightT+'px'}">
          <Menu :data="item" v-for="(item, index) in navdata"></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script type="text/javascript">
  import Menu from '@/components/menu'
  import * as access from '@/util/access'
  export default {
    components: {
      Menu
    },
    props: ['height', 'data', 'navdata'],
    data () {
      return {
        active: null,
        defaultOpen: null
      }
    },
    inject:['reload'],
    computed:{
      heightT () {
        return this.height
      },
      routerData () {
        let data = this.data
        if (data.keyPath) {
          this.active = data.keyPath
          let arr = data.keyPath.split('-')
          let defaultOpen = []
          defaultOpen.push(arr[0])
          arr.map((item, i) => {
            if (i > 0) {
              let index = defaultOpen[i-1] + '-' + item
              defaultOpen.push(index)
            }
          })
          this.defaultOpen = defaultOpen
        }
        return data
      },
      navData () {
        return this.navdata
      }
    },
    methods:{
      handleOpen (key, keyPath){
        // console.log('open' + key + keyPath )
      },
      handleClose (key, keyPath) {
        // console.log('close' + key + keyPath )
      },
      handleSelect(key, keyPath) {
        let arr = key.split('-')
        let thepath = ''
        let title = ''
        let vm = this
        getPath(this.navdata, arr[0])
        function getPath (arrs, ids) {
            arrs.map((item, i) => {
              if (item.id === ids) {
                thepath = item.path
                title = item.title
                let index = arr.indexOf(ids)
                if (index < arr.length && item.children) {
                  getPath(item.children, arr[index+1])
                }
              }
            })
        }
        if (thepath.indexOf('http') === -1) {
          this.$router.push({path: thepath, query: {router: key,crumbs: 'true'}})
          let inf = {
            userId: vm.$store.getters.userinfo.empNo,
            serviceId: arr[arr.length-1],
            menuName: title
          }
          access.countlyNavClick(inf)
        } else {
          this.$router.push({path: '/iframe', query: {path: thepath,router: key, crumbs:'false'}})
          // this.$store.commit('ROUTERDATA', {routerData: {keyPath: null}})
          // this.$router.push({path: '/iframe', query: {path: thepath}})
        }
        this.reload()
      }
    }
  }
</script>
<style media="screen">
.navbox{
  position: absolute;
  left: 0;
  top: 50px;
  z-index: 9;
  width: 12.5%
}
.navcontain{
  margin: 0;
  padding: 0;
  min-width: 100%
}
.navcontain .el-submenu .el-menu-item{
  min-width: 100%
}
.navcontain .el-submenu__icon-arrow{
  right: 10px;
  margin-top: -5px
}
.navcontain .el-submenu__title{
  padding-left: 0px!important;
}
.navcontain .el-submenu__title, .navcontain .el-menu-item{
  text-align: left;
  padding-left: 35px!important;
  width: 100%
}

.navcontain>div>li>.el-submenu__title, .navcontain >div>.el-menu-item{
  padding-left: 10px!important;
  text-align: left;
}
.navcontain .el-submenu__title:hover,
.navcontain .el-submenu .el-menu-item:hover,
.navcontain .el-menu-item:hover{
  background-color: #4b5466!important
}
.navcontain .el-menu-item-group__title{
  display: none;
}
.navcontain .el-menu-item.is-active{
  background-color:#296AB4!important;
  color: #fff!important
}
.small .el-submenu__title, .small .el-menu-item{
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  padding-left: 0!important
}
.navbox .iconfont{
  margin-right: 2px
}
</style>
