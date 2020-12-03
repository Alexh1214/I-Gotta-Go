//index.js
Page({
  data: {
    toilet:"",
  },
  
 
  onLoad: function () {
    
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
        const toilets =new wx.BaaS.TableObject('toilet');
       const newToilets=toilets.creat();
       newToilets.set({
         address:res.address,
         latitude: res.latitude,
         longitude: res.longitude
       });
      
      
       newToilets.save().then((res)  =>{
         console.log("save suceess",res);
         
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
    // tapMaker: function(res) {
    //   console.log('tapped a marker',res);
    //   }

})