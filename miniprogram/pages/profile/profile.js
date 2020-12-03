// pages/profile/profile.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
  },
  
  userInfoHandler: function(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
        // do something with the 'user' object
          this.setData({
            currentUser: user,
          });
          console.log('user',user);
      }, err => {
        // might need to log the error message
        console.log("it's an error", err);
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})