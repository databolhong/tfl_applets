//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    baseURL: '' // 服务器域名地址
  },
  // 后期可能放开登录限制调用
  ajax: function(url, method, params, callback, failcall) {
      var token = wx.getStorageSync('token');
      if (!token) {
          wx.navigateTo({
              url: 'pages/login/login'
          })
          return
      }
      wx.request({
        url: globalData.baseURL + url,
        data: params,
        header: {
            'content-type': 'application/json',
            'Token': token
        },
        method: method,
        success: function(res) {
            // wx.hideLoading();
            // 此处与接口约定好，返回的code对应不同的结果，0 代表请求成功  300 需要跳转，返回跳转链接forward 500 为请求异常，返回错误信息message
            if (res.data.code == '000') {
                // 如果有请求成功回调函数，则调用
                typeof callback == "function" && callback(res.data);
            } else if (res.data.code == '300') {
                if (res.data.forward) {
                    wx.navigateTo({
                        url: res.data.forward
                    })
                }
            } else {
                // 如果有请求失败回调函数，则调用
                if (failcall) {
                    failcall(res.data);
                } else {
                    if (res.data.message) {
                        wx.showModal({
                            title: '提示',
                            content: res.data.message,
                            showCancel: false,
                            confirmColor: '#92BA00'
                        });
                    }
                }
            }
        },
        fail: function(res) {
            console.log(res);
            wx.hideLoading();
            wx.showModal({
                title: '提示',
                content: "网络异常，请稍后再试",
                showCancel: false,
                confirmColor: '#92BA00'
            });
            return false;
        }
    });
},
  // 必须确定需登录才能调用
  ajax_user: function(url, method, params, callback, failcall) {
      var token = wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({
            url: 'pages/login/login'
        })
        return
      }
      wx.request({
          url: globalData.baseURL + url,
          data: params,
          header: {
              'content-type': 'application/json',
              'Token': token
          },
          method: method,
          success: function(res) {
              // wx.hideLoading();
              // 此处与接口约定好，返回的code对应不同的结果，0 代表请求成功  300 需要跳转，返回跳转链接forward 500 为请求异常，返回错误信息message
              if (res.data.code == 0) {
                  // 如果有请求成功回调函数，则调用
                  typeof callback == "function" && callback(res.data);
              } else if (res.data.code == 300) {
                  if (res.data.forward) {
                      wx.navigateTo({
                          url: res.data.forward
                      })
                  }
              } else {
                  // 如果有请求失败回调函数，则调用
                  if (failcall) {
                      failcall(res.data);
                  } else {
                      if (res.data.message) {
                          wx.showModal({
                              title: '提示',
                              content: res.data.message,
                              showCancel: false,
                              confirmColor: '#92BA00'
                          });
                      }
                  }
              }
          },
          fail: function(res) {
              console.log(res);
              wx.hideLoading();
              wx.showModal({
                  title: '提示',
                  content: "网络异常，请稍后再试",
                  showCancel: false,
                  confirmColor: '#92BA00'
              });
              return false;
          }
      });
    },
  // login页面
  ajax_wx_user: function(url, params, forward, callback, failcall, loading) {
      var app = this;
      var token = wx.getStorageSync('token');
      // 判断用户是否登录，未登录先进行登录操作
      if (token == '') {
          wx.login({
              success: function(res) {
                  if (res.code) {
                      var code = res.code;
                      // 进行登录操作
                      app.ajax('/users/login', {
                          lat: app.latitude,
                          lng: app.longitude,
                          code: code
                      }, function(data) {
                          // 登录成功，将token存储到本地
                          var token = data.token;
                          wx.setStorageSync("token", token);
                          // 判断是否需要跳转到指定页面，forward不为空则跳转，为空则继续之前请求
                          if (forward != '') {
                              wx.navigateTo({
                                  url: forward
                              });
                          } else {
                              // params.token = token;
                              app.ajax(url, params, callback, failcall, loading);
                          }
                      });
                  } else {
                      console.log('获取用户登录态失败！' + res.errMsg)
                  }
              }
          });
      } else {
          // 已登录直接请求
          // params.token = token;
          app.ajax(url, params, callback, failcall, loading);
      }
  }

})