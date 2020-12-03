import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store =  new Vuex.Store({
    //所有的数据都放在state中
    state:{
        Authorization:localStorage.getItem('Authorization')?localStorage.getItem('Authorization'):''
    },

    //操作数据，唯一的通道是mutations
    mutations:{
        //修改token
        chLogin(state,user){
            state.Authorization = user.Authorization
            localStorage.setItem('Authorization',user.Authorization)
        }
    },

    //actions,可以来做异步操作，然后提交给mutations，而后再对state(数据)进行操作
    actions:{}
})
export default store