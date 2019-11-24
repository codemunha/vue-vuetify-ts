import iView from 'iview'
import axios from 'axios'
import Vue from 'vue'
import locale from 'iview/dist/locale/th-TH'
import Auth from 'dsl-core/src/api/auth'
import store from '@/store'
import jwt from 'jsonwebtoken'
Vue.use(iView, {
  locale
})

const http = axios.create({
// TODO: support configable
  baseURL: process.env.VUE_APP_PATH,
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  withCredentials: true
})

const secret = process.env.VUE_APP_SECRET

// Add a request interceptor
http.interceptors.request.use(
  function (request) {
    // Do something before request is sent
    store.commit('coreStore/HTTP_REQ')
    iView.LoadingBar.start()
    // console.log(iView.LoadingBar)
    request.headers['Authorization'] = 'Bearer ' + Auth.getAccessToken()
    request.headers['X-API-KEY'] = 'DMSXXXXX'
    request.headers['X-CH-ID'] = 'DMS'
    // request.headers['Access-Control-Allow-Origin'] = '*'

    // start encode
    // console.log('mode=' + process.env.VUE_APP_MODE)
    // console.log('config=', config)
    const message = {
      data: request.data === undefined || request.data === null ? {} : request.data,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor((new Date().setFullYear(new Date().getFullYear() + 1)) / 1000), // month
      sub: 'aa@example.com',
      aud: 'www.studentloan.or.th',
      iss: 'dsl-client'
    }
    if (process.env.VUE_APP_MODE == 'SIT') {
      if (request.method.toUpperCase() == 'GET') {
        // let params = new URLSearchParams(config.url.split(/?(.+)/)[1])
        // console.log('get params =', params)
      } else {
        let encode = jwt.sign(message, secret)
        // console.log('encode=', encode)
        request.data = encode
      }
    }
    // end encode

    return request
  },
  function (error) {
    // Do something with request error
    store.commit('coreStore/HTTP_REQ_DONE')
    iView.LoadingBar.error()
    let ele = document.body.style
    if (ele) {
      let val = ele.getPropertyValue('overflow')
      if (val && val == 'hidden') {
        ele.removeProperty('overflow')
      }
    }
    return Promise.reject(error)
  }
)

http.interceptors.response.use(

  function (response) {
    // console.log(Auth.parseJwt(response.data).data)
    // Do something with response data
    store.commit('coreStore/HTTP_REQ_DONE')
    // console.log(response)
    iView.LoadingBar.finish()
    if (store.state.coreStore.requests == 0) {
      let ele = document.body.style
      if (ele) {
        let val = ele.getPropertyValue('overflow')
        if (val && val == 'hidden') {
          ele.removeProperty('overflow')
        }
      }
    }

    // start decode
    if (process.env.VUE_APP_MODE == 'SIT') {
      // console.log('response.headers', response.headers['content-type'])
      const str = response.headers['content-type']
      if (str.includes('text/plain') || str.includes('application/json')) {
        response.data = Auth.parseJwt(response.data).data
      }
    }
    // end decode

    return response
  },
  function (error) {
    // console.log(error)
    store.commit('coreStore/HTTP_REQ_DONE')
    iView.LoadingBar.error()
    let ele = document.body.style
    if (ele) {
      let val = ele.getPropertyValue('overflow')
      if (val && val == 'hidden') {
        ele.removeProperty('overflow')
      }
    }

    // Do something with response error
    // return Promise.reject(error)
    let errorCode = error.response.data.errorCode || error.response.status
    let errorMsg = error.response.data
    // iView.Message.error(`Error: code ${errorCode}, Message ${errorMsg}`)
    iView.Notice.error({
      title: `Error  ${errorCode}`,
      desc: `${errorMsg}`
    })
    // Vue.toasted.global.app_error({
    //   code: errorCode,
    //   message: errorMsg:
    // })
  })

export default http
