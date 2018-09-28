/*
* 公用方法集合
*/
export default {
  /*
  * 防抖 （以最后一次事件的触发时间，为起始时间去不断推移事件的执行）
  * 应用场景（例如：避免快速点击造成的多次提交、降低input检索频次）
  */
  debounce(callback, wait = 300) {
    let timeout, timestamp, context, args;
    function laterFn() {
      let laster = Date.now() - timestamp
      if (laster < wait) {
        timeout = setTimeout(laterFn, wait - laster)
      } else {
        clearTimeout(timeout)
        timeout = null
        callback.apply(context, args)
        context = args = null
      }
    }
    return function() {
      context = this
      args = arguments
      timestamp = Date.now()
      if (!timeout) {
        timeout = setTimeout(laterFn, wait)
      }
    }
  },
  /*
  * 节流 (固定时间内只能执行一次事件)
  * 应用场景（例如：滚动更新列表scroll事件，元素拖拽，resize）
  * 调用方式
  * utils.throttle(callback, 1000) // 第一次直接执行
  * utils.throttle(callback, 1000, {leading: false}) // 第一次延迟1000毫秒执行
  * utils.throttle(callback, 1000, {trailing: false}) // 不执行最后一次
  */
  throttle(callback, wait = 300, opts = {}) {
    let context, args, result
    let timeout = null
    let previous = 0
    function laterFn() {
      previous = opts.leading === false ? 0 : Date.now()
      timeout = null
      result = callback.apply(context, args)
      context = args = null
    }
    function throttled() {
      context = this
      args = arguments
      const now = Date.now()
      if (!previous && opts.leading === false) previous = now
      const remaining = wait - (now - previous)
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout)
        timeout = null
        previous = now
        result = callback.apply(context, args)
        context = args = null
      } else if (!timeout && opts.trailing !== false) {
        timeout = setTimeout(laterFn, remaining)
      }
      return result
    }
    throttled.cancel = function() {
      clearTimeout(timeout)
      previous = 0
      timeout = context = args = null
    }
    return throttled
  }
}
