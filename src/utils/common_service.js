export default{


    /**
     * 下载文件
     */
    downloadFile(response) {
      if(!response) return;
      let url = "ftp://"+ response.userName + ":" + response.passWord +"@"+response.ip +"/"+ response.saveFileName
      let elink = document.createElement('a')
      elink.href = url
      elink.download = response.fileName; //下载后文件名
      document.body.appendChild(elink)
      elink.click();
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    },

    /**
     * 日期时间格式化
     * @param date 
     * @param fmt 默认值为长日期格式
     */
    dateTimeFormat(date, fmt = "yyyy-MM-dd hh:mm:ss") {
        return A.dateFormat(date, fmt)
    },

    dateFormat (date, fmt = "yyyy-MM-dd") {
      // 空数据处理
      if (date === null || date === undefined || date === '') {
        return ''
      }
     
      // 如果是时间戳则转化为时间
      if (typeof date === 'number') {
        date = new Date(date)
      }
     
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
     
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
     
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
     },

     /**
      * 权限码验证
      * @param {*} authCode 
      */
     auth(authCode){
       let flag = false;
       if(!authCode) return;
       let roleAuth = JSON.parse(localStorage.getItem('access-user'));
       if(roleAuth && roleAuth.skillIdList){
          roleAuth.skillIdList.filter(x => {
            if(authCode==x){
               flag = true;
               return flag;
            }
          });
       }
       return flag;   
     },


     /**
      * 存储本地缓存数据
      * @param {} key 
      * @param {*} value 
      */
     setLocationStorge( key, value){
        if(key && value){
          localStorage.setItem(key, JSON.stringify(value));
        }
     },

     /**
      * 获取登录人
      */
     getLoginUser(){
       return JSON.parse(localStorage.getItem("access-user"));
     },

     getRoles(){
       console.log(localStorage.getItem("roles"))
       return JSON.parse(localStorage.getItem("roles"))
     },

     /**
      * 获取登录人角色
      */
    setRoles(){
      let roles = {
        superAdminRole: "",
        baseInformationRole: "",
        insuranceRole: "",
        candidateRole: ""          
      }
      let user = this.getLoginUser();
      let roleIdList = user.roleIdList;
      roleIdList.forEach(item=>{
        if(item == 1){
          roles.superAdminRole = item;
        }else if(item == 2){
          roles.baseInformationRole = item;
        }else if(item == 3){
          roles.insuranceRole = item;
        }else if(item == 4){
          roles.candidateRole = item;
        }else{

        }
      })
      localStorage.setItem("roles", JSON.stringify(roles));
    },

}



 

