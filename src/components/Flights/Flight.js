import { useState, useEffect } from "react";
export default function Flight({ flight, airports, editButtons }) {
  function convertDate(dateString) {
    let date = new Date(dateString);
    let h = "HH";
    let m = "MM";
    if (date.getHours() < 10) {
      h = "0" + date.getHours();
    } else {
      h = date.getHours();
    }
    if (date.getMinutes() < 10) {
      m = "0" + date.getMinutes();
    } else {
      m = date.getMinutes();
    }
    let newString = h + ":" + m;
    return newString;
  }

  function addArrCity() {
    let city = "";
    airports.forEach((airport) => {
      if (airport.code === flight.arrival.iata) {
        city = airport.city;
      }
    });
    return city;
  }
  function addDepCity() {
    let city = "";
    airports.forEach((airport) => {
      if (airport.code === flight.departure.iata) {
        city = airport.city;
      }
    });
    return city;
  }

  function getTimeDifference() {
    const arrDate = new Date(flight.arrival.scheduled);
    const depDate = new Date(flight.departure.scheduled);

    const a = (arrDate.getTime() - depDate.getTime()) / 1000 / 60 / 60;
    const b = 24 - (depDate.getTime() - arrDate.getTime()) / 1000 / 60 / 60;
    if (depDate.getTime() < arrDate.getTime()) {
      return convertToHour(a);
    } else {
      return convertToHour(b);
    }
  }
  function convertToHour(t) {
    const m = (t % 1) * 60;
    const h = t - (t % 1);
    const mFormatted = m - (m % 1);
    let time;
    mFormatted < 10
      ? (time = h + "t. " + mFormatted + "min.")
      : (time = h + "t. " + mFormatted + "min.");
    return time;
  }
  return (
    <div
      className="container-fluid "
      style={{ margin: 6, padding: 3, backgroundColor: "rgb(240, 255, 240" }}
    >
      <div className="row">
        <div className="col-md-5 col-xl-4">
          <div className="row">
            {" "}
            <div
              className="col"
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              {flight.flight_date}
            </div>
          </div>
          <div className="row" style={{}}>
            <div
              className="col"
              style={{
                textAlign: "center",
                color: "rgb(240, 20, 110",
                fontWeight: "bold",
              }}
            >
              {flight.airline.name}
            </div>
          </div>
          <div className="row">
            <div
              className="col"
              style={{
                textAlign: "center",
                color: "rgb(140, 110, 140",
                fontWeight: "bold",
              }}
            >
              {flight.departure.iata} - {flight.arrival.iata}
            </div>
          </div>
        </div>

        <div className="col-md-5 col-xl-5">
          <div className="row">
            <div className="col" style={{ textAlign: "right" }}>
              <div className="row">
                {" "}
                <div
                  className="col"
                  style={{
                    textAlign: "right",
                    color: "rgb(140, 110, 140",
                    fontWeight: "bold",
                  }}
                >
                  {flight.depCity}
                  {addDepCity()}
                </div>
              </div>
              <div className="row">
                {" "}
                <div
                  className="col"
                  style={{
                    textAlign: "right",
                    color: "rgb(240, 20, 110",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {convertDate(flight.departure.scheduled)}
                </div>
              </div>
              <div className="row">
                {" "}
                <div
                  className="col"
                  style={{
                    textAlign: "right",
                    fontWeight: "400",
                    fontSize: "small",
                  }}
                >
                  {flight.departure.airport}
                </div>
              </div>
            </div>
            <div className="col" style={{ textAlign: "right" }}>
              <div className="row">
                {" "}
                <div
                  className="col"
                  style={{
                    textAlign: "left",
                    color: "rgb(140, 110, 140",
                    fontWeight: "bold",
                  }}
                >
                  {flight.arrCity}
                  {addArrCity()}
                </div>
              </div>
              <div className="row">
                {" "}
                <div
                  className="col"
                  style={{
                    textAlign: "left",
                    color: "rgb(240, 20, 110",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {convertDate(flight.arrival.scheduled)}
                </div>
              </div>
              <div className="row">
                {" "}
                <div
                  className="col"
                  style={{
                    textAlign: "left",
                    fontWeight: "400",
                    fontSize: "small",
                  }}
                >
                  {flight.arrival.airport}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-xl-2" style={{}}>
          flight time
          <br />
          {getTimeDifference()}
        </div>
        <div className="col-md-12 col-xl-1"></div>
      </div>
    </div>
  );
}
