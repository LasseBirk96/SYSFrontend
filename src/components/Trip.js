import "../Css-files/trip.css";
import Flight from "./Flights/Flight";
import Restaurant from "./Restaurant";
import facade from "../apiFacade";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UnknownUser from "./UnknownUser";

export default function Trip({
  flights,
  restaurants,
  airports,
  setRestaurants,
  setFlights,
}) {
  let count = 0;
  const [msg, setMsg] = useState("");
  const loggedIn = false;
  const [o, setO] = useState(
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              {flights.length < 1 && restaurants.length < 1 ? (
                <div
                  className="logo"
                  style={{
                    marginLeft: "20%",
                    marginBottom: "40px",
                    marginTop: "40px",
                  }}
                >
                  {" "}
                  Your TRAVELEATING can start right here!
                </div>
              ) : (
                <button
                  className="tripElement"
                  style={{
                    color: "rgb(0, 217, 255)",
                    fontWeight: "bold",
                    backgroundColor: "#150327",
                    marginLeft: "20%",
                    marginBottom: "40px",
                    marginTop: "40px",
                  }}
                  onClick={saveTrip}
                >
                  <div className="logo">CLICK TO SAVE THIS TRIP</div>
                </button>
              )}
            </div>
            <div className="col-2"></div>
          </div>
          <div className="row">
            <div className="col-11">
              <div className="tripElement">
                {flights.length < 1 ? (
                  <div style={{ textAlign: "center" }}>
                    Ready for new destination?
                    <button
                      className="tripElement"
                      style={{
                        color: "rgb(0, 217, 255)",
                        fontWeight: "bold",
                        backgroundColor: "#150327",
                        marginLeft: "20%",
                      }}
                    >
                      <div className="logo">TRAVEL!</div>
                    </button>
                  </div>
                ) : (
                  <h3 className="userFlights">Your flights</h3>
                )}
                {flights.map((f) => (
                  <div className="tripElement">
                    <Flight
                      flight={f}
                      airports={airports}
                      key={"f" + count++}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
        <div className="col-4">
          <div className="col-12">
            <div className="tripElement">
              {restaurants.length < 1 ? (
                <div style={{ textAlign: "center" }}>
                  Hungry for new experiences?
                  <button
                    className="tripElement"
                    style={{
                      color: "rgb(0, 217, 255)",
                      fontWeight: "bold",
                      backgroundColor: "#150327",
                      marginLeft: "5%",
                    }}
                  >
                    <div className="logo">EAT!</div>
                  </button>
                </div>
              ) : (
                <h3 style={{ color: "rgb(0, 217, 255)" }}>Your flights</h3>
              )}
              {restaurants.map((r) => (
                <div className="tripElement">
                  <Restaurant restauran={r} key={"r" + count++} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function saveTrip(e) {
    setO(<UnknownUser />);
    /*
    e.preventDefault();
    console.log("in saving");
    facade
      .saveTrip({
        flights: flights,
        restaurants: restaurants,
        username: "user",
      })
      .then((data) => {
        setMsg(data);
        console.log(data);
      })
      .then(() => {
        if (msg === "The trip is saved on the trip list") {
          setFlights([]);
          setRestaurants([]);
        }
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setMsg(e.message));
        } else {
          setMsg("Network error has occurred: could not save thet trip");
          console.log("Network error! Could not save that trip");
        }
      });
      */
  }
  return o;
}
/*


    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              {flights.length < 1 && restaurants.length < 1 ? (
                <div
                  className="logo"
                  style={{
                    marginLeft: "20%",
                    marginBottom: "40px",
                    marginTop: "40px",
                  }}
                >
                  {" "}
                  Your TRAVELEATING can start right here!
                </div>
              ) : (
                <button
                  className="tripElement"
                  style={{
                    color: "rgb(0, 217, 255)",
                    fontWeight: "bold",
                    backgroundColor: "#150327",
                    marginLeft: "20%",
                    marginBottom: "40px",
                    marginTop: "40px",
                  }}
                  onClick={saveTrip}
                >
                  <div className="logo">CLICK TO SAVE THIS TRIP</div>
                </button>
              )}
            </div>
            <div className="col-2"></div>
          </div>
          <div className="row">
            <div className="col-11">
              <div className="tripElement">
                {flights.length < 1 ? (
                  <div style={{ textAlign: "center" }}>
                    Ready for new destination?
                    <button
                      className="tripElement"
                      style={{
                        color: "rgb(0, 217, 255)",
                        fontWeight: "bold",
                        backgroundColor: "#150327",
                        marginLeft: "20%",
                      }}
                    >
                      <div className="logo">TRAVEL!</div>
                    </button>
                  </div>
                ) : (
                  <h3 className="userFlights">Your flights</h3>
                )}
                {flights.map((f) => (
                  <div className="tripElement">
                    <Flight
                      flight={f}
                      airports={airports}
                      key={"f" + count++}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
        <div className="col-4">
          <div className="col-12">
            <div className="tripElement">
              {restaurants.length < 1 ? (
                <div style={{ textAlign: "center" }}>
                  Hungry for new experiences?
                  <button
                    className="tripElement"
                    style={{
                      color: "rgb(0, 217, 255)",
                      fontWeight: "bold",
                      backgroundColor: "#150327",
                      marginLeft: "5%",
                    }}
                  >
                    <div className="logo">EAT!</div>
                  </button>
                </div>
              ) : (
                <h3 style={{ color: "rgb(0, 217, 255)" }}>Your flights</h3>
              )}
              {restaurants.map((r) => (
                <div className="tripElement">
                  <Restaurant restauran={r} key={"r" + count++} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

*/
