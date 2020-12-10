//index.js
Page({
  data: {
    toilet:[],
    markers: [],
    // latitude: 31.224176,
    // longitude: 121.449382,
    latitude: "",
    longitude: "",
    cardOpened: true,
    selectedToilet: {},
    cleanAvg: "",
    paperAvg: "",
    odorAvg: "",
    seatAvg: "",
    photos: "",
  },
  
 
  onLoad: function () {

    const Toilet = new wx.BaaS.TableObject("toilet")

    Toilet.find().then((res) => {
      console.log("results fomr ifanr", res)
      
      let markersArray = []
      const toilet = res.data.objects;
      for (let i = 0; i < toilet.length; i++) {
        markersArray.push({
          id: toilet[i].id,
          width: 20,
          height: 30,
          latitude: toilet[i].latitude,
          longitude: toilet[i].longitude,
          callout: { 
            content: toilet[i].address,
            // address: toilet[i].address,
            fontSize: 10, 
            color: "#000000", 
            padding: 1
          }
        })
      }

      this.setData({
        toilet: res.data.objects,
        markers: markersArray,
      });
      }, (error) => {
      console.log("Error!", error);
    });
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          console.log("get location success", res);
          const latitude = res.latitude
          const longitude = res.longitude

         this.setData({
           latitude,
           longitude,
         })
        
        }
     })
     


    const Score = new wx.BaaS.TableObject("review");

    Score.expand(['User']).find().then((res) => {
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
  cardTapped: function(e) {
    console.log('tap',e);
    const toiletId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/index/review?id=${toiletId}`
    })
  },
  tapMarker: function(res) {
    console.log('tapped a marker', res);
    const oneToilet = this.data.toilet.filter((t) => t.id === res.markerId)[0];
    console.log(oneToilet);
    this.getAvgReview(res.markerId);
    this.setData({
      cardOpened: true,
      selectedToilet: oneToilet
    })
   },
   tapMap: function(res) {
     this.setData({
       cardOpened: false,
     })
   },
  // tapMap: function() {
  //   wx.openLocation({
  //     address: this.data.address,
  //     latitude: this.data.latitude,
  //     longitude: this.data.longitude
  //   })
  // },
   getAvgReview: function (toiletId) {
    // build query
    const reviews = new wx.BaaS.TableObject("review");
    let query = new wx.BaaS.Query();
    query.compare("toiletId", "=", toiletId);
    
    reviews.setQuery(query).find().then((res) => {
      console.log("success", res)
    // get reviews
    const score = res.data.objects
    // average score loop
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
    // set data
    console.log("results from ifanr", res);
    this.setData({
      score: res.data.objects,
      cleanAvg: cleanAvg,
      paperAvg: paperAvg,
      odorAvg: odorAvg,
      seatAvg: seatAvg,
      photos: photoTotal,
    });
 
   })
   },
   onShow: function () {

  },
})