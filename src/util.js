export const checkSessionIsActive = name => {
  const isCookieAvailable = document.cookie
    .split(";")
    .some(cookie => cookie.includes("accessToken"));
  if (!isCookieAvailable && window.location.pathname !== "/") {
    window.location.replace(window.location.origin);
  }
  return isCookieAvailable;
};

export const getCookie = name =>
  document.cookie &&
  decodeURIComponent(
    document.cookie
      .split(";")
      .find(cookie => name === cookie.split("=")[0].trim())
      .split("=")[1]
  );

export const removeCookies = () => {
  const cookies = document.cookie.split(";");
  cookies.forEach(cookie => {
    const key = cookie.split("=");
    document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
  });
};
