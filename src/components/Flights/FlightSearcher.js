import { useEffect, useState } from "react";
import Airport from "./Airport";
import Flight from "./Flight";

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
  const [currentInputTarget, setCurrentInput] = useState();
  const [resultMsg, setResultMsg] = useState("");
  const [startFlightFetch, setStartFlightFetch] = useState(false);
  const loader = <div className="loader"></div>;

  function onChange(e) {
    setStatus("");
    setCurrentInput(e.target);
    console.log("current Target");
    console.log(currentInputTarget);
    const name = e.target.id;
    setFlight({
      ...flight,
      [name]: "",
    });
    setSugest([]);

    checkIATA(e);
  }

  function onDateChange(e) {
    const value = e.target.value;
    const name = e.target.id;
    setSugest([]);
    setFlight({
      ...flight,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setLoad(false);
    setSugest([]);
    let save = true;

    for (const prop in flight) {
      if (flight[prop] === "") {
        setStatus("Pleas choose valid arrival, departure and date ");
        save = false;
      }
    }
    if (save) {
      console.log("fetching flight");
      setStart(true);
      setLoad(true);
      setStartFlightFetch(!startFlightFetch);
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
      console.log("Flight to find:");
      console.log(flight);
      facade
        .findFlights(flight)
        .then((data) => {
          setResults(data.map((f) => f));
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
  }, [startFlightFetch]);

  function checkIATA(e) {
    let tmpArr = [];
    const value = e.target.value;
    const name = e.target.id;
    let count = 0;

    if (value.length >= 1) {
      airports.forEach((a) => {
        if (a.code.startsWith(value.toUpperCase())) {
          count++;
          tmpArr.unshift(
            <Airport airport={a} key={count} onClickFunction={clickOnAirport} />
          );
        }
      });
    }
    if (value.length >= 1) {
      airports.forEach((a) => {
        if (a.city.toLowerCase().startsWith(value.toLowerCase())) {
          if (
            !tmpArr.includes(
              <Airport airport={a} onClickFunction={clickOnAirport} />
            )
          ) {
            tmpArr.push(
              <Airport airport={a} onClickFunction={clickOnAirport} />
            );
          }
        }
      });
    }

    if (value.length >= 1) {
      airports.forEach((a) => {
        if (a.city.toLowerCase().startsWith(value.toLowerCase())) {
          if (
            !tmpArr.includes(
              <Airport airport={a} onClickFunction={clickOnAirport} />
            )
          ) {
            tmpArr.push(
              <Airport airport={a} onClickFunction={clickOnAirport} />
            );
          }
        }
      });
    }

    if (tmpArr.length === 0) {
      setResultMsg("No airports found. Try to type something else");
    }
    setSugest(tmpArr);
  }

  function clickOnAirport(event) {
    event.preventDefault();
    let inputTarget = currentInputTarget;
    let id = event.currentTarget.id;

    let chosenAirp = airports.filter((arp) => id === arp.code)[0];
    setFlight({ ...flight, [currentInputTarget.id]: chosenAirp.code });
    let airpString =
      chosenAirp.code + ", " + chosenAirp.city + ", " + chosenAirp.country;
    console.log(currentInputTarget);
    inputTarget.value = airpString;
    setSugest([]);
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
        <div key="inputDiv">
          <div className="result" key="input">
            <input
              className="tableContent"
              type="text"
              id="dep_code"
              key="dep_code"
              placeholder={"From"}
              onChange={onChange}
              onClick={(e) => {
                setSugest([]);
                setCurrentInput(e.target);
              }}
            />
            <input
              className="tableContent"
              type="text"
              id="arr_code"
              key="arr_code"
              placeholder={"To"}
              onChange={onChange}
              onClick={(e) => {
                setSugest([]);
                setCurrentInput(e.target);
              }}
            />
            <input
              className="tableContent"
              type="date"
              min={today}
              max={lastDay}
              id="date"
              placeholder="Date"
              onChange={onDateChange}
              onClick={() => {
                setSugest([]);
                setStatus("");
              }}
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
            <div key="resultStatus" className="result">
              {status}
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <div className="result" key="loaderDiv">
              {loader}
              {""}
            </div>
          ) : (
            <div>
              {sugestions.length === 0 ? (
                resultMsg === "" ? (
                  ""
                ) : resultMsg !== "" ? (
                  ""
                ) : (
                  <div className="result" key="resultMsg">
                    <div
                      className="tableContent"
                      style={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      {resultMsg} result MSG
                    </div>
                  </div>
                )
              ) : (
                ""
              )}

              {resultList.length === 0 ? (
                <div className="result" key="flightsDiv">
                  {" "}
                  No available flights for given date
                </div>
              ) : (
                <div className="result" key="flightsDiv">
                  {resultList.map((f) => (
                    <button key={resultList.indexOf(f)}>
                      <Flight flight={f} key={f.arrival.scheduled} />
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
