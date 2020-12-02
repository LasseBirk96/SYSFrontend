import { useEffect, useState } from "react";

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
    console.log(date);
    let newString = date.getHours() + ":" + date.getMinutes() + " local time";
    return newString;
  }
  return (
    <div className="tableContent">
      <table style={{ width: "100%" }}>
        <tbody>
          <tr style={{ textAlign: "center" }}>
            <td
              colSpan={1}
              style={{
                fontWeight: 600,
                borderTop: "solid",
                borderLeft: "solid",
              }}
            >
              {flight.departure.iata}
            </td>
            <td colSpan={4} style={{ borderStyle: "solid", borderTop: "none" }}>
              {flight.flight_date}
            </td>
            <td
              colSpan={1}
              style={{
                fontWeight: 600,
                borderTop: "solid",
                borderRight: "solid",
              }}
            >
              {flight.arrival.iata}
            </td>
          </tr>
          <tr style={{ fontWeight: 600, textAlign: "center" }}>
            <td colSpan={2} style={{ borderLeft: "solid" }}>
              {depCity}
            </td>
            <td colSpan={1} style={{ borderRight: "solid" }}>
              {convertDate(flight.departure.scheduled)}{" "}
            </td>
            <td colSpan={2}>{arrCity}</td>
            <td colSpan={1} style={{ borderRight: "solid" }}>
              {convertDate(flight.arrival.scheduled)}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{ paddingLeft: 13, border: "solid", borderTop: "none" }}
            >
              {flight.departure.airport} Airport, terminal{" "}
              {flight.departure.terminal}
            </td>
            <td
              colSpan={3}
              style={{ paddingLeft: 13, border: "solid", borderTop: "none" }}
            >
              {flight.arrival.airport} Airport, terminal{" "}
              {flight.arrival.terminal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
