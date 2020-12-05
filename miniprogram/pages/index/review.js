// miniprogram/pages/index/review.js
Page({

  /**
   * Page initial data
   */
  data: {
    score: [],
    cleanAvg: 0,
    paperAvg: 0,
    seatAvg: 0,
    odorAvg: 0,
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

})