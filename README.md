# Vap Miniprogram Demo


基于[vap](https://github.com/Tencent/vap)改的小程序版本

改造内容如下：
1. 去除createElement等小程序不支持语法，改为小程序自定义组件引入，从构造函数中传入video、canvas上下文对象。
2. 小程序video不支持监听事件（on）注册，忽略该部分。
3. 小程序video不属于HTMLVideoElement，无法直接作为视频帧指定二维纹理，需要用canvas从video中获取视频帧再提取imageData。
4. 新增小程序视频解码模式，可代替video标签获取视频帧，[实测性能](https://iwiki.woa.com/pages/viewpage.action?pageId=751805193)更好。但高帧率（测试60fps）视频会出现问题，详见[VideoDecoder getFrameData 在安卓上视频解码未结束，但是返回 null ？](https://developers.weixin.qq.com/community/develop/doc/000246a78885686400ba521065b000)。
   
    ```javascript
    // 创建解码器
    this.decoder = wx.createVideoDecoder()
    // 增加解码器监听
    decoder.on('start', () => {
        decoder.seek(0)
        this.drawFrame()
    })
    decoder.on('end', () => {
        decoder.stop()
        this.destroy()
    })
    // 开始解码视频
    decoder.start({
        source: this.options.src,
        mode: 0,
    })

    // 从解码器中获取视频帧
    var imageData = this.decoder.getFrameData()
    ```

5. 真机预览不支持webgl texImage2D部分API。

   ```javascript
    // 真机预览：Android无渲染、iOS崩溃
    // 开发者工具：正常
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgData);

    // 真机预览与开发者工具均正常
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        imgData.width,
        imgData.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array(imgData.data)
    )
   ```

## 使用方法

1. json文件引入自定义组件

    ```
    {
        "usingComponents": {
            "vap-miniprogram": "../components/vap-miniprogram/index"
        }
    }
    ```

2. wxml引入自定义组件

    ```
    <view class="container">
        <vap-miniprogram id="vap"></vap-miniprogram>
    </view>
    ```

3. vap配置文件修改

    ```javascript
    // vap配置文件json格式，需要改为js模块引入。
    module.exports = {
        "info": {
            "v": 2,
            "f": 420,
            "w": 1242,
            "h": 1242,
            "fps": 60,
            "videoW": 1872,
            "videoH": 1248,
            "aFrame": [1246,0,621,621],
            "rgbFrame": [0,0,1242,1242],
            "isVapx": 0,
            "orien": 0
        }
    }
    ```

4. js播放动画

    ```javascript
    import config from './60'

    this.selectComponent('#vap').init({
      src: '', // 视频地址
      config, // vap配置文件
      width: 750,
      height: 750,
      fps: 60, // 与配置文件和视频文件对应的fps
      mode: 'video', // 解码模式支持video和decoder
    })
    ```