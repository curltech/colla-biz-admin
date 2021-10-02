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
  }
]
routerMenu.menu = menu

// 在workspace路由下增加一项子路由，如果有一项新的页面，可以在此增加
let routers = new Map
routers.set('user', () => import('@/components/rbac/user'))
routers.set('basecode', () => import('@/components/basecode/basecode'))


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
