import { useEffect, useState } from "react";
import facade from "../../apiFacade";
import links from "../../settings";
import "../../Css-files/flight.css";

export default function RestauranSearcher() {
  const loader = <div className="loader"></div>;
  const [loading, setLoading] = useState(true);
  const [allCountries, setAllCountries] = useState([]);
  const [sugestions, setSug] = useState([]);
  const [options, setOptions] = useState([]);
  const [countryInputTarget, setCountryTarget] = useState(null);
  const [chosenCountry, setCountry] = useState(null);
  const [fetchCities, setFetchCities] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [showCityInput, setShowCityInput] = useState(false);
  const [citiesOfCountry, setCitysOfCountry] = useState([]);
  useEffect(() => {
    if (checkStorageForCountries() === false) {
      let mounted = true;
      console.log("In use effect");
      facade
        .fetchData(links.countries)
        .then((data) => setAllCountries(data.map((c) => c)))
        .then(console.log(allCountries))
        .then(() => {
          if (mounted) {
            localStorage.setItem("countries", JSON.stringify(allCountries));
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => console.log(e.msg));
          } else {
            console.log("Network error has occurred: could not load coutries");
          }
        });
      return function cleanup() {
        mounted = false;
      };
    } else {
      setAllCountries(localStorage.getItem("countries").split(","));
      setLoading(false);
    }
  }, []);

  function checkStorageForCountries() {
    const countriesValue = localStorage.getItem("countries");
    return countriesValue !== null;
  }

  function filterCountries(e) {
    setCountryTarget(e.target);
    setSug([]);
    setOptions([]);
    let count = 0;
    const input = e.target.value;
    if (input.length > 0) {
      allCountries.forEach((c) => {
        if (c.toLowerCase().startsWith(input.toLowerCase())) {
          sugestions.push(c);

          setOptions(
            sugestions.map((s) => (
              <button
                className="tableContent"
                style={{ textAlign: "center", fontWeight: "bold" }}
                value={s}
                key={s}
                onClick={onClickCountry}
              >
                {s}{" "}
              </button>
            ))
          );
        }
      });
      setCountryTarget(e.target);
    }
  }

  function clickOnInputCountry(e) {
    e.preventDefault();
    setCountryTarget(e.target);
    console.log(countryInputTarget);
  }
  function onClickCountry(e) {
    e.preventDefault();

    countryInputTarget.value = e.currentTarget.value;
    countryInputTarget.disabled = true;

    setOptions([]);
    setCountry({ country: e.currentTarget.value });
    setFetchCities(true);
  }

  useEffect(() => {
    if (fetchCities) {
      let mounted = true;
      setShowCityInput(true);
      setLoadingCities(true);

      facade
        .fetchCities(chosenCountry)
        .then((data) => {
          data.forEach((city) => {
            citiesOfCountry.push(city);
          });
          console.log("citiesOfCountry");
          console.log(citiesOfCountry);
        })
        .then(() => {
          if (mounted) {
            setLoadingCities(false);
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => console.log(e.message));
          } else {
            console.log("Network error! Could not load cities");
          }
        });
      return function cleanup() {
        mounted = false;
      };
    } else {
    }
  }, [fetchCities]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="title">
            {" "}
            Search for restaurants with <span className="logo">
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
              <div className="container-fluid">
                <div className="wrapper">
                  <div key="inputDiv">
                    <div className="resultFlight" key="input">
                      <input
                        className="tableContent"
                        type="text"
                        id="country"
                        key="country"
                        placeholder={"From"}
                        onChange={filterCountries}
                        onClick={clickOnInputCountry}
                      />
                      <div className="form-group"></div>
                      <ul
                        className="list-group"
                        style={{ listStyleType: "none" }}
                      >
                        {options}
                      </ul>
                      {showCityInput ? (
                        <>
                          {loadingCities ? (
                            loader
                          ) : (
                            <>
                              <input
                                className="tableContent"
                                type="text"
                                id="city"
                                key="city"
                                placeholder={"From"}
                                value={citiesOfCountry.length}
                              />
                              <div className="form-group"></div>
                              <ul
                                className="list-group"
                                style={{ listStyleType: "none" }}
                              >
                                {options}
                              </ul>
                            </>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
