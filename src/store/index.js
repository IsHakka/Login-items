// 組合子模塊，導出store實例
import { configureStore } from "@reduxjs/toolkit";
import { userStore } from './modules/user.jsx'

export const store = configureStore({
    reducer: {
        user: userStore.reducer
    }
});
