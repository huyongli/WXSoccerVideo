var constant = require("constant.js")

function requestTab(tab, isRefresh, success, fail) {

  var name = tab.name;
  if (name == constant.HOT ||
      name == constant.COLLECTIONS) {
    var url = isRefresh ? tab.refreshUrl : tab.moreUrl;
    requestDQDVideo(url, success, fail);
  } else if (name == constant.NIDONGDE) {
    var url = isRefresh ? tab.refreshUrl : tab.moreUrl;
    requestDQDColumn(url, constant.DQD_NDD_MORE_URL_PREFIX, success, fail);
  } else if (name == constant.TXZQ) {
    var url = isRefresh ? tab.refreshUrl : tab.moreUrl;
    requestDQDColumn(url, constant.DQD_TXZQ_MORE_URL_PREFIX, success, fail);
  }
}

//懂球帝热门视频，比赛集锦
function requestDQDVideo(url, success, fail) {
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    success: function (res) {
      var data = res.data;
      var articles = data.articles;
      var videos = [];
      for(var i = 0; i < articles.length; i++) {
        var video = {};
        video.title = articles[i].title;
        video.thumb = articles[i].thumb;
        video.url = constant.DQD_VIDEO_DETAIL_URL + articles[i].id;
        videos.push(video);
      }
      
      var result = { videos: videos, next: data.next};
      success(result);
    },
    fail: function() {
      fail();
    }
  })
}

//你懂的，天下足球
function requestDQDColumn(url, prefix, success, fail) {
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    success: function (res) {
      var data = res.data;
      var articles = data.data;
      var videos = [];
      for (var i = 0; i < articles.length; i++) {
        var video = {};
        video.title = articles[i].title;
        video.thumb = articles[i].litpic;
        video.url = constant.DQD_VIDEO_DETAIL_URL + articles[i].aid;
        videos.push(video);
      }
      var next = prefix + data.last_page;
      var result = { videos: videos, next: next };
      success(result);
    },
    fail: function () {
      fail();
    }
  })
}

module.exports = {
  requestTab: requestTab
}