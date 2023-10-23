// 封裝處理
import axios from 'axios';
import { getToken, removeToken } from './token';
import router from './../router/index'
// 根域名配置
// 超時時間
// 添加請求攔截器 響應攔截器

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    // 超時時間
    timeout: 5000
})

// 添加請求攔截器
// 在請求發送前做配置[參數處理]
request.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加響應攔截器
// 在響應返回到客戶端之前做攔截，重點處理返回的數據
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    
    console.dir(error);
    if(error.response.status === 401){
        removeToken()
        router.navigate('/login')
        // 強制刷新
        window.location.reload()
    }
    return Promise.reject(error)
})

export { request };