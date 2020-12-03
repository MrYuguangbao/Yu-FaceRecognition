<template>
    <el-dialog
        title='拍照上传'
        :visible.sync='visible'
        @close='onCancel'
        :append-to-body='true'
        :close-on-click-modal='false'
    >
        <div class='box'>
            <video
                id='videoCamera'
                class='canvas'
                :width='videoWidth'
                :height='videoHeight'
                autoplay
            ></video>
            <canvas
                id='canvasCamera'
                class='canvas'
                :width='videoWidth'
                :height='videoHeight'
            ></canvas>
        </div>
        <div slot='footer'>
            <el-button
                @click='drawImage'
                icon='el-icon-search'
                size='small'
                >拍照</el-button
            >
            <el-button
                v-if='os'
                @click='getCompetence'
                icon='el-icon-video-camera'
                size='small'
                >打开摄像头</el-button
            >
            <el-button
                v-else
                @click='stopNavigator'
                icon='el-icon-switch-button'
                size='small'
                >关闭摄像头</el-button
            >
            <el-button
                @click='resetCanvas'
                icon='el-icon-refresh'
                size='small'
                >重置</el-button
            >
            <el-button
                @click='onCancel'
                icon='el-icon-circle-close'
                size='small'
                >完成</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      videoWidth: 600,
      videoHeight: 600,
      os: true,
      visible: true
    }
  },
  methods: {
    onTake () {
      this.visible = true
      this.getCompetence()
    },
    onCancel () {
      this.visible = false
      this.stopNavigator()
    },
    // 调用摄像头权限
    getCompetence () {
      // 必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      this.$nextTick(() => {
        const _this = this
        this.os = false // 切换成关闭摄像头
        this.thisCancas = document.getElementById('canvasCamera')
        this.thisContext = this.thisCancas.getContext('2d')
        this.thisVideo = document.getElementById('videoCamera')
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            let getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(
                new Error('getUserMedia is not implemented in this browser')
              )
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        const constraints = {
          audio: false,
          video: {
            width: _this.videoWidth,
            height: _this.videoHeight,
            transform: 'scaleX(-1)'
          }
        }
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ('srcObject' in _this.thisVideo) {
              _this.thisVideo.srcObject = stream
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream)
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play()
            }
          })
      })
    },
    // 绘制图片
    drawImage () {
      // 点击，canvas画图
      this.thisContext.drawImage(
        this.thisVideo,
        0,
        0,
        this.videoWidth,
        this.videoHeight
      )
      // 获取图片base64链接
      this.managerObj.registerphoto = this.thisCancas.toDataURL('image/jpeg')
      this.file = this.base64ToFile(this.managerObj.registerphoto)
      console.log(this.file)
    },
    // 清空画布
    clearCanvas (id) {
      let c = document.getElementById(id)
      let cxt = c.getContext('2d')
      cxt.clearRect(0, 0, c.width, c.height)
    },
    // 重置画布
    resetCanvas () {
      this.managerObj.registerphoto = ''
      this.clearCanvas('canvasCamera')
    },
    // 关闭摄像头
    stopNavigator () {
      if (this.thisVideo && this.thisVideo !== null) {
        this.thisVideo.srcObject.getTracks()[0].stop()
        this.os = true // 切换成打开摄像头
      }
    },
    // 将图片文件转为base64
    imageToBase64 (file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {yield
        this.managerObj.registerphoto = reader.result
        console.log('file 转 base64结果：' + this.managerObj.registerphoto)
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
    // 将base64转为图片文件
    base64ToFile (urlData, fileName = 'file.jpg') {
      let arr = urlData.split(',')
      let mime = arr[0].match(/:(.*?)/)[1]
      let bytes = atob(arr[1]) // 解码base64
      let n = bytes.length
      let ia = new Uint8Array(n)
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      return new File([ia], fileName, { type: mime })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    }
  }
}
</script>
