import { useEffect, useState } from "react";

export default function Sugestion({ airports, facade }) {
  const initFlight = {
    dep_code: "",
    arr_code: "",
    date: "",
  };
  const [status, setStatus] = useState();
  const [flight, setFlight] = useState(initFlight);
  const [sugestions, setSugest] = useState([]);
  const [loading, setLoad] = useState(false);
  const [resultList, setResults] = useState([]);
  const [startFetch, setStart] = useState();
  const [waitingFlights, setWaiting] = useState(false);
  const loader = <div className="loader"></div>;

  function onCodeChange(e) {
    setStatus("");

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
    setLoad(false)
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
        .then(setLoad(false))
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

    if (value.length >= 1) {
      airports.forEach((a) => {
        if (a.code.startsWith(value.toUpperCase())) {
          tmpArr.push(<li key={a.code}>{a.code}</li>);
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
              type="text"
              id="dep_code"
              maxLength={3}
              placeholder="From(IATA-code)"
              onChange={onCodeChange}
            />
            <input
              type="text"
              id="arr_code"
              maxLength={3}
              placeholder="To(IATA-code)"
              onChange={onCodeChange}
            />
            <input
              type="date"
              min={today}
              max={lastDay}
              id="date"
              placeholder="Date"
              onChange={onDateChange}
            />
            <button type="button" onClick={onSubmit}>
              Search
            </button>
          </div>

          <div id="result" className="result">
            {status !== "" ? status : sugestions}
          </div>
          {loading ? (
            <div className="result">{loader} </div>
          ) : (
            <div className="result">{resultList.length}</div>
          )}
        </div>
      </div>
    </div>
  );
}
