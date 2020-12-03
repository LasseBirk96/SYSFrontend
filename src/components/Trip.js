import "../Css-files/trip.css";
import Flight from "./Flights/Flight";
export default function Trip({ flights, restaurants, airports }) {
  return (
    <div className="container-fluid">
      
      <div className="tripElement">
                {flights.length < 1 ? (
                  <button>Your flight list is empty, click to search</button>
                ) : (
                  <h3 className="userFlights">Your flights</h3>
                )}
                {flights.map((f) => (
                  <Flight flight={f} airports={airports} />
                ))}
      </div>

      <button className="tripElement">SAVE TRIP </button>
            
      <div className="tripElement">
              <p>Har ikke stillet denne side, da jeg ikke ved hvad den skal kunne</p>
              <p>restaurant</p>
              <p>restaurant</p>
              <p>restaurant</p>
      </div>
      
      
    </div>
  );
}
