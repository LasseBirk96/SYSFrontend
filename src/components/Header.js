import { NavLink, useHistory } from "react-router-dom";
import "../Css-files/home.css";
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
    </ul>
  );
}
