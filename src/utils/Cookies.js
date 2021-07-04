export const getCookie = (name) => {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return undefined;
};

export const setCookie = (name, value, expiredInSecs) => {
  const expiredTime = new Date(Date.now() + expiredInSecs * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value};expires=${expiredTime};path=/`;
};

export const deleteCookie = (cname) => {
  document.cookie = cname + '=; Expires=Thu, 01 Jan 1970 00:00:01 UTC; Path=/; ';
};
