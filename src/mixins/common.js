import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    // login_box组件中显示隐藏控制参数
    showLoginBox: false,
    loginSuccess: null,
    loginFail: null
  }
  methods = {
  }

  onShow() {
    console.log('mixin onShow')
    console.log('这里可以加入统计相关代码')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
