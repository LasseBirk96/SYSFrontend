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
  loggedIn,
  activUser,
  setFlights,
  setRestaurants,
  deleteFlight,
}) {
  const history = useHistory();
  const initRes1 = {
    id: "11651616",
    name: "Molatka",
    location: {
      address: "21 1 Avenue 10003",
      city: "Other City",
      latitude: "55.62905",
      longitude: "12.647601",
      zipcode: "10003",
    },
  };
  const initRes2 = {
    id: "16780467",
    name: "Veselka",
    location: {
      address: "144 2nd Avenue 10003",
      city: "New York City",
      latitude: "40.728",
      longitude: "-73.987",
      zipcode: "10003",
    },
  };
  const tmpList = [initRes1, initRes2, initRes1, initRes2];
  let count = 0;
  const [msg, setMsg] = useState("");

  var countId = 1;
  function getImgID() {
    if (countId === 32) {
      countId = 1;
    }
    const tmp = countId;
    countId++;
    return tmp;
  }
  const flightsFromSets = [];
  const [output, setOutput] = useState(
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-xl-6">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-md-12 col-xl-8">
              {flights.length < 1 && tmpList.length < 1 ? (
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
            <div className="col-12" key="col11">
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
                {flights.map((set) => (
                  <div className="col-xl-12" style={{ marginRight: 0 }}>
                    <div
                      className="tripElement"
                      style={{ textAlign: "center", marginRight: 0 }}
                      key={set.id}
                    >
                      {set.flights.map((f) => (
                        <Flight
                          flight={f}
                          airports={airports}
                          key={f.flight + count++}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-1" key="col01"></div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="col-12">
            <div className="tripElement" key="restaurants">
              <div className="row">
                {restaurants.length < 1 ? (
                  <div className="col-xl-12" style={{ textAlign: "center" }}>
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
                {tmpList.map((r) => (
                  <div className="col-md-12 col-xl-6">
                    <div className="tripElement" key="resList">
                      <Restaurant
                        restaurant={r}
                        key={"r" + r.id}
                        imgId={getImgID()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function makeSetsToFlights() {
    flights.forEach((set) => {
      set.flights.forEach((flight) => {
        flightsFromSets.push(flight);
      });
    });
  }
  function saveTrip(e) {
    e.preventDefault();
    makeSetsToFlights();
    if (loggedIn === false) {
      setOutput(<UnknownUser />);
    } else {
      console.log("in saving");
      facade
        .saveTrip({
          flights: flightsFromSets,
          restaurants: restaurants,
          username: "user",
        })
        .then((data) => {
          setMsg(data);
          console.log("data.msg");
          console.log(data.msg);
          setFlights([]);
          setRestaurants([]);
        })
        .then(() => {
          setFlights([]);
          setRestaurants([]);
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setMsg(e.message));
          } else {
            setMsg("Network error has occurred: could not save thet trip");
            console.log("Network error! Could not save that trip");
          }
        });
    }
  }
  return output;
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
