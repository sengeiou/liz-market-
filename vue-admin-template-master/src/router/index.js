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
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '侧边栏',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  //售后管理
  {
    path: '/sales',
    component: Layout,
    redirect: '/sales/list',
    name: '售后管理',
    meta: { title: '售后管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '退货列表',
        component: () => import('@/views/market/sales/list'),
        meta: { title: '退货列表', icon: 'table' }
      },
      {
        path: 'info/:salesId',
        name: '申请详情',
        component: () => import('@/views/market/sales/info'),
        meta: { title: '申请详情', icon: 'tree' }
      },
    ]
  },
  //物流管理
  {
    path: '/logistics',
    component: Layout,
    redirect: '/logistics/list',
    name: '物流管理',
    meta: { title: '物流管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '物流列表',
        component: () => import('@/views/market/logistics/list'),
        meta: { title: '物流列表', icon: 'table' }
      },
      {
        path: 'info/:orderNo',
        name: '此单详情',
        component: () => import('@/views/market/logistics/info'),
        meta: { title: '此单详情', icon: 'tree' }
      },
    ]
  },
  // 首页轮播图路由
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: '轮播图管理',
    meta: { title: '轮播图管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '轮播图列表',
        component: () => import('@/views/front/banner/list'),
        meta: { title: '轮播图列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加轮播图',
        component: () => import('@/views/front/banner/save'),
        meta: { title: '添加轮播图', icon: 'tree' }
      },
    ]
  },
  // 品牌路由
  {
    path: '/brand',
    component: Layout,
    redirect: '/brand/list',
    name: '品牌管理',
    meta: { title: '品牌管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '品牌管理列表',
        component: () => import('@/views/market/brand/list'),
        meta: { title: '品牌管理列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加品牌',
        component: () => import('@/views/market/brand/save'),
        meta: { title: '添加品牌', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'BrandEdit',
        component: () => import('@/views/market/brand/save'),
        meta: { title: '编辑品牌', noCache: true},
        hidden: true
      }
    ]
  },
  // 商品分类路由
  {
    path: '/categories',
    component: Layout,
    redirect: '/categories/list',
    name: '商品分类管理',
    meta: { title: '商品分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '商品分类列表',
        component: () => import('@/views/market/categories/list'),
        meta: { title: '商品分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加商品分类',
        component: () => import('@/views/market/categories/save'),
        meta: { title: '添加商品分类', icon: 'tree' }
      },
    ]
  },
  // 商品路由
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '商品列表',
        component: () => import('@/views/market/goods/list.vue'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加商品',
        component: () => import('@/views/market/goods/info'),
        meta: { title: '添加商品', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/market/goods/info'),
        meta: { title: '编辑商品基本信息', noCache: true},
        hidden: true
      },
      {
        path: 'incr/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/market/goods/incr'),
        meta: { title: '编辑课商品进阶信息', noCache: true},
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/market/goods/publish'),
        meta: { title: '发布商品', noCache: true},
        hidden: true
      }
    ]
  },
  {
    path: '/sta',
    component: Layout,
    redirect: '/sta/table',
    name: '统计分析',
    meta: { title: '统计分析', icon: 'example' },
    children: [
      {
        path: 'create',
        name: '生成数据',
        component: () => import('@/views/sta/create'),
        meta: { title: '生成数据', icon: 'table' }
      },
      {
        path: 'show',
        name: '图表显示',
        component: () => import('@/views/sta/show'),
        meta: { title: '图表显示', icon: 'tree' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
