import Vue from 'vue'
class load{
  loading(config) {
    let text = config?config.text:"加载中"
    Vue.prototype.$loading({
        lock: true,
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
  }
}
export default new load()
