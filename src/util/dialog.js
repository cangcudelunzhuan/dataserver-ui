import Vue from 'vue'
class Dialog {
  prompt(configs, fun) {
    let config = configs || {}
    let title = config.title || '提示'
    let mes = config.mes || ''
    let confirmButtonText = config.confirmButtonText || '确定'
    let cancelButtonText = config.cancelButtonText || '取消'
    let inputErrorMessage = config.inputErrorMessage || '请输入正确的邮箱格式'
    let inputValidator = config.inputValidator
    // let inputPattern = config.inputPattern || /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
    Vue.prototype.$prompt(mes, title, {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      // inputPattern: inputPattern,
      inputValidator: inputValidator,
      inputErrorMessage: inputErrorMessage,
      customClass: 'confirmDialog'
    }).then(({value }) => {
      fun(value)
    }).catch(() => {
    })
  }
  confirm(configs, func) {
    let config = configs || {}
    let title = config.title || '提示'
    let mes = config.mes || ''
    let confirmButtonText = config.confirmButtonText || '确定'
    let cancelButtonText = config.cancelButtonText || '取消'
    let html = `<div>11</div>`
    let inner = config.inner || html
    Vue.prototype.$confirm(inner, title, {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      customClass: 'confirmDialog',
      dangerouslyUseHTMLString: true
    }).then(() => {
      func()
    }).catch(() => {
    });
  }
}
export default new Dialog()
