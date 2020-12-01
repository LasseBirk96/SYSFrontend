import { useEffect } from "react";

export default function Airport({ airport, onClickFunction }) {
 

  return (
    <button
      id={airport.code}
      key={airport.code}
      className="tableContent"
      style={{ width: "100%" }}
      onClick={onClickFunction}
    >
      <div>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "70%" }}>
                {airport.city}, {airport.country}
              </td>
              <th style={{ width: "30%" }} rowSpan="2">
                {airport.code}
              </th>
            </tr>

            <tr>
              <td style={{ width: "70%", fontWeight: 100, fontSize: "small" }}>
                {" "}
                {airport.name} Airpot
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </button>
  );
}
