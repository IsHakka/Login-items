import React from 'react';
import { getToken } from '../utils/tokem';
import { Navigate } from 'react-router-dom';
// 有token正常跳轉，無token去登入
export const AuthRoute = ({children}) => {
    const token = getToken();
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'login'} replace></Navigate>
    }
};

