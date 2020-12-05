// pages/upload/upload.js
Page({

  /**
   * Page initial data
   */
  data: {
    photo:"",
    currentUser: null,
    inputVal: "",
    clean:"",
    paper:"",
    seat:"",
    odor:"",
    address:"",
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
      console.log('get the cleaness number',res);
      this.setData({
        clean: res.detail.value,
      });
      },
  slider3change:function(res){
  console.log('get the paper mumber',res);
  this.setData({
    paper: res.detail.value,
  })
   },
  slider2change:function(res){
  console.log('get the seat number',res);
  this.setData({
    seat: res.detail.value,
  })
  },
  slider1change:function(res){
    console.log('get the odor number',res);
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
    formReset: function (event) {
      console.log(event)
   const lat=this.data.latitude;
   const adr=this.data.address;
   const lon=this.data. longitude;

    const toilets = new wx.BaaS.TableObject("toilet");
    let query = new wx.BaaS.Query();
    query.compare("address", "=", this.data.address);
    
    toilets.setQuery(query).find().then((res) => {
      console.log("success", res)
    }, err => {
      console.log("its an error", err);
    })
    // left off here

    const newToilets = toilets.create();
    
    console.log (wx.getStorageSync("user"));
    const user = wx.getStorageSync("user");
   
    newToilets.set({
          latitude: lat,
          longitude: lon,
          address:adr,
          User: user.id
     });
    
  newToilets.save().then((res)  =>
  {
   console.log('toilet save',res);
   const cle=this.data.clean;
   const pap=this.data.paper;
   const sea=this.data.seat;
   const odo=this.data.odor;
   const val = this.data.inputVal;
   
   if (val.trim() === "") return;
    const reviews=new wx.BaaS.TableObject("review");
    const newReviews = reviews.create();
    newReviews.set({
        photo: [this.data.photo],
        description: val,
        clean: cle,
        paper: pap,
        seat: sea,
        odor: odo,
        toiletId: res.data.id,
        User: res.data.user_id,
      });
      newReviews.save()
  })
  
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