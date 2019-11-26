import axios from 'axios'
import store from '@/store'

const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  withCredentials: true
})

http.interceptors.request.use(
  function(request: any) {
    console.log('http request...', request)
    store.commit('HTTP_REQ')
    return request
  },
  function(error: any) {
    console.log('http error...', error)
    store.commit('HTTP_REQ_DONE')
    return error
  }
)

http.interceptors.response.use(
  function(response: any) {
    console.log('http response...', response)
    store.commit('HTTP_REQ_DONE')

    return response
  },
  function(error: any) {
    console.log('http error...', error)
    return error
  }
)

export default http