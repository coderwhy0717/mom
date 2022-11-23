import request from './request'
import WYRequest from './request'
// export function getPlaySongDetail(ids = 1954420092) {
//     return request({
//         url:'/song/detail',
//         params: {
//             ids
//         }
//     })
// }
// export function getPlaySongDetail(name,password) {
//     return request({
//         url:'/Add',
//         method:"POST",
//         params: {
//             name,
//             password
//         }
//     })
// }
export function getDetail() {
    return request({
        url:'/items/QueryIMG?Name=1',
    })
}

