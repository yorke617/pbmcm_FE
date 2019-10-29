<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">项目业务度量管理系统登录</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="account.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="account.password" auto-complete="off" placeholder="密码" @keyup.enter.native="enterLogin()"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import API from '../api/api_user';
  import API_Resource from "../api/api_user"
  import CommonService from "../utils/common_service.js"

  export default {
    data() {
      return {
        loading: false,
        account: {
          userName: "",
          password: ""
        },
        rules: {
          userName: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
       /*handleLogin(){
          let resource = this.$router.options.routes;
          CommonService.setLocationStorge('access-user', resource);
          CommonService.setLocationStorge('menu-reasource', resource);
          this.$router.push({path: '/'});
      },*/
    enterLogin(){//回车搜索
        let keyCode = window.event? window.event.keyCode:window.event.which;
        if(keyCode== 13){
            this.handleLogin();//搜索函数
        }
    },
     handleLogin() {
        let that = this;
         this.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            this.loading = true;
            let loginParams = {username: this.account.userName, password: this.account.password};
            API.login(loginParams).then(data => {
              if(!data) return; 
              let result = data.data
              that.loading = false;
              if (result && result.personnelId) {
                //设置登录用户的缓存
                CommonService.setLocationStorge('access-user', result)
                //CommonService.setRoles();
                //路由中定义了所有导航左侧列表的路由，通过menuResource去控制，
                let resource = that.$router.options.routes;
                result.permissions.forEach(element => {
                  if(element.parentId > 0){
                      resource.filter(x=> x.id == element.parentId).map(item =>{ 
                        item.menuShow = true;
                        item.children.filter(s=>s.id == element.permissiId).map(d=>{
                          d.menuShow = true;
                        })
                      })
                    }else{
                      resource.filter(x=> x.id == element.permissiId).map(item=> item.menuShow = true)
                    }
                  });
                CommonService.setLocationStorge('menu-reasource', resource);
                that.$router.push({path: '/'});
              } else {
                that.$message.error('登录失败');
              }
            });
          }
        });
      }
       /*API_Resource.loadPage().then(data => {
          console.log(data.data)
          CommonService.setLocationStorge("gender_list",  data.data.gender_list);
          CommonService.setLocationStorge("education_list",  data.data.education_list);
          CommonService.setLocationStorge("hw_exp_list",  data.data.hw_exp_list);
          CommonService.setLocationStorge("if_company_list",  data.data.if_company_list);
          CommonService.setLocationStorge("rp_status_list",  data.data.rp_status_list);
          CommonService.setLocationStorge("school_type_list",  data.data.school_type_list);
          CommonService.setLocationStorge("mFlLevel_list",  data.data.mFlLevel_list);
          CommonService.setLocationStorge("mTechnologyDirection_list",  data.data.mTechnologyDirection_list);
          CommonService.setLocationStorge("mCompanyLevel_list",  data.data.mCompanyLevel_list);
          CommonService.setLocationStorge("mClientLevel_list",  data.data.mClientLevel_list);
          CommonService.setLocationStorge("rp_status_list",  data.data.rp_status_list);
          CommonService.setLocationStorge("mPosition_list",  data.data.mPosition_list);
          CommonService.setLocationStorge("hk_type_list",  data.data.hk_type_list);
          CommonService.setLocationStorge("mPositionStatus_list",  data.data.mPositionStatus_list);
       });*/
      
    }
  }    
</script>
<style scoped>
  body {
    background: url("../assets/login_bg.jpg");
  }
</style>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    /*background: url("../assets/login_bg.jpg");
    /*background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    /*background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    /*background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    /*background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    /*background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
