/*
* http接口中的参数param说明
* param = {
*   url: '',
*   data: {},
*   header: {},
*   method: '',
*   dataType: 'json'
* }
*/
import wepy from 'wepy'
export default class http {
  static async request(param = {}, opts = {loading: true, title: '加载中'}) {
    let result = null
    opts.loading && wepy.showLoading({title: opts.title || '加载中'})
    try {
      const res = await wepy.request(param)
      opts.loading && wepy.hideLoading()
      if (res.statusCode === 200) {
        result = res.data
      } else {
        // 这里添加授权登录失败判断
        wepy.showToast({
          title: res.data.statusReason,
          icon: 'none',
          duration: 1000
        })
      }
    } catch (err) {
      opts.loading && wepy.hideLoading()
      wepy.showToast({
        title: '服务器出错了',
        icon: 'none',
        duration: 1000
      })
    }
    return result
  }

  static async get(param, opts) {
    param = {...param, ...{method: 'GET', dataType: 'json'}}
    return this.request(param, opts)
  }

  static async post(param, opts) {
    param = {...param, ...{method: 'POST', dataType: 'json'}}
    return this.request(param, opts)
  }

  static async put(param, opts) {
    param = {...param, ...{method: 'PUT', dataType: 'json'}}
    return this.request(param, opts)
  }

}
