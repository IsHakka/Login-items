// 文章相關所有請求
import { request } from "../utils/request";

// 獲取頻道列表
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}

// 發布文章

export function createArticleAPI(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

// 獲取文章列表
export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

// 刪除文章 
export function delArticleAPI(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

// 獲取文章詳情
export function getArticleById(id) {
    return request({
        url: `/mp/articles/${id}`
    })
}