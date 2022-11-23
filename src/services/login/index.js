import WYRequest from "../request"

export function getPlaySongDetail(list) {
    return WYRequest.post({
        url:'/Login',
        data: list
    })
}
export function getDetail() {
    return WYRequest.get({
        url:'/items/QueryIMG?Name=1',
    })
}