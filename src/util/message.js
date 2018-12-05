import Vue from 'vue'
class mes {
  message(config) {
    let duration = 4000
    if (config.type === "error"){
      duration = 4000
    }
    Vue.prototype.$message({
      type: config.type,
      message: config.msg,
      duration: duration
    })
  }
}
export default new mes()
