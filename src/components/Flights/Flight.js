export default function FlightList({ flight }) {
  return (
    <div className="tableContent" >
      <table style={{ width: "100%" }}>
        <tr style={{ textAlign: "center" }}>
          <td
            colSpan={1}
            style={{ fontWeight: 600, borderTop: "solid", borderLeft: "solid" }}
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
            {flight.departure.iata}
          </td>
        </tr>
        <tr style={{ fontWeight: 600, textAlign: "center" }}>
          <td colSpan={2} style={{ borderLeft: "solid" }}>
            dep City
          </td>
          <td colSpan={1} style={{ borderRight: "solid" }}>
            {flight.departure.scheduled}{" "}
          </td>
          <td colSpan={2}>Arr City</td>
          <td colSpan={1} style={{ borderRight: "solid" }}>
            {flight.arrival.scheduled}
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
            {flight.arrival.airport} Airport, terminal {flight.arrival.terminal}
          </td>
        </tr>
      </table>
    </div>
  );
}
