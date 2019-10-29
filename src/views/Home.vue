<template>
  <el-container>
    <el-header>
      <div class="bs_header">
        <el-row>
          <el-col :span="4">
            <el-image :src="logo" class="company-logo"></el-image>
          </el-col>
          <el-col :span="16">
            <el-menu :default-active="defaultActiveIndex" router mode="horizontal" @select="handleSelect">
               <template v-for="(item,index) in meunResources" v-if="item.menuShow">
                 <el-submenu v-if="!item.leaf" :index="index+''">
                  <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                  <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                                :class="$route.path==term.path?'is-active':''">
                  <span slot="title">{{term.name}}</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                              :class="$route.path==item.children[0].path?'is-active':''">
                  <span slot="title">{{item.children[0].name}}</span>
               </el-menu-item>
              </template>
            </el-menu>
          </el-col>
          <el-col :span="4">
            <div class="topbar-account topbar-btn">
              <el-dropdown trigger="click">
                  <span class="el-dropdown-link userinfo-inner">
                  <el-avatar :src="circleUrl"></el-avatar>
                  <i class="iconfont icon-down"></i>个人中心</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="jumpTo('/user-manage/profile')"><span class="span-style">个人信息</span></div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="jumpTo('/user-manage/changepwd')"><span class="span-style">修改密码</span></div>
                  </el-dropdown-item>
                  <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-main>
          <!--中间内容区-->
      <section class="content-container sectionPosition">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-main>
  </el-container>
</template>

<script>
  import {bus} from '../bus.js'
  import API from '../api/api_user';

  export default {
    name: 'home',
    data () {
      return {
        logo: require("../assets/images/logo.png"),
        meunResources: [],
        defaultActiveIndex: '0',
        loading: false,
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    },
    methods: {
      handleSelect(index){
        this.defaultActiveIndex = index;
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
    mounted(){
      this.meunResources = JSON.parse(localStorage.getItem('menu-reasource'));
    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .bs_header {
    margin: 0 auto;
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 980px;
    z-index: 1100;
    height: 60px;
    background-color: #ffffff;
    color: #5d7380!important
}
  .company-logo {
    border-radius: 0;
    height: 50px;
    font-size: 0;
    width: 170px;
    background: #fff;
    position: relative;
    filter: none!important;
  }

  .el-main {
    background-color: #f7f7f7;
    color: #333;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    width: 100%;
    height: 100%;
  }

  .el-menu .el-menu-item, .el-submenu .el-submenu__title {
    font-size: 14px;
    height: 60px;
    line-height: 60px;

   }
   .el-image {
      margin-left: 50px;
      height: 40px;
      margin-top: 10px;
   }

  .el-avatar {
    width: 30px;
    height: 30px;
    margin-top: 20px;
  }

  .el-menu--horizontal>.el-menu-item.is-active{
    height: 50px;
    line-height: 50px; 
  }
  .topbar-btn {
    color: #fff;
  }
  .topbar-account {
    float: right;
    padding-right: 12px;
  }
  .sectionPosition{
    margin: 0 auto;
  }
</style>
