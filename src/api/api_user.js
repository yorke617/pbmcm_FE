/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('/api/pbmcms/login/form', params)
  },

  //修改个人信息
  changeProfile: params => {
    return API.PATCH('/api/v1/users/profile', params)
  },

  /**
   *  获取人员基本信息表头-可选菜单和不可选菜单的数据
   */
  getColumnShow: params => {
    return API.POST('/api/member/role/get/column-show', params)
  },

  /**
   * 保存所选表头列表
   */
  setColumnShow: params => {
    return API.POST('/api/member/role/set/column-show', params)
  },


  /**
   * 获取用户列表
   */
  getUserList: params => {
    return API.POST('/api/employeBase/getPersonBasicInfo', params)
  },

  /**
   * 获取用户表头显示
   */
  getUserColumShowt: params => {
    return API.GET('/api/employeBase/getScreenColumnShow', params)
  },

  /**
   * 新增用户
   */
  addUser: params => {
    return API.POST('/api/employeBase/addEmployeBase', params)
  },

  /**
   * 修改用户
   */
  updateUser: params => {
    return API.POST('/api/employeBase/updateEmploye', params)
  },

  /**
   * 删除用户
   */
  deleteUser: params => {
    return API.POST('/api/member/del', params)
  },
  /**
   * 获取已入项，未入项
   * @param params
   */
  getEmployes: params => {
    return API.GET('/api/EmployeFilter/getEmployes', params)
  },

  /**
   * 通过id获取对应的用户信息
   */
  getUser: params => {
    return API.POST('/api/member/get', params)
  },

  getviewDetails: params => {
    return API.POST('/api/employeBase/viewDetails', params)
  },

  /**
   * 根据工号获取简历详情
   */
  getResumeDetail: params => {
    return API.POST('/api/resume/get', params)
  },
  /**
   * 编辑修改简历
   */
  editResume: params => {
    return API.POST('/api/resume/save', params)
  },

  /**
   * 查看操作日誌
   */
  operatorLog: params => {

    return API.GET('/api/pbmcms/operateLogController/operateLog', params)
  }
}
