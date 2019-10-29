import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'
import ProjectList from '@/views/project-info/project-list.vue'
import ProjectDetail from '@/views/project-info/project-detail.vue'
import PermissionManagement from '@/views/system-management/permission-management.vue'
import RoleConfigure from '@/views/role-configure/role-configure.vue'
import OpreatorLog from '@/views/system-management/opreator-log.vue'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      id: 1,
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/dashboard',
      leaf: true,
      menuShow: true,
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页'}
      ]
    },
    {
      id: 2,
      path: '/',
      component: Home,
      name: '项目信息',
      leaf: false,
      menuShow: false,
      children: [
        {id: "5", path: '/project-info/project-list.vue', component: ProjectList, name: '项目信息', menuShow: false},
        {id: "6", path: '/project-info/project-detail.vue/:projectId', component: ProjectDetail, name: '项目详细信息', menuShow: false},
      ]
    },
    {
      id: 3,
      path: '/',
      component: Home,
      name: '项目度量指标',
      menuShow: false,
      children: [
        { path: '/dashboard', component: Dashboard, name: '首页'}
      ]
    },
    {
      id: 4,
      path: '/',
      component: Home,
      name: '系统管理',
      menuShow: false,
      children: [
        {id: "7", path: '/system-management/permission-management.vue', component: PermissionManagement, name: '权限管理', menuShow: false},
        {id: "8", path: '/role-configure/role-configure.vue', component: RoleConfigure, name: '角色管理', menuShow: false},
        {id: "9", path: '/system-management/opreator-log.vue', component: OpreatorLog, name: '操作日志', menuShow: false},
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    window.localStorage.removeItem('menu-reasource')

    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
