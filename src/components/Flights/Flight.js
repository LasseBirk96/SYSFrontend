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
    <div className="avaliableFlights">
      <div >
        <div>{flight.departure.iata}</div>
        <div>{flight.flight_date}</div>
        <div>{flight.arrival.iata}</div>
      </div>
      <div >
        <div > {depCity} {convertDate(flight.departure.scheduled)}</div>
        <div > {arrCity} {convertDate(flight.arrival.scheduled)}</div>
      </div>
      <div>
        <div >
          {flight.departure.airport} Airport, Terminal {flight.departure.terminal}
        </div>
        <div >
          {flight.arrival.airport} Airport, Terminal {flight.arrival.terminal}
        </div>
      </div>
    </div>
  );
}
