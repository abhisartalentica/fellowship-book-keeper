import {checkSessionIsActive} from "./util"; 
const apiCall = (url = "", data = {}, method) =>
  fetch(url, {
    method,
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data)
  }).then(response => response.json());

const get = url => fetch(url);
const post = (...args) =>
  apiCall(...args, "POST");
const put = (...args) =>
  apiCall(...args, "PUT");
export default {
  get: function(...args) {
    if (checkSessionIsActive()) {
      return get(...args);
    }
  },
  post: function(url,data,flag = false) {
    if (checkSessionIsActive() || flag) {
      return post(url,data);
    }
  },
  put: function(...args) {
    if (checkSessionIsActive()) {
      return put(...args);
    }
  }
};
