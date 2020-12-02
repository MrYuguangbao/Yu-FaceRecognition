<template>
  <div class='videos' ref='videos'>
    <button @click='showCamera()'>开启摄像头</button>
    <div class='bg-content' style='display: none'>
        <div class='show-photo'>
            <video id='video' width='600px' height='600px' autoplay='autoplay'></video>
            <canvas id='canvas' width='600px' height='600px' style='display: none'></canvas>
            <a id='downloadA'></a>
        </div>
        <div class='take-photo'>
            <button type='button' @click='takePhoto()'>
                拍照
            </button>
        </div>
        <div class='close-photo'>
            <button type='button' @click='closePhoto()'>
                关闭
            </button>
        </div>
    </div>
    <!-- </div> -->
    <!-- <video  id='video' class='vio' autoplay='autoplay' v-show='video_show'></video> -->
    <!--隐藏掉   为了发送照片-->
    <!-- <canvas id='canvas' width='498' height='238' v-show='canvas_show'></canvas> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 视频对象(全局)
      mediaStreamTrack: null
    }
  },
  methods: {
    // 打开摄像头
    showCamera () {
    /**
     * 开启摄像头
     */
      $('.bg-content').css('display', 'block')
      let constraints = {
        video: {width: 600, height: 600},
        audio: true
      }
      // 获得video摄像头区域
      let video = document.getElementById('video')
      // 这里介绍新的方法，返回一个 Promise对象
      // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
      // then()是Promise对象里的方法
      // then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
      // 避免数据没有获取到
      let promise = navigator.mediaDevices.getUserMedia(constraints)
      promise.then(function (MediaStream) {
        this.mediaStreamTrack = typeof MediaStream.stop === 'function' ? MediaStream : MediaStream.getTracks()[1]
        video.srcObject = MediaStream
        video.muted = true
        video.play()
      })
    },
    takePhoto () {
      // 拍照
      let video = document.getElementById('video')
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
      let img = document.getElementById('canvas').toDataURL('image/png')
      var triggerDownload = $('#downloadA').attr('href', img).attr('download', 'micro-blog.png')
      triggerDownload[0].click()
    },
    closePhoto () {
      // 关闭摄像头
      this.mediaStreamTrack.stop()
      $('.bg-content').css('display', 'none')
    }
  }
}
</script>

<style scoped>
    video {transform: rotateY(180deg)}
</style>
