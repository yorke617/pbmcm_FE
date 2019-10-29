/**
 * Created by jerry on 2017/6/9.
 */
import axios from 'axios'
import {bus} from '../bus.js'
import { MessageBox, Notification } from 'element-ui'


axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

//添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//   console.dir(config);
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  if (response.data && response.data.errcode) {
    if (parseInt(response.data.errcode) === 40001) {
      //未登录
      bus.$emit('goto', '/login')
    }
  }
  return response;
}, error => {
  // Do something with response error
  return Promise.reject(error);
});

//基地址
let base = '';  //接口代理地址参见：config/index.js中的proxyTable配置

//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(successBack, failedBack)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(successBack, failedBack)
}

export const GET_REST = (url) => {
  return axios.get(`${base}${url}`).then(successBack, failedBack)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(successBack, failedBack)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(successBack, failedBack)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(successBack, failedBack)
}

let successBack = function(res) {
  if (!res.data.success) {
    Notification.error(res.data.msg);
    return Promise.resolve(res.data);
  }else {
    return res.data;
  }
}
let failedBack = function(res) {
  Notification.error(res.response.data.msg);
  return Promise.resolve(res.response.data);
}
