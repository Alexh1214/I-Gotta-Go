//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

    let clientID = '434746c6447b757d455b'  // 应用名称: CandyLawagon' first MiniApp
    wx.BaaS.init(clientID)

    // wx.BaaS.auth.register({email: 'ifanrx@ifanr.com', password: 'ifanrx123'}).then(user => {
    //   console.log(user)
    // }).catch(err=>{
    //   // HError 对象
    // })

    // 登录
    wx.login({
      success: res => {
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    wx.getLocation({
      type: 'gcj-02',
      success: (res) => {
        console.log('after get location success', res)
      },
      fail: (err) => {
        console.log('after get location fail', err);
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
