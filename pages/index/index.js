//index.js
var constant = require("../../utils/constant.js")
var request = require("../../utils/request.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: constant.tabs,
    slideOffset: 0,
    activeIndex: 0,
    sliderWidth: 96,
    contentHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68//计算内容区高度，rpx -> px计算
        });
        that.refresh();
      }
    });
  },

  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    this.refresh();
    console.log("bindChange:" + current);
  },

  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
  },

  refresh: function() {
    wx.showLoading({
      title: '刷新中...'
    });
    var that = this;
    var index = that.data.activeIndex;
    var tab = that.data.tabs[index];
    request.requestTab(tab, true,
      function (data) {
        tab.videos = data.videos;
        tab.moreUrl = data.next;
        that.data.tabs[index] = tab;
        that.setData({ tabs: that.data.tabs });
        wx.hideLoading();
      },
      function () {
        wx.hideLoading();
        wx.showToast({
          title: '刷新失败',
          icon: 'success',
          duration: 2000
        })
      }
    );
    console.log("refresh:" + tab.name);
  },

  onLoadMore: function() {
    wx.showLoading({
      title: '加载中...'
    });
    var that = this;
    var index = that.data.activeIndex;
    var tab = that.data.tabs[index];
    request.requestTab(tab, false,
      function (data) {
        var list = tab.videos.concat(data.videos);
        tab.videos = list;
        tab.moreUrl = data.next;
        that.data.tabs[index] = tab;
        that.setData({ tabs: that.data.tabs });
        wx.hideLoading();
      },
      function () {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败',
          icon: 'success',
          duration: 2000
        })
      }
    );
    console.log("onLoadMore:" + tab.name);
  },

  onItemClick: function (event) {
    var url = event.currentTarget.dataset.video.url;
    var title = event.currentTarget.dataset.video.title;
    wx.navigateTo({
      url: '../video/video?url=' + url + "&title=" + title
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})