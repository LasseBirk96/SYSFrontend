

export default function City({ city, onClickFunction }) {
  return (
    <button
      id={city.id}
      key={city.id}
      className="tableContent"
      style={{ width: "100%" }}
      onClick={onClickFunction}
    >
      <div>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "70%" }}>
                {city.name}, {city.country}
              </td>
              <th style={{ width: "30%" }} rowSpan="2">
                {city.id}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </button>
  );
}