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
      },
      {
        icon: 'user', name: 'p2p', label: '分布式节点',
        children: [
          {
            icon: 'user', name: 'dht', label: '路由', path: '/p2p/dht'
          },
          { icon: 'role', name: 'p2p', label: 'p2p', path: '/p2p/p2p' },
          { icon: 'role', name: 'webrtc', label: 'webrtc', path: '/p2p/webrtc' },
          { icon: 'role', name: 'sfu', label: 'sfu', path: '/p2p/sfu' },
          { icon: 'role', name: 'websocket', label: 'websocket', path: '/p2p/websocket' }
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
routers.set('p2p', () => import('@/components/p2p/p2p'))
routers.set('webrtc', () => import('@/components/p2p/webrtc'))
routers.set('websocket', () => import('@/components/p2p/websocket'))
routers.set('sfu', () => import('@/components/p2p/sfu'))
routers.set('dht', () => import('@/components/p2p/dht'))


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
