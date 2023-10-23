// 封裝token方法 存、取、刪

const TOKENKEY = 'token_key'

export function setToken(token) {
    localStorage.setItem(TOKENKEY, token)
}

export function getToken() {
    return localStorage.getItem(TOKENKEY)
}

export function removeToken() {
    return localStorage.removeItem(TOKENKEY)
}
