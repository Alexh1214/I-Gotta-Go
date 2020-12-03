// pages/upload/upload.js
Page({

  /**
   * Page initial data
   */
  data: {
    photo:"",
    toilet:"",
    inputVal: "",
    cleaness:"",
    paper:"",
    seat:"",
    odor:""
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
    getLocation: function() {
      wx.chooseLocation({
        success: (res) => {
          console.log("get location success", res);
         const location ={
           latitude: res.latitude,
           longitude: res.longitude,
           address: res.address
         };
         this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.address
         })
        }
     })
     },
    tapMap: function(){
      wx.openLocation({
        name:this.data.toilet.name,
        address:this.data.toilet.address,
        latitude: this.data.toilet.latitude,
        longitude: this.data.toilet.longitude
      })
    },
    slider4change:function(res){
      console.log('get the change',res);
      this.setData({
        cleaness: res.detail.value,
      });
      },
  slider3change:function(res){
  console.log('get the change',res);
  this.setData({
    paper: res.detail.value,
  })
   },
  slider2change:function(res){
  console.log('get the change',res);
  this.setData({
    seat: res.detail.value,
  })
  },
  slider1change:function(res){
    console.log('get the change',res);
    this.setData({
      odor: res.detail.value,
    })
     },
     inputChange: function (e) {
       console.log('input success',e);
      this.setData({
        inputVal: e.detail.value,
      });
    },
    

    tapMaker: function(res) {
      console.log('tapped a marker',res);
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