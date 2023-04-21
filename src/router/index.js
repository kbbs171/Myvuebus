import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首页',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/layout'),
    redirect:'/home',
    children:[
      {
        path: '/home',
        name: '首页',
        component: () => import('../views/home/index')
      },
      {
        path: '/notification',
        name: '公告管理',
        component: () => import('../views/notification/index')
      },
      {
        path: '/driver',
        name: '司机管理',
        component: () => import('../views/driver/index')
      },
      {
        path: '/bus',
        name: '公交车管理',
        component: () => import('../views/bus/index')
      },
      {
        path: '/route',
        name: '路线管理',
        component: () => import('../views/route/index')
      },
      {
        path: '/schedule',
        name: '公交调度',
        component: () => import('../views/schedule/index')
      },
      {
        path: '/history',
        name: '历史记录',
        component: () => import('../views/history/index')
      },


      {
        path: '/chat',
        name: '交流',
        component: () => import('../views/chat/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
