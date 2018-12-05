/**
 * Created by Lina.zhang on 2018/7/2.
 */
import {fetchGet, fetchDelete, fetchPost, fetchPostExport} from './api'

export default {
  /**
   * 标签API
   */
  // 1、 所有标签、常用标签列表
  GetTabList (mapString) {
    let param = {
      userCode: sessionStorage.getItem('userCode'),
      mapString: mapString
    }
    return fetchPost('/geely-personas/tab/tabList', param)
  },
  // 2、 标签数据级联接口
  GetTabcascade (cascade) {
    let cascadeStr = '[' + cascade + ']'
    let cascadeArr = JSON.parse(cascadeStr)
    let cascadeId = []
    cascadeArr.map((casitem, x) => {
      for (let key in casitem) {
        cascadeId.push(key)
      }
    })
    let idArr = ['14005', '14006', '14008', '31003']
    idArr.map((item, i) => {
      if (cascadeId.indexOf(item) === -1) {
        let jsons = {}
        jsons[item] = null
        cascadeArr.push(jsons)
      }
    })
    let postArr = []
    cascadeArr.map((item, i) => {
      postArr.push(JSON.stringify(item))
    })
    let param = {
      cascade: postArr.toString()
    }
    return fetchPost('/geely-personas/tab/cascade', param)
  },
  // 3、 根据选择的标签查询用户数
  GetUserNum (mapString) {
    let param = {
      mapString: mapString
    }
    return fetchPost('/geely-personas/tab/getUserNumByTab', param)
  },
  // 4、  生成数据报表
  GetDataReport (mapString, pageNum, numPerPage) {
    let param = {
      mapString: mapString,
      pageNum: pageNum,
      numPerPage: numPerPage
    }
    return fetchPost('/geely-personas/tab/getDataReportByTab', param)
  },
  // 5、 增加客群
  AddClient (clientId, clientName, clientText, state, clientNum, clientTab, flag) {
    let param = {
      clientId: parseInt(clientId),
      userCode: sessionStorage.getItem('userCode'),
      clientName: clientName,
      clientText: clientText,
      state: state,
      clientNum: clientNum,
      createUser: sessionStorage.getItem('userName'),
      clientTab: clientTab,
      flag: flag
    }
    return fetchPost('/geely-personas/client/addClient', param)
  },
  // 6. 客群管理列表
  GetClientList (clientId, pageNum, numPerPage) {
    let param = {
      clientId: clientId,
      userCode: sessionStorage.getItem('userCode'),
      pageNum: pageNum,
      numPerPage: numPerPage
    }
    return fetchGet('/geely-personas/client/clientList', param)
  },
  // 删除客群
  deleteClient (clientId) {
    let param = {
      userCode: sessionStorage.getItem('userCode'),
      clientId: clientId
    }
    return fetchDelete('/geely-personas/client/deleteClient', param)
  },
  // 修改客群
  updateClient (clientId, clientName, clientText, state, clientNum, updateUser, clientTab) {
    let param = {
      userCode: sessionStorage.getItem('userCode'),
      clientId: clientId,
      clientName: clientName,
      clientText: clientText,
      state: state,
      clientNum: clientNum,
      updateUser: updateUser,
      clientTab: clientTab
    }
    return fetchGet('/geely-personas/client/updateClient', param)
  },
  // 下载
  getDataReportExcle (mapString, titleList) {
    let param = {
      mapString: mapString,
      titleList: titleList,
      dateNum: 1000
    }
    return fetchPostExport('/geely-personas/tab/getDataReportExcle', param)
  }
}
