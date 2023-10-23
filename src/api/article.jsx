// 文章相關所有請求
import { request } from "../utils/request";

// 獲取頻道列表
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}
