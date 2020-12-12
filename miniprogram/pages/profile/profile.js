// pages/profile/profile.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
    score:[],
  },
  
  userInfoHandler: function(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
        // do something with the 'user' object
          this.setData({
            currentUser: user,
          });
          console.log('user',user);

          wx.setStorage({
            key:"user",
            data: user
          })

          const Review = new wx.BaaS.TableObject("review");
          let query = new wx.BaaS.Query();

          query.compare("User","=", this.data.currentUser.id);
          Review.expand(['User', 'toiletId']).setQuery(query)
          .find()
          .then((res) => {
            console.log("res found", res);
            this.setData({
              score: res.data.objects,
            })
          })

      }, err => {
        // might need to log the error message
        console.log("it's an error", err);
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const user = wx.getStorageSync("user")
    if(user){
      this.setData({
        currentUser: user
      })
    }
    
    
    const Score = new wx.BaaS.TableObject("review");

    let query = new wx.BaaS.Query();

    query.compare("User","=", this.data.currentUser.id);
    Score.expand(['User', 'toiletId']).setQuery(query)
    .find()
    .then((res) => {
      console.log("resS found", res);
      this.setData({
        score: res.data.objects,
      })
     
    });
  },
   toReview: function(e) {
      console.log('res',e);
      
     wx.navigateTo({
      url: `/pages/index/review?id=${e.currentTarget.id}`,
     });
    },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    const Review = new wx.BaaS.TableObject("review");
    let query = new wx.BaaS.Query();

    query.compare("User","=", this.data.currentUser.id);
    Review.expand(['User', 'toiletId']).setQuery(query)
    .find()
    .then((res) => {
      console.log("res found", res);
      this.setData({
        score: res.data.objects,
      })
    });
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

  },
  previewImage: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.url){wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: [e.currentTarget.dataset.url]
    })
  }

  },
})