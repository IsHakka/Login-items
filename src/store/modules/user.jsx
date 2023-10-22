// 用戶相關狀態管理
import { createSlice } from '@reduxjs/toolkit';
import { request } from '../../utils/request';

export const userStore = createSlice({
    name: 'user',
    // 數據狀態
    initialState: {
        token: ''
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        }
    }
});

// 異步獲取token
export const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 發送異步請求
        const res = await request.post('/authorizations', loginForm);
        // 提交同步action進行token的存入
        dispatch(setToken(res.data.token));
    }
}

export const { setToken } = userStore.actions;

