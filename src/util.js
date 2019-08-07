export const checkSessionIsActive = () => {
  const isCookieAvailable = document.cookie
    .split(";")
    .find(cookie => cookie.includes("accessToken"));
  console.log(
    "sign active",
    !document.cookie.split(";").find(cookie => cookie.includes("accessToken")),
    window.location.pathname !== "/"
  );
  if (!isCookieAvailable && window.location.pathname !== "/") {
    window.location.replace(window.location.origin);
  }
  return isCookieAvailable;
};

export const getCookie = name => {
  const cookies = document.cookie.split(";");
  const cookieName = name + "=";
  return cookies.find(cookie => cookie.includes(cookieName)).trim().split("=")[1];
};

export const removeCookies = () => {
  const cookies = document.cookie.split(";");
  cookies.forEach(cookie => {
    const key = cookie.split("=");
    document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
  });
};
