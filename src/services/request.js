import WJHRequest from './requesta'
import { BASE_URL, TIME_OUT } from "./config"

const WYRequest = new WJHRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        request: (config) => {
            // const token = Localcache.getCache('token')
            const token = "token获取"
            if (token) {
            //   config.headers.Authorization = `Bearer ${token}`
                    console.log(token,"tokenaaa")
            }
            console.log('请求成功拦截')
            return config
          },
          requestCatch: (err) => {
            console.log('请求失败拦截')
            return err
          },
          response: (res) => {
            console.log('响应成功拦截')
            return res
          },
          responseCatch: (res) => {
            alert('URL请求失败')
            console.log('响应失败拦截')
            return res
          }
        }
})

export default WYRequest