import Countly from 'countly-sdk-web'
// 前端埋点
export function initCountly () {
  Countly.init({
    app_key: '84a289f4b257bc06c9d99ef188dda8b99c9ab23a',
    url: 'https://ub-api.geely.com/'
  })
  Countly.track_sessions()
  Countly.track_pageview()
  Countly.track_scrolls()
  Countly.track_clicks()
  Countly.track_links()
  Countly.track_forms()
  Countly.track_errors()
}

export function countlyUserDetail (info) {
  Countly.user_details(info)
}

export function countlyLogin () {
  Countly.add_event({
    key: '用户登陆',
    count: 1
  })
}
export function countlyLogout () {
  Countly.add_event({
    key: '用户登出',
    count: 1
  })
}

export function countlyCertainPage (pageName) {
  Countly.track_pageview(pageName)
}

export function countlyNavClick (navInfo) {
  console.log('>>' + JSON.stringify(navInfo))
  Countly.add_event({
    key: '跟踪导航',
    count: 1,
    segmentation: navInfo
  })
}
