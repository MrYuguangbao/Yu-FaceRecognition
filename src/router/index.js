import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Videos from '@/components/Videos'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'FaceRecognition',
    //   component: FaceRecognition
    // }
    {
      path: '/',
      name: 'Videos',
      component: Videos
    }
  ]
})
