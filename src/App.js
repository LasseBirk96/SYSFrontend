import React, { useState, useEffect } from "react";
import "./Css-files/Register.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import facade from "./apiFacade";
import LogIn from "./components/LogIn";
import Flights from "./components/Flights";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import Account from "./components/Account";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Statistics from "./components/Statistics";
import Restaurant from "./components/Restaurant";

function App() {
  const init = { username: "", password: "" };
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [admin, setAdmin] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setAdmin(false);
    setActiveUser("anonym");
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => {
        user !== "admin" ? setLoggedIn(true) : setAdmin(true);
        setActiveUser(user);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrMsg(e.message));
        } else {
          setErrMsg("Network error has occurred: could not log in");
          console.log("Network error! Could not log in");
        }
      });
  };

  console.log("Admin status: " + admin + "  loggedIn status: " + loggedIn);
  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} admin={admin} logout={logout} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/flight">
            <Flights />
          </Route>
          <Route exact path="/restaurant">
            <Restaurant />
          </Route>
          {!loggedIn ? (
            <Route exact path="/register">
              <Register facade={facade} init={init} />
            </Route>
          ) : (
            ""
          )}
          {!loggedIn ? (
            <Route exact path="/login">
              <LogIn login={login} init={init} />
            </Route>
          ) : (
            ""
          )}
          <Route exact path="/home">
            <Home />
          </Route>
          {loggedIn ? (
            <Route exact path="/account">
              <Account />
            </Route>
          ) : (
            ""
          )}
          {admin ? (
            <Route exact path="/orders">
              <Orders />
            </Route>
          ) : (
            ""
          )}
          {admin ? (
            <Route exact path="/users">
              <Users />
            </Route>
          ) : (
            ""
          )}
          {admin ? (
            <Route exact path="/statistics">
              <Statistics />
            </Route>
          ) : (
            ""
          )}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
