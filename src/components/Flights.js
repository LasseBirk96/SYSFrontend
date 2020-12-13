import { useEffect, useState } from "react";
import facade from "../apiFacade";
import links from "../settings";
import FlightSearcher from "./Flights/FlightSearcher";
import "../Css-files/flight.css";

export default function Flight({ addFlight }) {
  const loader = <div className="loader"></div>;
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [airports, setAirports] = useState([]);

  function addToFlights(flight) {
    addFlight(flight);
  }
  useEffect(() => {
    let mounted = true;

    facade
      .fetchData(links.airports)
      .then((data) => {
        for (const airp of data) {
          airports.push(airp);
        }

        console.log("airports");
        console.log(airports);
      })
      .then(() => {
        if (mounted) {
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setStatus(e.message));
        } else {
          setStatus("Network error has occurred: could not load airports");
          console.log("Network error! Could not load airports");
        }
      });
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="title">
            {" "}
            Search for a flight with <span className="logo">
              TravelEat{" "}
            </span>{" "}
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col"></div>
        <div className="col-xl-8 col-md-12">
          {" "}
          {loading ? (
            loader
          ) : (
            <div>
              <FlightSearcher
                chooseFlight={addToFlights}
                airports={airports}
                facade={facade}
              />
            </div>
          )}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
