import { useEffect, useState } from "react";
import facade from "../apiFacade";
import links from "../settings";
import RestaurantSearcher from "./Restaurants/RestaurantSearcher";

export default function Restaurant({ addRestaurant }) {

  const loader = <div className="loader"></div>;
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [cities, setCity] = useState([]);

  function addToRestaurants(restaurant) {
    addRestaurant(restaurant)
  }
  useEffect(() => {
    let mounted = true

    facade
      .fetchData(links.cities)
      .then((data) => {
        for (const city of data) {
          cities.push(city)
        }
      })
      .then(() => {
        if (mounted) {
          setLoading(false)
        }
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setStatus(e.message));
        } else {
          setStatus("Network error has occurred: could not load cities");
          console.log("Network error! Could not load cities");
        }
      })
    return function cleanup() {
      mounted = false
    }
  }, [])


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="title">
            {" "}
            Search for a restaurant with <span className="logo">
              TravelEat{" "}
            </span>{" "}
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-8">
          {" "}
          {loading ? (
            loader
          ) : (
              <div>
                <RestaurantSearcher
                chooseRestaurant={addToRestaurants}
                cities={cities}
                facade={facade}
                />

              </div>
            )}
        </div>
        <div className="col"></div>
      </div>
    </div>


  );
}
