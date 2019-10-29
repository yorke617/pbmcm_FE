import * as API from './'

var baseUrl = "/api/pbmcms";
export default {

  /**
   *  新增角色
   */
  addRole: params => {
    return API.POST(baseUrl + '/role/addRole', params)
  },

  /**
   *  获取角色
   */
  getRole: roleId => {
    roleId = (roleId == null ? "-1" : roleId)
    return API.GET_REST(baseUrl + '/role/roles/' + roleId)
  },
  /**
   * 修改角色
   */
  updateRole: (roleId, params) => {
    return API.PUT(baseUrl + '/role/roles/' + roleId, params)
  },

  /**
   * 删除角色
   */
  deleteRole: (params)=>{
    return API.DELETE(baseUrl + '/role/roles/' + params, params)
  }

}
