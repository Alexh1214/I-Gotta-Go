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
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    photos: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const Score = new wx.BaaS.TableObject("review");

    Score.expand(['User', 'toiletId']).find().then((res) => {
      let cleanTotal = 0, paperTotal = 0, seatTotal = 0, odorTotal = 0;
      let cleanAvg, paperAvg, seatAvg, odorAvg;
      let photoTotal =  [];
      const scores = res.data.objects;
      for(let i = 0; i < scores.length; i++) {
        cleanTotal += scores[i].clean;
        paperTotal += scores[i].paper;
        seatTotal += scores[i].seat;
        odorTotal += scores[i].odor;
        photoTotal.push(...scores[i].photo)
      }
      console.log({photoTotal});
      cleanAvg = Math.round(cleanTotal / scores.length)
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
        photos: photoTotal,
      });
      
    }, (err) => {
      console.log("This is error", err);
    });
  },

})