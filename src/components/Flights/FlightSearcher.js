import { useEffect, useState } from "react";
import Airport from "./Airport";
import Flight from "./Flight";

import arrows from "../../img/arrows.png";

export default function FLightSearcher({ airports, facade, chooseFlight }) {
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
  const [noFlightsFound, setNoFlights] = useState("");
  const [inputTargets, setTargets] = useState([]);
  const loader = <div className="loader"></div>;
  const airports2 = airports.map((f) => f);

  function onChange(e) {
    if (inputTargets.length === 0) {
      inputTargets.push(e.target);
    } else if (inputTargets.length === 1 && !inputTargets.includes(e.target)) {
      inputTargets.push(e.target);
    }
    setStatus("");
    setCurrentInput(e.target);
    setNoFlights("");

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
        setStatus("Please, choose valid arrival, departure and date ");
        save = false;
      }
    }
    if (save) {
      setStart(true);
      setLoad(true);
      setStartFlightFetch(!startFlightFetch);
    }
  }

  useEffect(() => {
    console.log(flight);
    let mounted = true;
    let startFetch = true;
    for (const prop in flight) {
      if (flight[prop] === "") {
        startFetch = false;
      }
    }
    if (startFetch) {
      facade
        .findFlights(flight)
        .then((data) => {
          setResults(data.map((f) => f));
        })
        .then(() => {
          setLoad(false);
          setStart(false);
          setNoFlights(
            <div className="resultFlight" key="flightsDiv">
              {" "}
              No available flights for given date
            </div>
          );
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

    /*  if (value.length >= 1) {
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
    } */

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
    inputTarget.value = airpString;
    setSugest([]);
  }
  function swapAirports() {
    inputTargets.forEach((t) => console.log(t.value));
    if (inputTargets.length === 2) {
      let tmpValue = inputTargets[0].value;
      let tmpCode = flight.dep_code;
      inputTargets[0].value = inputTargets[1].value;
      inputTargets[1].value = tmpValue;
      setFlight({ ...flight, dep_code: flight.arr_code, arr_code: tmpCode });
    }
    inputTargets.forEach((t) => console.log(t.value));
  }
  function clickOnFlight(e, f) {
    e.preventDefault();

    chooseFlight(f);
    setResults([]);
    setNoFlights(
      <div className="resultFlight" key="flightsDiv">
        {" "}
        Flight added to your trip
      </div>
    );
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
          <div className="resultFlight" className="col-md-12" key="input">
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
                onChange(e);
              }}
            />
            <button
              type="button"
              className="tableContent"
              style={{ textAlign: "center", fontWeight: "bold" }}
              onClick={swapAirports}
            >
              <img
                src={arrows}
                alt={"logo"}
                height="20"
                style={{ padding: "0 ", margin: 0 }}
              />
            </button>
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
                onChange(e);
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
              onClick={(e) => {
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
            <div
              key="resultStatus"
              className="resultFlight"
              className="col-md-12"
            >
              {status}
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <div className="resultFlight" key="loaderDiv">
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
                  <div className="resultFlight" key="resultMsg">
                    <div
                      className="tableContent"
                      style={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      {resultMsg}
                    </div>
                  </div>
                )
              ) : (
                ""
              )}

              {resultList.length === 0 ? (
                noFlightsFound
              ) : (
                <div className="resultFlight" key="flightsDiv">
                  {resultList.map((f) => (
                    <div>
                      {" "}
                      <button
                        className="container"
                        style={{
                          outline: "none",
                          padding: "10px 15px",
                          textAlign: "center",
                          border: "1px solid rgb(0, 217, 255)",
                          marginBottom: "0, 5px",
                          borderRadius: "10px",

                          cursor: "pointer",
                          backgroundColor: "white",
                        }}
                        onClick={(e) => clickOnFlight(e, f)}
                        key={resultList.indexOf(f)}
                      >
                        <Flight
                          key={resultList.indexOf(f) + 15000}
                          flight={f}
                          airports={airports2}
                          onFocus={(e) => {
                            e.target.backgroundColor = "rgb(0, 217, 255)";
                          }}
                        />
                      </button>
                    </div>
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
