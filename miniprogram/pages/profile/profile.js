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
          Review.expand(['User']).setQuery(query)
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

  toReview: function(e) {
    wx.navigateTo({
      url: `/pages/index/review?id=${e.currentTarget.id}`,
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const Score = new wx.BaaS.TableObject("review");

    Score.expand(['User']).find().then((res) => {
      let cleanTotal = 0, paperTotal = 0, seatTotal = 0, odorTotal = 0;
      let cleanAvg, paperAvg, seatAvg, odorAvg;
      const scores = res.data.objects;
      for(let i = 0; i < scores.length; i++) {
        cleanTotal += scores[i].clean;
        paperTotal += scores[i].paper;
        seatTotal += scores[i].seat;
        odorTotal += scores[i].odor;
      }
      cleanAvg = Math.round(cleanTotal / scores.length).toFixed(1)
      console.log(cleanAvg);
      paperAvg = Math.round(paperTotal / scores.length)
      console.log(paperAvg);
      seatAvg = Math.round(seatTotal / scores.length)
      console.log(seatAvg);
      odorAvg = Math.round(odorTotal / scores.length)
      console.log(odorAvg);

      console.log("results from ifanr", res);
      this.setData({
        score: res.data.objects,
        cleanAvg: cleanAvg,
        paperAvg: paperAvg,
        odorAvg: odorAvg,
        seatAvg: seatAvg,
      });
      
    }, (err) => {
      console.log("This is error", err);
    });
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