<template id="">
  <div class="topbox">
    <section class="topContent clearfix">
      <span class="floatLeft">
        <img :src="src" alt="" class="logo" width="45">
        <span class="topfont">数据服务 · Data Server</span>
      </span>
      <span class="floatRight">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link userbox">
            <img :src="userinfo.job" alt="" class="userImg">
            <span class="userName">{{userinfo.nickName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="esc">退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      </span>
    </section>
  </div>
</template>
<script type="text/javascript">
  import * as access from '@/util/access'
  export default {
    props:['info'],
    data () {
      return {
        src: 'static/images/dslogo.png'
      }
    },
    computed:{
      userinfo () {
        return this.info
      }
    },
    methods:{
      async handleCommand(c){
        let res = await this.$store.dispatch('LogOut')
        access.countlyLogout()
        let getinfo = await this.$store.dispatch('getUser')
      }
    }
  }
</script>
<style media="screen">
  .topbox{
    background: #296AB4;
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-family: "PingFangSC"
  }
  .topContent{
    margin: 0 25px;
    line-height: 50px;
    font-weight: 200
  }
  .topContent .logo{
    display: inline-block;
    vertical-align:sub;
    margin-right: 15px
  }
  .topfont{
    font-size: 18px;
    position: relative;
    padding-left: 15px
  }
  .topfont::before{
    content: "";
    position: absolute;
    width: 1px;
    height: 80%;
    background: #fff;
    left: 0;
    top: 0;
    bottom:0;
    margin: auto 0;
  }
  .userImg{
    width: 36px;
    height: 36px;
    display: inline-block;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    float: left;
    margin-top: 7px
  }
  .userbox{
    color: #fff;
    cursor: pointer;
  }
  .userName{
    margin: 0 10px
  }
  .userbox .el-icon--right{
    margin-left: 0
  }
</style>
