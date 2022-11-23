
let BASE_URL = ''
const TIME_OUT = 10000
const NODE_ENV = process.env.NODE_ENV
    
// 开发环境
if(NODE_ENV === 'development') {
    console.log(NODE_ENV,"first")
    BASE_URL = '/api1'
}else if(NODE_ENV === 'production') {//生产环境
    BASE_URL = '/api'
}

export { BASE_URL,TIME_OUT }
 