/**
 * Created by JianBo.Wang on 2017/8/9.
 */
import {fetchGet} from './api'

export default {
  /**
   * 应用框架级接口，如侧边栏信息，导航栏信息
   */
  // 获取左侧导航栏信息
  GetNaveMenu (id) {
    let params = {
      userCode: sessionStorage.getItem('userCode'),
      serviceId: id
    }
    return fetchGet('/geely-personas/navMenuByCloud', params)
  }
}
