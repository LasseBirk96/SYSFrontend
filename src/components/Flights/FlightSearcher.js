import { useEffect, useState } from "react";
import Airport from "./Airport";
import Flight from "./Flight";
import FlightList from "./FlightList";

export default function FLightSearcher({ airports, facade }) {
  const initFlight = {
    dep_code: "",
    arr_code: "",
    date: "",
  };
  const [status, setStatus] = useState("");
  const [flight, setFlight] = useState(initFlight);
  const [sugestions, setSugest] = useState([]);
  const [loading, setLoad] = useState(false);
  const [resultList, setResults] = useState([]);
  const [startFetch, setStart] = useState();
  const [placeHolderArr, setHolderArr] = useState("To (IATA-code)");
  const [placeHolderDep, setHolderDep] = useState("From (IATA-code)");
  const [depValue, setDepValue] = useState("");
  const [arrValue, setArrValue] = useState("");
  const [currentInput, setCurrentInput] = useState();
  const loader = <div className="loader"></div>;

  function onCodeChange(e) {
    setStatus("");
    setCurrentInput(e.target);

    const value = e.target.value;
    const name = e.target.id;
    setFlight({
      ...flight,
      [name]: "",
    });
    setSugest([]);

    checkIATA(e);

    console.log("flight on change:");
    console.log(flight);
  }

  function onDateChange(e) {
    const value = e.target.value;
    const name = e.target.id;

    setFlight({
      ...flight,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setLoad(false);
    let save = true;
    console.log("searching for flights...");
    console.log(flight);
    for (const prop in flight) {
      console.log("prop:");
      console.log(flight[prop]);
      if (flight[prop] === "") {
        setStatus("Pleas choose valid arrival, departure and date ");
        save = false;
      }
    }
    if (save) {
      console.log("fetch flight");
      setStart(true);
      setLoad(true);
    }
  }

  useEffect(() => {
    let mounted = true;
    let startFetch = true;
    for (const prop in flight) {
      if (flight[prop] === "") {
        startFetch = false;
      }
    }
    console.log("uses effect, start:" + startFetch);
    if (startFetch) {
      console.log("uses effect, in if, start:" + startFetch);
      facade
        .findFlights(flight)
        .then((data) => {
          setResults(data.map((f) => f));
          console.log(resultList);
          console.log(data);
        })
        .then(() => {
          setLoad(false);
          setStart(false);
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setStatus(e.message));
          } else {
            setStatus("Network error has occurred: could not load flights");
            console.log("Network error! Could not load flights");
          }
        });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [startFetch]);

  function checkIATA(e) {
    let tmpArr = [];
    const value = e.target.value;
    const name = e.target.id;
    let count = 0;

    if (value.length >= 1) {
      airports.forEach((a) => {
        if (a.code.startsWith(value.toUpperCase())) {
          count++;
          console.log("count: " + count);
          tmpArr.push(
            <Airport airport={a} key={count} onClickFunction={clickOnAirport} />
          );
          if (value.length === 3) {
            setFlight({
              ...flight,
              [name]: a.code,
            });
            tmpArr = [];
          }
        }
      });
    }
    setSugest(tmpArr);
  }

  function clickOnAirport(event) {
    event.preventDefault();
    let inputTarget = currentInput;
    console.log(event.currentTarget);
    let id = event.currentTarget.id;
    console.log("id: " + id);
    console.log("airports list has objects: " + airports.length);
    console.log("sugestions list has objects: " + sugestions.length);
    console.log(sugestions);
    let chosenAirp = airports.filter((arp) => id === arp.code)[0];
    console.log("Clicked airport is:");
    console.log(chosenAirp);
    //console.log(chosenAirp.code);
    let airpString =
      chosenAirp.code + ", " + chosenAirp.city + ", " + chosenAirp.country;

    inputTarget.value = airpString;
  }

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  var lastDay = yyyy + 1 + "-" + mm + "-" + dd;

  return (
    <div className="container-fluid">
      <div className="wrapper">
        <div>
          <div className="result">
            <input
              className="tableContent"
              type="text"
              id="dep_code"
              maxLength={3}
              placeholder={placeHolderDep}
              value={depValue}
              onChange={onCodeChange}
            />
            <input
              className="tableContent"
              type="text"
              id="arr_code"
              maxLength={3}
              placeholder={placeHolderArr}
              onChange={onCodeChange}
            />
            <input
              className="tableContent"
              type="date"
              min={today}
              max={lastDay}
              id="date"
              placeholder="Date"
              onChange={onDateChange}
            />
            <button
              type="button"
              className="tableContent"
              style={{ textAlign: "center", fontWeight: "bold" }}
              onClick={onSubmit}
            >
              Search
            </button>
            {sugestions}
          </div>

          {status !== "" ? (
            <div id="result" className="result">
              {" "}
              {status}{" "}
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <div className="result">{loader} </div>
          ) : (
            <div>
              {resultList.length === 0 ? (
                <div className="result">
                  {" "}
                  <div
                    className="tableContent"
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    No results found
                  </div>
                </div>
              ) : (
                <div className="result">
                  {" "}
                  {resultList.map((f) => (
                    <button key={resultList.indexOf(f)}>
                      <Flight flight={f} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
