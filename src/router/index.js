import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
            import('@/views/404'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'dashboard',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () =>
                import('@/views/dashboard/index')
  }]
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  //   {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   meta: { roles: ['admin'] }, // you can set roles in root nav
  //   children: [{
  //     path: 'index',
  //     component: () =>
  //                 import('@/views/permission/index'),
  //     name: 'permission',
  //     meta: {
  //       title: 'permission',
  //       icon: 'form',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },
  {
    path: '/editor',
    component: Layout,
    redirect: '/editor/index',
    meta: { roles: ['editor'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: () =>
                import('@/views/editor/index'),
      name: 'editor',
      meta: {
        title: 'editor',
        icon: 'form',
        roles: ['editor'] // or you can only set roles in sub nav
      }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'form',
      component: () =>
                import('@/views/form/index'),
      meta: { title: 'form', icon: 'form' }
    }]
  },

  {
    path: '/home',
    component: Layout,
    children: [{
      path: 'index',
      name: 'home',
      component: () =>
                import('@/views/home/index'),
      meta: { title: 'home', icon: 'form' }
    }]
  },
  {
    path: '/stores',
    component: Layout,
    children: [{
      path: 'index',
      name: 'stores',
      component: () =>
                import('@/views/stores'),
      meta: { title: 'stores', icon: 'form' }
    }]
  },
  {
    path: '/shop',
    component: Layout,
    name: 'shop',
    hidden: true,
    children: [{
      path: ':id',
      component: () =>
                import('@/views/shop'),
      hidden: true
    }]
  },
  {
    path: '/pages',
    component: Layout,
    children: [{
      path: 'index',
      name: 'pages',
      component: () =>
                import('@/views/pages/index'),
      meta: { title: 'pages', icon: 'form' }
    }]
  },
  {
    path: '/fundTransferRequest',
    component: Layout,
    children: [{
      path: 'index',
      name: 'fundTransferRequest',
      component: () =>
                import('@/views/orders/index'),
      meta: { title: 'fundTransferRequest', icon: 'form' }
    }]
  },
  {
    path: '/orders',
    component: Layout,
    children: [{
      path: 'index',
      name: 'orders',
      component: () =>
                import('@/views/orders/index'),
      meta: { title: 'orders', icon: 'form' }
    }]
  },
  {
    path: '/statistics',
    component: Layout,
    children: [{
      path: 'index',
      name: 'statistics',
      component: () =>
                import('@/views/statistics/index'),
      meta: { title: 'statistics', icon: 'form' }
    }]
  },
  {
    path: '/users',
    component: Layout,
    children: [{
      path: 'index',
      name: 'users',
      component: () =>
                import('@/views/users/index'),
      meta: { title: 'users', icon: 'form' }
    }]
  },
  {
    path: '/products',
    component: Layout,
    children: [{
      path: 'index',
      name: 'products',
      component: () =>
                import('@/views/products/index'),
      meta: { title: 'products', icon: 'form' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
