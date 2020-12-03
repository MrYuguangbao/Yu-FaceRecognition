import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Videos from '@/components/Videos'
// import VideosPC1 from '@/components/VideosPC1'
// import VideosPC2 from '@/components/VideosPC2'
// import VideosPC3 from '@/components/VideosPC3'

Vue.use(Router)
Vue.use(VueResource)

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
    // {
    //   path: '/',
    //   name: 'VideosPC1',
    //   component: VideosPC1
    // }
    // {
    //   path: '/',
    //   name: 'VideosPC3',
    //   component: VideosPC3
    // }
  ]
})
