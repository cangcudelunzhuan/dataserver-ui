/**
 * Created by JianBo.Wang on 2017/8/4.
 */
import {fetchGet} from './api'

export default {
  /**
   * 登录授权接口
   */
  // 用户登录
  getLoginInfo () {
    return fetchGet('/geely-personas/index/getLoginInfo')
  },
  // 用户登出
  LogOut () {
    return fetchGet('/geely-personas/index/logout')
  }
}
