import { routerMenu } from 'libcolla'
const loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('@/pages/login')
}

const rootRouter = {
  path: '/',
  name: 'login',
  component: () => import('@/pages/login')
}

const page403 = {
  path: '/403',
  name: '403',
  component: () => import('@/pages/403')
}

// 预定义的菜单，如果增加一项功能，可以对于位置增加一项菜单项
const menu = [
  {
    icon: 'index',
    name: 'index',
    label: '工作台',
    path: '/index'
  },
  {
    icon: 'setting',
    name: 'admin',
    label: '系统管理',
    children: [
      {
        icon: 'base', name: 'baseCode', label: '基本编码',
        children: [
          {
            icon: 'edit', name: 'basecode', label: '基本编码编辑', path: '/basecode/basecode'
          },
          { icon: 'cache', name: 'cache', label: '缓存' }
        ]
      },
      {
        icon: 'user', name: 'rbac', label: '权限管理',
        children: [
          {
            icon: 'user', name: 'user', label: '用户', path: '/rbac/user'
          },
          { icon: 'role', name: 'role', label: '角色' },
          { icon: 'group', name: 'permission', label: '权限' }
        ]
      }
    ]
  },
  {
    icon: 'stock',
    name: 'stock',
    label: '股票管理',
    children: [
      {
        icon: 'share', name: 'share', label: '股票代码', path: '/stock/share'
      },
      {
        icon: 'subscription', name: 'subscription', label: '股票订阅', path: '/stock/subscription'
      },
      {
        icon: 'dayline', name: 'dayline', label: '日线', path: '/stock/dayline'
      },
      {
        icon: 'wmqyline', name: 'wmqyline', label: '季度线', path: '/stock/wmqyline'
      },
      {
        icon: 'performance', name: 'performance', label: '业绩', path: '/stock/performance'
      },
      {
        icon: 'express', name: 'express', label: '业绩快报', path: '/stock/express'
      },
      {
        icon: 'forecast', name: 'forecast', label: '业绩预测', path: '/stock/forecast'
      },
      {
        icon: 'qperformance', name: 'qperformance', label: '股票业绩价格', path: '/stock/qperformance'
      }
    ]
  }
]
routerMenu.menu = menu

// 在workspace路由下增加一项子路由，如果有一项新的页面，可以在此增加
let routers = new Map
routers.set('user', () => import('@/components/rbac/user'))
routers.set('basecode', () => import('@/components/basecode/basecode'))
routers.set('share', () => import('@/components/stock/share'))
routers.set('subscription', () => import('@/components/stock/subscription'))
routers.set('dayline', () => import('@/components/stock/dayline'))
routers.set('wmqyline', () => import('@/components/stock/wmqyline'))
routers.set('performance', () => import('@/components/stock/performance'))
routers.set('express', () => import('@/components/stock/express'))
routers.set('forecast', () => import('@/components/stock/forecast'))
routers.set('qperformance', () => import('@/components/stock/qperformance'))

export const workspaceRouter = {
  path: '/workspace',
  name: 'workspace',
  component: () => import('@/pages/workspace'),
  children: routerMenu.getRouter(routers)
}
// 所有上面定义的路由都要写在下面的routers里
export const routes = [
  loginRouter,
  page403,
  rootRouter,
  workspaceRouter
]
