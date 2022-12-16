export const setLocalStorage = (credentials: string[]) => {
    localStorage.clear();
    localStorage.setItem('accessToken', credentials[0]);
    localStorage.setItem('tokenType', credentials[1]);
    localStorage.setItem('expiresIn', credentials[2]);
};

export const getParamsFromUrl = (hash: string) => {
    const stringWithoutHashtag = hash.substring(1);
    const paramsInUrl = stringWithoutHashtag.split('&');
    return paramsInUrl.map((p) => p.split('=')[1]);
};
