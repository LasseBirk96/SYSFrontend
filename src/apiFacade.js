import links from "./settings";

const URL = links.server;
const otherURL = links.otherServer;

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
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
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
  const saveTrip=(trip)=>{
    const options = makeOptions("POST",true,trip);
    return fetch(URL+links.saveTrip,options).then(handleHttpErrors)
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
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
    loggedIn,
    login,
    logout,
    fetchData,
    registerUser,
    fetchDummyData,
    findFlights,
    saveTrip
  };
}
const facade = apiFacade();

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }

  return res.json();
}
export default facade;
