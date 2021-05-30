// index.js
// 获取应用实例
import Vap from './vap'

Component({
  properties: {},
  data: {
    src: '',
    isPlaying: false,
  },
  methods: {
    async init(c) {
      if (this.data.vap) return
      const c1 = await this.getNode('.canvas2d')
      const c2 = await this.getNode('.canvasWebgl')
      const v = await this.getVideo('.video')
      const res = wx.getSystemInfoSync()
      console.log(c1, c2, v)
  
      const {
        src = '',
        config,
        width = 750,
        height = 750,
        fps,
        mode,
        custom = {}
      } = c
  
      if (!src || !config) return

      if (mode === 'video') {
        this.setData({
          src,
        })
      }

      const vap = new Vap({
        src,
        config,
        width,
        height,
        fps,
        c1,
        c2,
        v,
        dpr: res.pixelRatio,
        mode,  // video or decoder
        // 融合信息（图片/文字）,同素材生成工具生成的配置文件中的srcTag所对应，比如[imgUser] => imgUser
        ...custom,
        onDestroy: () => {
          this.setData({
            isPlaying: false,
          })
        }
      })

      this.setData({
        isPlaying: true,
      })
    },
  
    getNode(cls) {
      const self = this
      return new Promise(function(resolve) {
          wx.createSelectorQuery()
          .in(self)
          .select(cls)
          .node(res => {
              const webgl = res.node
              resolve(webgl)
          })
          .exec()
      })
    },
    
    getVideo(cls) {
      const self = this
      return new Promise(function(resolve) {
          wx.createSelectorQuery()
          .in(self)
          .select(cls)
          .context(res => {
              const video = res.context
              resolve(video)
          }).exec()
      })
    },
  }
})
