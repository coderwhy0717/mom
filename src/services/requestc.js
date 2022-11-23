// import axios from "axios";
// import { BASE_URL, TIME_OUT } from "./config";

// const instance = axios.create({
//     baseURL: BASE_URL,
//     timeout: TIME_OUT
// })


// instance.interceptors.request.use(
//     config => {
//       const token = '获取token'
//       if(token) {
//         // config.headers.Authrization = `Bearer ${token}`
//         console.log(config.headers.Authrization)
//       }
//         console.log("全局请求成功")
//         console.log(config.params)
//         // if(config.url === '/banner') return config
//         // if(config.url === '/toplist') return config
//         // if(config.url === '/song/detail') return config
//         // 请求如果config.url有params就添加cookie
//         // if(config.params) {
//         //   config.params.cookie = 'MUSIC_A=8aae43f148f990410b9a2af38324af24e87ab9227c9265627ddd10145db744295fcd8701dc45b1ab8985e142f491516295dd965bae848761274a577a62b0fdc54a50284d1e434dcc04ca6d1a52333c9a'
//         // }
//         return config
//     },
//     err => {
//         console.log("全局请求失败")
//         return err
//     }
// )

// instance.interceptors.response.use(
//     res => {
//         console.log("全局响应成功")
//         return res.data
//     },
//     err => {
//         console.log("全局响应失败")
//         if (err && err.response) {
//             switch (err.response.status) {
//               case 400:
//                 console.log("请求错误");
//                 break;
//               case 401:
//                 console.log("未授权访问");
//                 break;
//               default:
//                 console.log("其他错误信息");
//             }
//           }
//         return err
//     }
// )

 

// export default instance