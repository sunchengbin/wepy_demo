/*
* 登录相关接口
*/
import wepy from 'wepy'
import {
  Apis,
  Http
} from 'libs/interface'
export default class login {
  static doLogin(page, callback, failFn) {
    // 需要校验登录的按钮调用
    if (wepy.$instance.globalData.userInfo) {
      callback && callback()
      return
    }
    try {
      page.showLoginBox = true
      page.loginSuccess = callback
      page.loginFail = failFn
      page.$apply()
    } catch(err) {
      console.log(err)
    }
  }

  static async toLogin(wxUserRes, callback) {
    // 公司内部登录接口获取用户信息可以获取userid，用于接口调用用户信息校验
    const clientType = this.getClientType()
    let userInfo = await Http.get({
      url: Apis.login,
      data: {
        rawData: wxUserRes.rawData,
        signature: wxUserRes.signature,
        encryptedData: wxUserRes.encryptedData,
        iv: wxUserRes.iv
      }
    })
    if (userInfo._ok) {
      wepy.$instance.globalData.userInfo = userInfo._result || wepy.$instance.globalData.userInfo
      try {
        wx.setStorageSync('USER_INFO', wepy.$instance.globalData.userInfo)
      } catch (e) {
        console.log(e)
      }
      // 登录滞后的话状态获取不准确，所以登录成功后再次获取状态
      // utils.getUserStatus(true)
      (typeof callback === 'function') && callback();
    } else {
      wx.showModal({
        title: '提示',
        content: '登录异常，请稍后再试',
        showCancel: false
      })
    }
  }

  static getClientType() {
    let systemInfo = wepy.getSystemInfoSync()
    const clientType = systemInfo.system && systemInfo.system.split(' ')[0].toLowerCase()
    return clientType || systemInfo['model']
  }
}
