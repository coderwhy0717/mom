import axios from 'axios'
// import { AxiosInstance } from 'axios'
// import  { JHRequestConfig, JHRequestInterceptors } from './type'
// loding 加载导入element-ul库
// import { ElLoading } from 'element-plus'
// import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

//创建 类 封装base-url的http://123.207.32.32:8000/
class WJHRequest {
  instance // 存储axios实例 http://123.207.32.32:8000/
  interceptors //type.ts 里的自定义拦截器类型JHRequestInterceptors
  // loading?: ILoadingInstance
  showloading

  constructor(config) {
    //构造器必须传instance  type.ts里的自定义拦截器与继承的AxiosRequestConfig类型
    // console.log(config,'config');
    this.instance = axios.create(config) // 根据传进来的BASE_URL 创建axios实例 赋值给 instance
    this.interceptors = config.interceptors //传进来的参数里取出 interceptors 存储interceptors里
    this.showloading = config.showloading ?? true // 默认为true 就不用在index.ts里赋值
    //3.判断service/index.ts 里有没有 请求时拦截器 有传入interceptors的话就有拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.request,
      this.interceptors?.requestCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.response,
      this.interceptors?.responseCatch
    )

    //2. 全局默认 拦截器  直接在 interceptors  use里 直接传入拦截器函数 直接拦截 看use
    // 全局默认请求
    this.instance.interceptors.request.use(
      (config) => {
        // loading 加载
        if (this.showloading) {
          // this.loading = ElLoading.service({
          //   lock: true,
          //   text: '正在使吃奶的劲加载中...',
          //   background: 'rgba(0,0,0,0.5)'
          // })
        }
        console.log('全局默认请求：成功拦截')
        return config
      },
      (err) => {
        console.log('全局默认请求：失败拦截')
        return err
      }
    )
    // 全局默认响应
    this.instance.interceptors.response.use(
      (res) => {
        console.log(res,'全局默认响应：响应成功拦截')
        // 将loading移除
        // this.loading?.close()

        const data = res.data
        
        if(data.code === -1) {
          alert(`请求失败~，错误信息\n账号或密码错误！`)
          console.log("请求失败~，错误信息")
        }
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else {        
          return data.data  
        }
      },
      (err) => {
        // 例子
        if (err.response.status === 404) {
          console.log('404错误~')
        }
        setTimeout(() => {
          // this.loading?.close()
          alert('URL请求失败')
        }, 10000)
        console.log('全局默认响应：响应失败拦截')

        return err
      }
    )
  }
  //封装 BASE_URL 后缀 实现不同网络请求数据 home/multidata
  // 1. 单独每一次网络请求拦截 在JHRequestConfig类型里去判断是否有拦截器 再去转化config
  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.request) {
        //在 JHRequestConfig 类型里去 判断是否有写传入拦截器信息
        config = config.interceptors.request(config) //再去转化 config
      }
      if (config.showloading === false) {
        this.showloading = config.showloading
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.response) {
            //在 JHRequestConfig 类型里去 判断是否有写传入拦截器信息
            res = config.interceptors.response(res) //再去转化 config
          }
          // console.log(res, 'resss')
          // 3.将结果resolve返回出去
          resolve(res)
          // 将showloading设置回来不影响下一个请求
          this.showloading = true
        })
        .catch((err) => {
          // 将showloading设置回来不影响下一个请求
          this.showloading = true
          // console.log(err);
          reject(err)
          return err
        })
    })
  }
  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default WJHRequest
