import { NavLink, useHistory } from "react-router-dom";
import "../Css-files/home.css";
import imgTrip from "../img/trip.png";
export default function Header({ loggedIn, admin, logout }) {
  const history = useHistory();

  function onClick(e) {
    e.preventDefault();
    logout();
    history.push("/");
  }

  return (
    <ul className="header">
      {!admin ? (
        <li>
          <NavLink activeClassName="active" to="/home">
            <div className="logo">TRAVELEAT</div>
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {!admin && !loggedIn ? (
        <li>
          <NavLink activeClassName="active" to="/register">
            Register
          </NavLink>
          <NavLink activeClassName="active" to="/flight">
            Flights
          </NavLink>
          <NavLink activeClassName="active" to="/trip">
            Trip
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {!admin && !loggedIn ? (
        <li>
          <NavLink activeClassName="active" to="/login">
            Log in
          </NavLink>
        </li>
      ) : (
        ""
      )}

      {loggedIn && !admin ? (
        <li>
          <NavLink activeClassName="active" to="/account">
            Account
          </NavLink>
        </li>
      ) : (
        ""
      )}

      {admin ? (
        <li>
          <NavLink activeClassName="active" to="/orders">
            Orders
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {admin ? (
        <li>
          <NavLink activeClassName="active" to="/users">
            Users
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {admin ? (
        <li>
          <NavLink activeClassName="active" to="/statistics">
            Statisticks
          </NavLink>
        </li>
      ) : (
        ""
      )}

      {admin || loggedIn ? (
        <li>
          <button className="active" onClick={onClick}>
            Log out
          </button>
        </li>
      ) : (
        ""
      )}
      <div>
        {" "}
        <img src={imgTrip} style={{ alignSelf: "right" }} height={55} />
      </div>
    </ul>
  );
}
