import { NavLink, useHistory } from "react-router-dom";
import "../Css-files/home.css";
import imgTrip from "../img/trip.png";
export default function Header({
  loggedIn,
  admin,
  logout,
  fquantity,
  rquantity,
  activUser,
}) {
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
        </li>
      ) : (
        ""
      )}
      {!admin && !loggedIn ? (
        <li style={{ position: "absolute", right: 10 }}>
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
          <NavLink activeClassName="active" to="/users">
            Users
          </NavLink>
        </li>
      ) : (
        ""
      )}

      {!admin ? (
        <li>
          <NavLink activeClassName="active" to="/flights">
            Flights
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {!admin ? (
        <li>
          <NavLink activeClassName="active" to="/trip">
            <div style={{ width: "10%" }}>
              <div
                className="container-fluid"
                style={{ backgroundImage: imgTrip }}
              >
                <div
                  style={{
                    marginBottom: "-15px",
                    textAlign: "right",
                    color: "rgb(0, 217, 255)",
                  }}
                >
                  Trip
                </div>{" "}
                <div className="row">
                  <img
                    src={imgTrip}
                    style={{ alignSelf: "right" }}
                    height={55}
                  />
                </div>
                <div className="row">
                  <div
                    className="col-6"
                    style={{
                      marginTop: "-15px",
                      textAlign: "left",
                      color: "rgb(0, 217, 255)",
                    }}
                  >
                    {fquantity < 1 ? "" : fquantity}
                  </div>
                  <div
                    className="col-6"
                    style={{
                      marginTop: "-15px",
                      textAlign: "right",
                      color: "rgb(0, 217, 255)",
                    }}
                  >
                    {rquantity < 1 ? "" : rquantity}
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {admin || loggedIn ? (
        <li style={{ position: "absolute", right: 10, top: 10 }}>
          <button className="tableContent" onClick={onClick}>
            Log out
          </button>
        </li>
      ) : (
        ""
      )}
      <div style={{ color: "white" }}> {activUser}</div>
    </ul>
  );
}
