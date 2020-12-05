import links from "./settings";

const URL = links.server;
const otherURL = links.otherServer;
const TOKEN_EXPIRE_TIME = 1000 * 60 * 30;

function apiFacade() {
  //............registerUser..............\\
  const registerUser = (user) => {
    const options = makeOptions("POST", false, {
      ...user,
    });
    return fetch(URL + "/api/user", options).then(handleHttpErrors);
  };
  //.........................\\
  const setToken = (token) => {
    setWithExpiry("jwtToken", token, TOKEN_EXPIRE_TIME);
    //localStorage.setItem("jwtToken", token);
  };
  const setUser = (user) => {
    setWithExpiry("user", user, TOKEN_EXPIRE_TIME);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const isLoggedIn = () => {
    if (getWithExpiry("user") != null || getWithExpiry("jwtToken") != null) {
      return getWithExpiry("user");
    } else {
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  };

  const login = (user, password) => {
    console.log(URL);
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setUser(res.username);
        console.log(res);
      });
  };

  const fetchData = (url2) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + url2, options).then(handleHttpErrors);
  };

  const fetchDummyData = () => {
    const options = makeOptions("GET"); //True add's the token
    return fetch(otherURL, options).then(handleHttpErrors);
  };

  const findFlights = (flight) => {
    const options = makeOptions("POST", false, flight);
    return fetch(URL + links.flights, options).then(handleHttpErrors);
  };
  const saveTrip = (trip) => {
    const options = makeOptions("POST", true, trip);
    return fetch(URL + links.saveTrip, options).then(handleHttpErrors);
  };

  //https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
  function setWithExpiry(key, value, ttl) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  //https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  function getActivUser() {
    return getWithExpiry("user");
  }
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && isLoggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    isLoggedIn,
    login,
    logout,
    fetchData,
    registerUser,
    fetchDummyData,
    findFlights,
    saveTrip,
    getActivUser,
  };
}
const facade = apiFacade();

function handleHttpErrors(res) {
  if (!res.ok) {
    console.log("res not ok");
    return Promise.reject({ status: res.status, fullError: res.json() });
  }

  return res.json();
}
export default facade;
