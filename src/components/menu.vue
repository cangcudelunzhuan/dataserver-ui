<template id="">
  <div class="">
    <!-- 1 有子-->
    <el-submenu
    :index="ParentId + navdata.id"
    v-if="navdata.children">
      <template slot="title">
        <i class="iconfont" :class="navdata.iconClass?navdata.iconClass:'icon-liebiaozhanshi'"></i>
        <span>{{navdata.title}}</span>
      </template>
      <el-menu-item-group v-for="(item, index) in navdata.children">
        <Menu :data="item" :parentId="ParentId + navdata.id"></Menu>
      </el-menu-item-group>
    </el-submenu>
    <!-- 1无子 -->
    <el-menu-item :index="ParentId +navdata.id" v-else>
      <i class="iconfont" :class="navdata.iconClass?navdata.iconClass:'icon-liebiaozhanshi'"></i>
      <span slot="title">{{navdata.title}}</span>
    </el-menu-item>
  </div>
</template>
<script type="text/javascript">
  import Menu from '@/components/menu'
  export default {
    name: 'Menu',
    components: {
      Menu
    },
    props: ['data', 'parentId'],
    computed: {
      navdata () {
        return this.data
      },
      ParentId () {
        return (this.parentId ? this.parentId + '-' : '')
      }
    }
  }
</script>
