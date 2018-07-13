//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    nav: 'index',
    dataItems: [
      {
        title: '泰康养老保险',
        description: '泰康 #全心为您',
        product_id: '',
        w: 650,
        h: 364,
        items: [
          {
            code: '123',
            txt: '健康有约保障计划2018',
            img_url: '/images/index/a1.png',
            price: 42.00, // 当前价格
            org_price: 42.00, // 活动前价格
            show_price_qi: true // 是否显示起
          },
          {
            code: '123',
            txt: '汇享有约保险计划2018',
            img_url: '/images/index/a1.png',
            price: 5000.00, // 当前价格
            org_price: 5000.00, // 活动前价格
            show_price_qi: true // 是否显示起
          },
          {
            code: '123',
            txt: '泰康e保有约住院医疗',
            img_url: '/images/index/a1.png',
            price: 126.00, // 当前价格
            org_price: 126.00, // 活动前价格
            show_price_qi: false // 是否显示起
          }
        ]
      },
      {
        title: '好物',
        description: '网易严选 #好的生活没那么贵',
        w: 650,
        h: 642,
        items: [
          {
            code: '123',
            txt: '100年传世珐琅锅 马卡龙系列',
            img_url: '/images/index/a4.png',
            price: 434.00, // 当前价格
            org_price: 999.00, // 活动前价格
            show_price_qi: false // 是否显示起
          },
          {
              code: '123',
              txt: '100年传世珐琅锅 马卡龙系列',
              img_url: '/images/index/a4.png',
              price: 434.00, // 当前价格
              org_price: 999.00, // 活动前价格
              show_price_qi: false // 是否显示起
          },
          {
              code: '123',
              txt: '100年传世珐琅锅 马卡龙系列',
              img_url: '/images/index/a4.png',
              price: 434.00, // 当前价格
              org_price: 999.00, // 活动前价格
              show_price_qi: false // 是否显示起
          }
        ]
      },
      {
          title: '豆瓣电影',
          description: '我的精神角落',
          w: 544,
          h: 765,
          items: [
              {
                  code: '123',
                  txt: '《红海行动》',
                  txt_dec: '不抛弃 不放弃',
                  img_url: '/images/index/a3.png',
                  price: 434.00, // 当前价格
                  org_price: 999.00, // 活动前价格
                  show_price_qi: false // 是否显示起
              },
              {
                  code: '123',
                  txt: '《红海行动》',
                  txt_dec: '不抛弃 不放弃',
                  img_url: '/images/index/a3.png',
                  price: 434.00, // 当前价格
                  org_price: 999.00, // 活动前价格
                  show_price_qi: false // 是否显示起
              },
              {
                  code: '123',
                  txt: '《红海行动》',
                  txt_dec: '不抛弃 不放弃',
                  img_url: '/images/index/a3.png',
                  price: 434.00, // 当前价格
                  org_price: 999.00, // 活动前价格
                  show_price_qi: false // 是否显示起
              }
          ]
}
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
    //事件处理函数
  navTap (event) {
    console.log(event)
    this.setData({
      nav: event.currentTarget.dataset.nav
    })
    wx.showModal({
      // title: event.currentTarget.dataset.nav,
      title: '提示',
      content: event.currentTarget.dataset.nav,
      showCancel: false
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
