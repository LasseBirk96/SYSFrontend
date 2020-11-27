import {
  useHistory,
  
} from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function LogIn({ login, init }) {
  const [loginCredentials, setLoginCredentials] = useState(init);

  const history = useHistory();

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
    loginCredentials.username !== "admin"
      ? history.push("/account")
      : history.push("/statistics");
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };
  return (
    <div>
 <h2 className="registerHeader"> <span className="registerLogo">TravelEat </span>  </h2>
      <form  className="registerContainer" onChange={onChange}>
      <div className="registerHeader">Sign in</div>
      <div>
          <label className="nameField" >
            <input type="text" id="username" className="inputField" placeholder="Username"/>
          </label>
      </div>

      <div>
          <label className="nameField" >
            <input type="password" id="password" className="inputField" placeholder="Password" />
          </label>
      </div>

        <button className="makeButton" onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
