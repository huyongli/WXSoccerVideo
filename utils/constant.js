const HOT = "热门视频";
const COLLECTIONS = "比赛集锦";
const NIDONGDE = "你懂专栏";
const TXZQ = "天下足球";
const HUPUSOCCER = "虎扑足球";
const DQD_VIDEO_DETAIL_URL = "https://api.dongqiudi.com/v2/articles/video_info/";//+videoId
const DQD_NDD_MORE_URL_PREFIX = "https://api.dongqiudi.com/old/columns/176?page=";//你懂的url
const DQD_TXZQ_MORE_URL_PREFIX = "https://api.dongqiudi.com/old/columns/138?page=";//天下足球url
const DQD_DETAIL_VIDEO_PREFIX = "http://api.dongqiudi.com/video/play/";//视频播放url前缀

var tabs = [
  { 
    name: HOT, 
    refreshUrl: "https://api.dongqiudi.com/app/tabs/android/43.json?mark=gif&version=118", 
    moreUrl: "",
    videos: []
  },
  { 
    name: COLLECTIONS, 
    refreshUrl: "https://api.dongqiudi.com/app/tabs/android/11.json?mark=gif&version=118", 
    moreUrl: "",
    videos: []
  },
  { 
    name: NIDONGDE, 
    refreshUrl: "https://api.dongqiudi.com/old/columns/176?page=1", 
    moreUrl: "",
    videos: []
  },
  { 
    name: TXZQ, 
    refreshUrl: "https://api.dongqiudi.com/old/columns/138?page=1", 
    moreUrl: "",
    videos: []
  }
  // ,
  // { 
  //   name: HUPUSOCCER, 
  //   refreshUrl: "", 
  //   moreUrl: "",
  //   videos: []
  // }
];

module.exports = {
  tabs: tabs,
  HOT: HOT,
  COLLECTIONS: COLLECTIONS,
  NIDONGDE: NIDONGDE,
  TXZQ: TXZQ,
  HUPUSOCCER: HUPUSOCCER,
  DQD_VIDEO_DETAIL_URL: DQD_VIDEO_DETAIL_URL,
  DQD_NDD_MORE_URL_PREFIX: DQD_NDD_MORE_URL_PREFIX,
  DQD_TXZQ_MORE_URL_PREFIX: DQD_TXZQ_MORE_URL_PREFIX,
  DQD_DETAIL_VIDEO_PREFIX: DQD_DETAIL_VIDEO_PREFIX
}