//index.js
Page({
  data: {
    toilet:[],
    markers: [],
    // latitude: 31.224176,
    // longitude: 121.449382,
    latitude: "",
    longitude: "",
  },
  
 
  onLoad: function () {

    const Toilet = new wx.BaaS.TableObject("toilet")

    Toilet.find().then((res) => {
      console.log("results fomr ifanr", res)
      this.setData({
        toilet: res.data.objects,
      });

      // const markers = res.data.objects.map((toilet) => {
      //   return {
      //     id: 0,
      //     width: 20,
      //     height: 30,
      //     latitude: toilet.latitude,
      //     longtitude: toilet.longitude,
      //     callout: {
      //       address: toilet.address,
      //       fontsize: 10,
      //       color: "#000000",
      //       padding: 1
      //     }
      //   }
      // })

      // this.setData({
      //   markers: markers,
      // })


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
     
  },
    
    // tapMap: function(){
    //   wx.openLocation({
    //     name:this.data.toilet.name,
    //     address:this.data.toilet.address,
    //     latitude: this.data.toilet.latitude,
    //     longitude: this.data.toilet.longitude
    //   })
    // },
    // tapMaker: function(res) {
    //   console.log('tapped a marker',res);
    //   }

})