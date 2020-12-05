import React, { useState, useEffect } from "react";

import links from "./settings";

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
import Users from "./components/Users";
import Restaurant from "./components/Restaurant";
import Trip from "./components/Trip";

function App() {
  const init = { username: "", password: "" };
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [admin, setAdmin] = useState(false);
  const [flights, setFLights] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [airports, setAirports] = useState([]);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setAdmin(false);
    setActiveUser("");
  };

  function addFlightToTrip(flight) {
    setFLights([...flights, flight]);
  }

  useEffect(() => {
    let mounted = true;

    facade
      .fetchData(links.airports)
      .then((data) => {
        for (const airp of data) {
          airports.push(airp);
        }

        console.log("airports");
        console.log(airports);
      })
      .then(() => {
        if (mounted) {
          setLoading(false);
          
        }
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.message));
        } else {
          console.log("Network error! Could not load airports");
        }
      });
    return function cleanup() {
      mounted = false;
    };
  }, []);
  function whosLoggedIn() {
    const activNow = facade.isLoggedIn();
    if (activNow != false) {
      setLoggedIn(true);
      setActiveUser(activNow);
    } else {
      console.log("ActivNOW:");
    }
    console.log(activNow);
  }
  useEffect(whosLoggedIn, []);

  console.log("Admin status: " + admin + "  loggedIn status: " + loggedIn);
  return (
    <Router>
      <div className="App">
        <Header
          loggedIn={loggedIn}
          admin={admin}
          logout={logout}
          rquantity={restaurants.length}
          fquantity={flights.length}
          activUser={activeUser}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/flights">
            <Flights addFlight={addFlightToTrip} />
          </Route>
          <Route exact path="/trip">
            <Trip
              flights={flights}
              restaurants={restaurants}
              airports={airports}
              setRestaurants={setRestaurants}
              setFlights={setFLights}
              loggedIn={loggedIn}
              activeUser={activeUser}
            />
          </Route>
          <Route exact path="/restaurant">
            <Restaurant />
          </Route>
          {!loggedIn ? (
            <Route exact path="/register">
              <Register
                facade={facade}
                init={init}
                setLoggedIn={setLoggedIn}
                setAdmin={setAdmin}
                activUser={activeUser}
              />
            </Route>
          ) : (
            ""
          )}
          {!loggedIn ? (
            <Route exact path="/login">
              <LogIn
                facade={facade}
                init={init}
                setActivUser={setActiveUser}
                setAdmin={setAdmin}
              />
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
            <Route exact path="/users">
              <Users />
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
