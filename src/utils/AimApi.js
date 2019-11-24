import http from '../http'
import Constants from '@/utils/constants'
export default {
  inquiryProductListByLoginId (loginId) {
    return http.get(`${Constants.ServiceContext.AIM_SERVICE}/product/inquiryProductListByLoginId?loginId=${loginId}`)
      .then(response => {
        return response.data
      })
  },
  getRoleListByProductAndId (loginId, product) {
    return http.get(`${Constants.ServiceContext.AIM_SERVICE}/role/getRoleListByProductAndId?loginId=${loginId}&product=${product}`)
      .then(response => {
        return response.data
      })
  },
  getMenuByProductAndRole (product, roleId) {
    return http.get(`${Constants.ServiceContext.AIM_SERVICE}/menu/getMenuByProductAndRole?product=${product}&roleId=${roleId}`)
      .then(response => {
        return response.data
      })
  },
  getMenuPermissionByProductAndRole (product, roleId) {
    return http.get(`${Constants.ServiceContext.AIM_SERVICE}/menu/getMenuPermissionByProductAndRole?product=${product}&roleId=${roleId}`)
      .then(response => {
        return response.data
      })
  },
  getUserDetailById (loginId, product) {
    return http.get(`${Constants.ServiceContext.AIM_SERVICE}/user/getUserDetailById?loginId=${loginId}&product=${product}`)
      .then(response => {
        return response.data
      })
  }
}