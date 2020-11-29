import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register({ facade, init }) {
  const [newUser, setNewUser] = useState(init);
  const [status, setStatus] = useState("");
  const [nickName, setNickName] = useState("Stranger");
  const [pass2, setPass2] = useState("");
  const history = useHistory();
  const [monted, setMonted] = useState(false);

  function onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.id;

    setStatus("");

    setNewUser({
      ...newUser,
      [name]: value,
    });
  }
  function onChange1(e) {
    setPass2(e.target.value);
    setStatus("");
  }

  function onSubmit(e) {
    e.preventDefault();
    if (
      pass2.length <= 3 ||
      newUser.password.length <= 3 ||
      newUser.username.length <= 3
    ) {
      setStatus("nickname or password to short, try again");
    } else {
      pass2 === newUser.password
        ? facade
            .registerUser(newUser)
            .then((data) => {
              setStatus(data.msg);
              setNickName(data.username);
              setMonted(true);
            })

            .catch((err) => {
              if (err.status) {
                err.fullError.then((e) => setStatus(e.message));
              } else {
                setStatus("Network error has occurred: could not log in");
                console.log("Network error! Could not register");
              }
            })
        : setStatus("passwords did not match");
    }
    if (monted) {
      history.push("/login");
    }
  }

  return (
    <div>
      <div>
        <h2 className="registerHeader">
          {" "}
          <span className="registerLogo">TravelEat </span>{" "}
        </h2>
      </div>
      <form className="registerContainer" onSubmit={onSubmit}>
        <div className="registerHeader"> Sign up with a username</div>
        <div>
          <label className="nameField">
            <input
              type="text"
              id="username"
              className="inputField"
              placeholder="Username"
              onChange={onChange}
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
              onChange={onChange}
            />
          </label>
        </div>

        <div>
          <label className="nameField">
            <input
              type="password"
              id="password1"
              className="inputField"
              placeholder="Confirm Password"
              onChange={onChange1}
            />
          </label>
        </div>

        <div className="DoB">
          Date of Birth:
          <label className="nameField">
            <input
              type="date"
              id="dateOfBirth"
              className="inputField"
              onChange={onChange}
            />
          </label>
        </div>

        <div>
          <input className="makeButton" type="submit" value="Sign Up" />
        </div>
      </form>

      <div>
        <h1 className="statusMessage">{status}</h1>
      </div>
    </div>
  );
}

/*
 
*/
