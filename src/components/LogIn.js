import "../Css-files/RegisterAndLogin.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function LogIn({
  facade,
  init,
  setActiveUser,
  setAdmin,
  setLoggedIn,
}) {
  const [loginCredentials, setLoginCredentials] = useState(init);

  const history = useHistory();
  const [msg, setMsg] = useState("");
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const loader = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader"></div>
    </div>
  );

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const startLogin = (evt) => {
    evt.preventDefault();

    if (loginCredentials.username.length < 1) {
      setMsg("username is missng");
    } else if (loginCredentials.password.length < 1) {
      setMsg("password is missing");
    } else {
      setLoading(true);
      setStart(true);
    }
  };

  /*
  p(loginCredentials.username, loginCredentials.password);
    loginCredentials.username !== "admin"
      ? history.push("/account")
      : history.push("/users");
  */

  useEffect(() => {
    let mounted = true;
    if (start) {
      facade
        .login(loginCredentials.username, loginCredentials.password)
        /*  .then((res) => {
          res.username !== "admin" ? setLoggedIn(true) : setAdmin(true);
          setActiveUser(res.username);
        })*/
        .then(() => {
          if (mounted) {
            setLoading(false);
            setMsg("Succed!");
            /*   let u = facade.getActivUser;
            u !== "admin" ? setLoggedIn(true) : setAdmin(true);
            setActiveUser(u);*/
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setMsg(e.message));
          } else {
            setMsg("Network error has occurred: could not log in");
            console.log("Network error! Could not log in");
          }
        });
      return function cleanup() {
        mounted = false;
        setStart(false);
      };
    }
  }, [start]);
  return (
    <div>
      <h2 className="registerHeader">
        {" "}
        <span className="registerLogo">TravelEat </span>{" "}
      </h2>
      <form className="registerContainer" onChange={onChange}>
        <div className="registerHeader">Sign in</div>
        <div>
          <label className="nameField">
            <input
              type="text"
              id="username"
              className="inputField"
              placeholder="Username"
            />
          </label>
        </div>
        <div>
          <label className="nameField">
            <input
              type="password"
              id="password"
              className="inputField"
              placeholder="Password"
            />
          </label>
        </div>
        <div style={{ textAlign: "center" }}>
          <label className="nameField">{msg}</label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>{" "}
        {loading ? (
          loader
        ) : (
          <button className="makeButton" onClick={startLogin}>
            Login
          </button>
        )}
      </form>
    </div>
  );
}
