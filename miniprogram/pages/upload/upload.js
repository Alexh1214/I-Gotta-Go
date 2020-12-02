// pages/upload/upload.js
Page({

  /**
   * Page initial data
   */
  data: {
    photo:"",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
  
  },
    getPhoto: function (e) {
      console.log("take a photo");
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          console.log('getPhoto success', res);
  
          const File = new wx.BaaS.File()
          const fileParams = {filePath: res.tempFilePaths[0]};
          const metadata = {categoryName: "photo"}
  
          File.upload(fileParams, metadata).then((res)=>{
            console.log('upload image res', res);
            this.setData ({"photo": res.data.path})
        }, err => {
          console.log('upload err', err);
        })
      },
  
      fail: (err) => {
          console.log('getPhoto err', err);
        },
        complete: ()=>{}
      }); 
    },

    previewImage: function () {
      wx.previewImage({
        current: this.data.image,
        urls: [this.data.image]
      })
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