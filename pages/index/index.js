// index.js
// 获取应用实例
import config from './demo'

Page({
  data: {
    src: "",
  },
  onLoad() {
    
  },
  async init() {
    this.selectComponent('#vap').init({
      src: 'https://temp-1253439916.cos.ap-guangzhou.myqcloud.com/demo.mp4',
      config,
      width: 600,
      height: 300,
      fps: 24,
      mode: 'video',
      custom: {
        imgUser: 'https://shp.qlogo.cn/pghead/Q3auHgzwzM6TmnCKHzBcyxVPEJ5t4Ria7H18tYJyM40c/0',
        imgAnchor: 'https://shp.qlogo.cn/pghead/PiajxSqBRaEKRa1v87G8wh37GibiaosmfU334GBWgk7aC8/140',
        textUser: 'user1',
        textAnchor: 'user2',
      }
    })
  },

  initDecoder() {
    this.selectComponent('#vap').init({
      src: 'https://temp-1253439916.cos.ap-guangzhou.myqcloud.com/demo.mp4',
      config,
      width: 600,
      height: 300,
      fps: 24,
      mode: 'decoder',
      custom: {
        imgUser: 'https://shp.qlogo.cn/pghead/Q3auHgzwzM6TmnCKHzBcyxVPEJ5t4Ria7H18tYJyM40c/0',
        imgAnchor: 'https://shp.qlogo.cn/pghead/PiajxSqBRaEKRa1v87G8wh37GibiaosmfU334GBWgk7aC8/140',
        textUser: 'user1',
        textAnchor: 'user2',
      }
    })
  }
})
