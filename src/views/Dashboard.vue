<template>
    <div id="app" style="min-width: 1200px;max-width: 1600px">
    <div v-if="firstDisplay">
      <el-row>
        <el-col :span="9">
          <input style="outline: 0;border: 0px;margin-top: 10px;font-size: 14px" type="text" placeholder="上午好，张振华！"
                 disabled="true" class="el-input__inner">
          <input style="outline: 0;border: 0px;font-size: 15px" type="text" placeholder="今天中雨转大雨，有风，注意添衣哦！！"
                 disabled="true" class="el-input__inner">
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入内容" style="margin-top: 30px;" class="input-with-select">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="margin-top: 30px;width: 100px">搜&nbsp;&nbsp;索</el-button>
        </el-col>
        <el-col :span="3">
          <el-tag type="info" style="margin-top: 30px;width: 100px">+ 创建职位</el-tag>
        </el-col>
        <el-col :span="1">
          <el-tag type="info" style="margin-top: 30px;width: 100px">+ 新建应聘者</el-tag>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-col :span="14">
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>

        <el-col :span="4" style="margin-left:60px;">
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="4" style="margin-left:5px;">
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px">
        <el-col :span="14">
          <el-card class="box-card">
            <div v-for="o in 12" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>

        <el-col :span="8" style="margin-left:60px;">
          <el-card class="box-card">
            <div v-for="o in 12" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {bus} from '../bus.js'
  import API from '../api/api_user';

  export default {
    name: 'home',
    created(){
      bus.$on('setNickName', (text) => {
        this.nickname = text;
      })

      bus.$on('goto', (url) => {
        if (url === "/login") {
          localStorage.removeItem('access-user');
          localStorage.removeItem('menu-reasource');
        }
        this.$router.push(url);
      })
    },
    data () {
      return {
        defaultActiveIndex: "0",
        nickname: '',
        collapsed: false,
        rateSettingVisible: false,
        meunResources:  JSON.parse(localStorage.getItem('menu-reasource')),
        operateId: "",
        activeIndex: '1',
        activeIndex2: '1',
        firstDisplay:true,
        logo: require('../assets/home_logo.png'),
      }
    },
    methods: {
      handleSelect(index){
        this.defaultActiveIndex = index;
      },

      openRatePage(){
          this.$nextTick(() => {
            let form = this.$refs["rate-setting"];
            form.initPage();
          });
      },

      closeRateSetting(){
        this.rateSettingVisible=false;
      },
      rateSettingShow(){
        this.rateSettingVisible=true;
      },

      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout(){
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          that.loading = true;
          localStorage.removeItem('access-user');
          localStorage.removeItem('menu-reasource');
          that.$router.go('/login'); //用go刷新
        }).catch(() => {});
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.memName || '';
        this.operateId = user.numUid || '';
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .span-style{
      color: #555;
      font-size: 14px;
    }

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 40px;
        /*border-left: 10px solid #000;*/
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
        border-right: 0px;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 180px;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }

    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
