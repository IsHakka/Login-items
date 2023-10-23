// 用戶相關狀態管理
import { createSlice } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { setToken as _setToken, getToken, removeToken } from '../../utils/token';

export const userStore = createSlice({
    name: 'user',
    // 數據狀態
    initialState: {
        token: getToken() || '',
        userInfo: {

        }
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            // 存儲本地
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
});

// 登入:異步獲取token
export const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 發送異步請求
        const res = await request.post('/authorizations', loginForm);
        // 提交同步action進行token的存入
        dispatch(setToken(res.data.token));
    }
}
// 獲取個人用戶訊息異步方法
export const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}

export const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

