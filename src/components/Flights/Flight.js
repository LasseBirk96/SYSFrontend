import { useState, useEffect } from "react";
export default function Flight({ flight, airports }) {
  const [arrCity, setArrCity] = useState("City");
  const [depCity, setDepCity] = useState("City");
  useEffect(setCities, []);
  function setCities() {
    airports.forEach((airport) => {
      if (airport.code === flight.arrival.iata) {
        setArrCity(airport.city);
      }
      if (airport.code === flight.departure.iata) {
        setDepCity(airport.city);
      }
    });
  }
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
    let newString = h + ":" + m + " local time";
    return newString;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">{flight.departure.iata}</div>
        <div className="col-8">{flight.flight_date}</div>
        <div className="col-2">{flight.arrival.iata}</div>
      </div>
      <div className="row">
        <div className="col-3"> {depCity}</div>
        <div className="col-3">{convertDate(flight.departure.scheduled)}</div>
        <div className="col-3"> {arrCity}</div>
        <div className="col-3">{convertDate(flight.arrival.scheduled)}</div>
      </div>
      <div className="row">
        <div className="col-6">
          {flight.departure.airport} Airport, terminal{" "}
          {flight.departure.terminal}
        </div>
        <div className="col-6">
          {flight.arrival.airport} Airport, terminal {flight.arrival.terminal}
        </div>
      </div>
      <div className="row">
        <div className="col">Airline: {flight.airline.name}</div>
      </div>
    </div>
  );
}
