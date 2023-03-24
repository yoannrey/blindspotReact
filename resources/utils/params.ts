export const getParamsFromUrl = (hash: string) => {
    const stringWithoutHashtag = hash.substring(1);
    const paramsInUrl = stringWithoutHashtag.split('&');
    return paramsInUrl.map((p) => p.split('=')[1]);
};
