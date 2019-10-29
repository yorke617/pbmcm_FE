/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {


  /**
   *  向后台数据库中插入用户角色请求
   */
  addUserRole: params => {
    return API.POST('/api/pbmcms/user/newUser', params)
  },

  /**
   *  向后台数据库请求用户列表
   */
  getUsers: params => {
    return API.GET('api/pbmcms/user/users', params)
  },

  searchUser: params => {
    return API.GET('/api/pbmcms/user/users/' + params, params)
  },

  deleteUser: params => {
    return API.DELETE('/api/pbmcms/user/users/' + params.userId)
  },

  updateUser: params => {
    return API.PUT('/api/pbmcms/user/users/' + params.userId, params)
  }
}
