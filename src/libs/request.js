import axios from 'axios';
import Qs from 'qs';
import { httpUrl } from './httpUrl';
import router from '../router';

const JSON_TYPE = 'json';
const FORM_CONFIG = {
  transformRequest: [function(data) {
    data = Qs.stringify(data);
    return data;
  }],
  Headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
};
const JSON_CONFIG = {
  transformRequest: [function(data) {
    let standardJson = decodeURI(encodeURI(JSON.stringify(data)));
    return standardJson;
  }],
  headers: { 'Content-Type': 'application/json' }
};

const ajax = axios.create({
  baseURL: httpUrl,
  transformRequest: [function(data) {
    data = Qs.stringify(data);
    return data;
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 20000
});

// const impajax = axios.create({
//     baseURL: httpUrl,
//     // transformRequest: [function(data) {
//     //     data = Qs.stringify(data);
//     //     return data;
//     // }],
//     headers: { 'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime() },

//     timeout: 20000
// });
const impajax = axios.create({
  baseURL: httpUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': localStorage.getItem('token')
  },
  timeout: 40000
});
impajax.defaults.headers.common['token'] = localStorage.getItem('token');

ajax.interceptors.response.use(
  function(response) {
    // if (response.data.status === 'auth-1001' || response.data.status === 'auth-1000' || response.data.status === 'auth-1003') {
    //     localStorage.clear();
    //     Cookies.set('locking', '0');
    //     router.push('/login');
    //     response.data.message = '登录信息失效，请重新登录！';
    //     return response.data;
    // } else if (response.data.status === 'auth-1002') {
    //     router.push('/403');
    //     return response.data;
    // } else if (response.data.status === '404') {
    //     router.push('/404');
    //     return response.data;
    // } else {
    //     return response.data;
    // }
    // if (response.data.status == 0 && response.data.ret_code == 21000) {
    //     localStorage.clear();
    //     router.push('/');
    //     response.data.message = '登录信息失效，请重新登录！';
    //     return response.data;
    // }
    if (response.data.toString().indexOf('登录') !== -1) {
      location.href = '/login';
    } else {
      return response.data;
    }
  },
  function(error) {
    // if (error.response) {
    //     let status = error.response.status;
    //     switch (status) {
    //         case 504:
    //             error.message = '请求超时，请检查网络！';
    //             break;
    //         case 500:
    //             error.message = '服务器繁忙，请稍后再试！';
    //             break;
    //         case 404:
    //             error.message = '页面不存在！';
    //             break;
    //         default:
    //             error.message = '未知错误！';
    //     }
    // }
    // return Promise.reject(error);
    // if (error.response.data.message == '登陆失效，请重新登陆') {
    //     router.push('/')
    // }
    return Promise.reject(error.response.data);
  }
);

ajax.interceptors.request.use(
  config => {
    if(localStorage.getItem('Authorization')!='null' || localStorage.getItem('Authorization') != null){
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
impajax.interceptors.request.use(
  config => {
    if(localStorage.getItem('Authorization')!='null' || localStorage.getItem('Authorization') != null){
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

/**
 * GET请求方法封
 * @param {*} url request url
 * @param {*} params param
 * @param {*} dataType
 */
export function get(url, params = {}, dataType) {
  return new Promise((resolve, reject) => {
    ajax.get(`${url}?${ Qs.stringify(params)}`,
      dataType === JSON_TYPE ? JSON_CONFIG : ''
    ).then(res => {
      if (res.status == '200'||res.status == '201'||res.status == '204') {
        resolve(res);
      } else {
        reject(res)
        this.$message.error(res.message)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * POST请求方法封装
 * @param {*} url request url
 * @param {*} data
 * @param {*} dataType
 */
export function post(url, data = {}, dataType) {
  return new Promise((resolve, reject) => {
    ajax.post(
      url, {...data },
      dataType === JSON_TYPE ? JSON_CONFIG : FORM_CONFIG
    ).then(res => {
      if (res.status == '200'||res.status == '201'||res.status == '204') {
        resolve(res);
      } else {
        reject(res)
        this.$message.error(res.message)
      }
    }).catch(error => {
      this.$message.error(error.msg)
      reject(error);
    });
  });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, data = {}, dataType) {
  return new Promise((resolve, reject) => {
    ajax.put(
      url, {...data },
      dataType === JSON_TYPE ? JSON_CONFIG : FORM_CONFIG
    )
      .then(res => {
        resolve(res.data);
        // Loading.service(true).close();
        //  Message({message: '请求成功', type: 'success'});
      })
      .catch(err => {
        reject(err.data)
        // Loading.service(true).close();
      })
  });
}

/**
 * IMPORT请求方法封装
 * @param {*} url request url
 * @param {*} data
 * @param {*} dataType
 */
export function importExc(url, data = {}, dataType) {
  return new Promise((resolve, reject) => {
    impajax.post(
      url, {...data }, dataType === JSON_TYPE ? JSON_CONFIG : ''
    ).then(res => {
      if (res.status == '1') {
        resolve(res);
      } else {
        reject(res);
        this.$message.error(res.msg)
      }
    }).catch(error => {
      this.$message.error(error.msg)
      reject(error);
    });
  });
}

/**
 * DELET方法
 */
export function del(url, data = {}, dataType) {
  return new Promise((resolve, reject) => {
    ajax.delete(
      url, {
        data: data,
        transformRequest: [function(data) {
          let param;
          if (dataType === JSON_TYPE) {
            param = decodeURI(encodeURI(JSON.stringify(data)));
          } else {
            param = Qs.stringify(data);
          }
          return param;
        }],
        headers: dataType === JSON_TYPE ? { 'Content-Type': 'application/json' } : { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    ).then(res => {
      if (res.status == '200'||res.status == '201'||res.status == '204') {
        resolve(res);
      } else {
        reject(res)
        this.$message.error(res.message)
      }
    }).catch(error => {
      reject(error);
    });
  });
}
