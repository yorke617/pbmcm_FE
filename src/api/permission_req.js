import * as API from './'

var baseUrl = "/api/pbmcms";
export default {

  /**
   *  新增功能
   */
  addRole: params => {
    return API.POST(baseUrl + '/role/addRole', params)
  },

  /**
   *  获取功能
   */
  getAllPermissions: params => {
    return API.GET(baseUrl + '/functions/getAllFuns', null)
  },

  getPermissionsByRole: roleId => {
    return API.GET_REST(baseUrl + "/functions/permissions/" + roleId)
  }

}
