export const ACCESS_TOKEN_PATH = 'accessToken';
export const setLocalStorage = (credentials: string[]) => {
    localStorage.clear();
    console.log(credentials[0]);
    localStorage.setItem(ACCESS_TOKEN_PATH, credentials[0]);
    localStorage.setItem('tokenType', credentials[1]);
    localStorage.setItem('expiresIn', credentials[2]);
};
