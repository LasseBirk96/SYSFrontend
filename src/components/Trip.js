import "../Css-files/trip.css";
import Flight from "./Flights/Flight";
export default function Trip({ flights, restaurants, airports }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <button
                className="tripElement"
                style={{ color: "rgb(0, 217, 255)", fontWeight: "bold" }}
              >
                SAVE TRIP
              </button>
            </div>
            <div className="col-2"></div>
          </div>
          <div className="row">
            <div className="col-11">
              <div className="tripElement">
                {flights.length < 1 ? (
                  <button>Your flight list is empty, klcik to search</button>
                ) : (
                  <h3 style={{ color: "rgb(0, 217, 255)" }}>Your flights</h3>
                )}
                {flights.map((f) => (
                  <Flight flight={f} airports={airports} />
                ))}
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
        <div className="col-4">
          <div className="col-12">
            <div className="tripElement">
              <p>restaurant</p>
              <p>restaurant</p>
              <p>restaurant</p>
              <p>restaurant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
