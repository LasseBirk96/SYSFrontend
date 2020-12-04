import "../Css-files/RegisterAndLogin.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function UnknownUser() {
  const history = useHistory();

  return (
    <div className="unknownUserContainer">
      <div className="registerHeader">You need to log in to save your trip</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <button
          className="orangeButton"
          onClick={(e) => {
            e.preventDefault();
            history.push("/login");
          }}
        >
          Login
        </button>
      </div>
      <div className="registerHeader">Not a TravelEater yet?</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="orangeButton"
          onClick={(e) => {
            e.preventDefault();
            history.push("/register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
