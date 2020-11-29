import { useEffect, useState } from "react";
import facade from "../apiFacade";
import links from "../settings";
import FlightSearcher from "./FlightSearcher";

export default function Flight({}) {
  const loader = <div className="loader"></div>;
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [airports, setAirports] = useState([]);

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
        <div className="col"></div>
        <div className="col-8">
          {" "}
          {loading ? (
            loader
          ) : (
            <div className="wrapper">
              <FlightSearcher airports={airports} facade={facade} />
            </div>
          )}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
