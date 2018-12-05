<template id="">
  <div class="">
    <top :info="userinfo" v-if="userinfo"></top>
    <NAV :height="heights" :data="routerData" :navdata="navData"></NAV>
    <el-row class="indexRight" :style="{height:heights+'px'}">
      <el-col :span="24">
        <div class="rightInnerbox" :class="{showcrumbs:crumbStatus === true}">
          <el-scrollbar :style="{height:heightscroll +'px'}" ref="elscrollbar">
            <Crumbs :data="routerData" v-if="routerData.keyPath" ref="crumbs"></Crumbs>
            <router-view v-if="isactive"></router-view>
            <!-- <Table :height="heights"></Table> -->
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import top from '@/components/top'
  import NAV from '@/components/nav'
  import Crumbs from '@/components/Crumbs'
  import watermark from '@/util/water'
  import * as access from '@/util/access'
  import { Loading } from 'element-ui'
  export default {
    components: {
      top,
      NAV,
      Crumbs
    },
    mounted () {
      this.getUser()
    },
    provide() {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isactive:true
      }
    },
    computed:{
      heights () {
        return this.$store.getters.contentH - 50
      },
      userinfo () {
        return this.$store.getters.userinfo
      },
      routerData () {
        return this.$store.getters.routerData
      },
      navData () {
        return this.$store.getters.navData
      },
      crumbStatus () {
        return this.$store.getters.crumbStatus
      },
      heightscroll () {
        let h = this.crumbStatus === true ? this.heights - 45 : this.heights-1
        return h
      }
    },
    methods:{
      gobottom (){
        let div = this.$refs['elscrollbar'].$refs['wrap']
        // div.scrollTop = div.scrollHeight
        div.scrollTop= 0
      },
      async getUser () {
        let loadingInstance = Loading.service({ fullscreen: true })
        let res = await this.$store.dispatch('getUser')
        this.$store.commit('USERINFO', {userinfo: res.data})
        let userinfo = res.data
        access.initCountly()
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
        access.countlyUserDetail(info)
        access.countlyLogin()
        watermark.set(this.$store.getters.userinfo.nickName+this.$store.getters.userinfo.empNo)
        let navdata = await this.$store.dispatch('navMenuByCloud')
        this.$store.commit('NAVDATA', {navData: navdata.data})
        loadingInstance.close()
      },
      reload () {
        this.isactive = false
        this.$nextTick(() => {
          this.isactive = true
        })
      }
    }
  }
</script>
