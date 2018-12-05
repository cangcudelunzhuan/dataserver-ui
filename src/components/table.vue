<template id="">
  <div class="tableContent" v-loading="loading">
    <input type="hidden" name="" value="" v-model="router">
    <input type="hidden" name="" value="" v-model="crumbs">
    <div class="tableToolbox clearfix">
      <el-input :placeholder="'根据'+resData.searchName+'查询'" v-model="searchText" class="tableSearchBox floatRight">
        <el-button slot="append" icon="el-icon-search" @click="searchList()"></el-button>
      </el-input>
      <el-select v-model="audit_status" placeholder="状态" >
        <el-option :label="item.value" :value="item.key" v-for="(item, index) in resData.auditStausList"></el-option>
      </el-select>
    </div>
    <el-table ref="multipleTable"
      :data="resData.deatilData.items"
      :height="heightT - 217"
      stripe class="tableBox" >
      <el-table-column v-for="(item, index) in resData.columnData "
        :prop="item"  :show-overflow-tooltip="true" :fit="true" :min-width="resData.titleData[index].length*35"
        :label="resData.titleData[index]">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 1)" type="text" size="small" v-if="scope.row.audit_status!==1">审批</el-button>
          <el-button @click="handleClick(scope.row, 2)" type="text" size="small" v-if="scope.row.audit_status!==2">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagebox">
      <el-pagination
        layout="total,sizes,prev, pager, next"
        :page-sizes="[10,20]"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="resData.deatilData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
  import dialog from '@/util/dialog'
  import toas from '@/util/message'
  export default {
    computed:{
      heightT () {
        return this.$store.getters.contentH - 50
      },
      router () {
        let router = this.$route.query.router
        this.setRouterData(router)
        this.getList()
        return router
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
        id: null,
        searchText:'',
        numPerPage: 10,
        currentPage: 1,
        audit_status: 0,
        dialogTableVisible: true,
        loading:false,
        resData:{
          deatilData: {
            total: 5,
            item: [{
              name:'sdsds',
              age:'22'
            },{
              name:'xxxsdsds',
              age:'22xxx'
            }]
          },
          columnData:['name','age'],
          titleData:['姓名','年龄'],
          searchName:'请输入编号',
          auditKey:'',
          auditStausList:[]
        }
      }
    },
    watch:{
      id (newval, oldval) {
        this.audit_status = 0
      }
    },
    methods: {
      setRouterData (router) {
        let vm = this
        let routerdata = {keyPath:router}
        vm.$store.commit('ROUTERDATA', {routerData: routerdata})
        let idarr = router.split('-')
        let id = idarr[idarr.length-1]
        vm.id = id
      },
      async getList (page) {
        let vm = this
        let Page = page || 1
        vm.loading = true
        let params = {
          id: vm.id,
          searchText: vm.searchText,
          audit_status: vm.audit_status,
          pageNum: Page,
          numPerPage: vm.numPerPage
        }
        let res = await this.$store.dispatch('getSearch', params)
        vm.resData = res.data
        vm.currentPage = page
        vm.loading = false
        vm.$refs.multipleTable.bodyWrapper.scrollTop = 0
        vm.$refs.multipleTable.bodyWrapper.scrollLeft = 0
      },
      handleClick (row, key) {
        let vm = this
        let kind = key===1?'审批':'驳回'
        let config = {
          mes: `输入${kind}理由`,
          inputErrorMessage: '必填',
          inputValidator: (val) => {
            if (val === null) {
              return false
            }
            return !(val.length < 1)
          }
        }
        dialog.prompt(config, (val)=>{
          let auditKey = vm.resData.auditKey
          let params = {
            id: vm.id,
            audit_value: row[auditKey],
            audit_status: key,
            audit_desc: val
          }
          vm.toUpdate(params)
        })
      },
      async toUpdate (params) {
        this.loading = true
        let res = await this.$store.dispatch('updates', params)
        this.loading = false
        toas.message({
          type: 'success',
          msg: res.message
        })
        this.getList()
      },
      handleCurrentChange (val) {
        this.getList(val)
      },
      handleSizeChange (val) {
        this.numPerPage = val
      },
      searchList () {
        this.getList()
      }
    }
  }
</script>
<style media="screen">
  .tableContent{
    margin-top: 45px
  }
</style>
