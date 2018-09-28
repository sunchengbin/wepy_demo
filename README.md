# wepy_demo
小程序demo架构

## 开发环境

- node
- wepy-cli

## 参考文档

- [wepy](https://tencent.github.io/wepy/index.html)
- [小程序](https://developers.weixin.qq.com/miniprogram/dev/index.html)

## 项目初始化

```
$ cd wepy_demo
$ ./init.sh

```
## 项目启动

```

// 未进行压缩启动
$ npm run dev  
// 进行压缩启动
$ npm run prod

```
## 项目目录
.
|- src
    |- components 组件
    |- minxins 混合模式
    |- pages 页面
    |- libs
        |- apis.js 接口请求url聚合
        |- hosts.js 接口域名聚合，可以通过手动切换Env值来切换接口环境
        |- http.js http请求方法封装
        |- interface.js 调用聚合、方便引用
        |- utils.js 工具函数封装
|- app.wpy 小程序入口，全局配置，对应小程序app.json

## 项目环境切换

项目启动后手动切换
libs/hosts.js中
Env的值
