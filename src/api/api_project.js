/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  /**
   * 查询项目列表
   */
  getProjectList: params => {
    return API.GET('/api/pbmcms/proInfoController/proInfo', params);
  },
  /**
   * 查询单个项目
   */
  getProjectInfo: params => {
    return API.GET('/api/pbmcms/proInfoController/proInfo/'+params);
  },
  /**
   * 新增项目
   */
  addProject: params => {
    return API.POST('/api/pbmcms/proInfoController/proInfo', params);
  },
  /**
   * 修改项目
   */
  updateProject: params => {
    return API.PUT('/api/pbmcms/proInfoController/proInfo/'+params.proId, params.proMemb);
  },

  /**
   * 删除项目
   */
  deleteProject: params => {
    return API.DELETE('/api/pbmcms/proInfoController/proInfo/'+ params);
  },
  /**
   * 查询项目人员列表
   */
  getProjectMemberList: params => {
    return API.GET('/api/pbmcms/proMembController/proMemb', params);
  },
  /**
   * 新增项目人员
   */
  addProjectMember: params => {
    return API.POST('/api/pbmcms/proMembController/proMemb', params);
  },
  /**
   * 修改项目人员
   */
  updateProjectMember: params => {
    return API.PUT('/api/pbmcms/proMembController/proMemb/'+params.proPeoId, params.proMemb);
  },
  /**
   * 查询人员
   */
  getMemberInfo: params => {
    return API.GET('/api/pbmcms/proMembController/proMemb/'+params);
  },
  /**
   * 删除人员
   */
  deleteProjectMember: params => {
    return API.DELETE('/api/pbmcms/proMembController/proMemb/'+ params);
  },
  /**
   * 查询项目里程碑列表
   */
  getMileStoneList: params => {
    return API.GET('/api/pbmcms/proMilepostController/proMilepost',params);
  },
  /**
   * 修改里程碑
   */
  updatetMileStone: params => {
    return API.POST('/api/pbmcms/proMilepostController/proMilepost', params);
  },

  /**
   * 删除里程碑
   */
  deleteMileStone: params => {
    return API.DELETE('/api/pbmcms/proMilepostController/proMilepost/'+ params);
  },
}

