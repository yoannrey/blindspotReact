export const setLocalStorage = (credentials: string[]) => {
    localStorage.clear();
    localStorage.setItem('accessToken', credentials[0]);
    localStorage.setItem('tokenType', credentials[1]);
    localStorage.setItem('expiresIn', credentials[2]);
};
