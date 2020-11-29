import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../Css-files/Register.css"


export default function Register({ facade, init }) {
  const [newUser, setNewUser] = useState(init);
  const [status, setStatus] = useState("");
  const [nickName, setNickName] = useState("unknown");


  const [form, setForm] = useState(
    <form className="registerContainer"onSubmit={onSubmit}>
      <div className="registerHeader"> Sign up with a username</div>
      <div>
          <label className="nameField" >
            <input type="text" id="username" className="inputField" placeholder="Username"onChange={onChange} />
          </label>
      </div>

      <div>
          <label className="nameField" >
            <input type="password" id="password" className="inputField" placeholder="Password"onChange={onChange} />
          </label>
      </div>

      <div>
          <label className="nameField">
          <input type="password" id="password1" className="inputField" placeholder="Confirm Password"  onChange={onChange} />
          </label>
      </div>

      <div className="DoB">
        Date of Birth:
          <label className="nameField">
          <input type="date" id="dateOfBirth" className="inputField"  onChange={onChange} />
          </label>
      </div>

      <div>
        <input className="makeButton" type="submit"  value="Sign Up" /> 
      </div>

    </form>
  );

  function onSubmit(e) {
    e.preventDefault();
    console.log(newUser);
    console.log(nickName);
    facade
      .registerUser({username:"Lasse", password:"hej"})
      .then((data) => {
        console.log(data);
        setStatus(data.msg);
        setNickName(data.username);
        setForm("");
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setStatus(e.message));
        } else {
          setStatus("Couldn't register user :(");
          console.log("Network error! Could not log in");
        }
      });
  }

  function onChange(e) {
    const target = e.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.id;
    let value = target.value;
    console.log(value)
    console.log(name)
    setNewUser({
      username:"lasse",
      password:"rfg"
    });
    console.log(newUser);
  }

  return (
    <div>
      <div>
        <h2 className="registerHeader"> <span className="registerLogo">TravelEat </span>  </h2>
      </div>
      <div>{form}</div>

      <div>
        <h1 className="statusMessage">{status}</h1>
      </div>
     </div>
  );
}

/*
  const handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setReservation({ ...reservation, [name]: value });
  };
*/
