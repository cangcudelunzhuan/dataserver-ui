// import Vue from 'vue'
import {fetchGet,fetchPost} from '@/fetch/api'
export const actions = {
  // 用户信息
  getUser ({commit, state}, params) {
    return fetchGet('/geely-dataserver/index/getLoginInfo')
  },
  // 退出
  LogOut ({commit, state}, params) {
    return fetchGet('/geely-dataserver/index/logout')
  },
  // 获取菜单
  navMenuByCloud ({commit, state}, params) {
    let pass = {
      serviceId: '1015'
    }
    return fetchGet('/geely-dataserver/navMenuByCloud', pass)
  },
  // 数据列表
  getSearch ({commit, state}, params) {
    let pass = {
      id: params.id,
      searchText: params.searchText,
      audit_status: params.audit_status,
      pageNum: params.pageNum,
      numPerPage: params.numPerPage
    }
    return fetchGet('/geely-dataserver/dataserver/portList/search', pass)
  },
  //审批
  updates ({commit, state}, params) {
    let pass = {
      id: params.id,
      audit_value: params.audit_value,
      audit_status: params.audit_status,
      audit_desc: params.audit_desc
    }
    return fetchPost('/geely-dataserver/dataserver/portApprove/update', pass)
  }
}
