import { httpClientPool } from 'libcolla'

/**
 * 登陆验证的服务请求
 */
let auth = {}

auth.login = function (params) {
  // axios.defaults.withCredentials = true
  return httpClientPool.httpClient.send('/user/Login', params, {
    loading: "hourglass"
  })
}

auth.logout = function () {
  return httpClientPool({
    url: '/user/Logout',
    method: 'post',
    loading: "hourglass"
  })
}

export default auth
