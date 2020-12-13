import { useEffect, useState } from "react";
import facade from "../../apiFacade";
import links from "../../settings";
import "../../Css-files/flight.css";
import { getSuggestedQuery } from "@testing-library/react";

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
  const [cityInputTarget, setCityTarget] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [chosenCity, setChosenCity] = useState([null])
  const [showCityDataInput, setShowCityDataInput] = useState(false)
  const [loadingCityData, setLoadingCityData] = useState(false)
  const [cityDataOfCities, setCityDataOfCities] = useState([])
  const [fetchCityData, setFetchCityData] = useState(false)
  const [cuisines, setCuisines] = useState([])
  const [cuisineInputTarget, setCuisineInputTarget] = useState(null)
  const [cuisinesOfCity, setCuisinesOfCity] = useState([])
 

  useEffect(() => {
    let mounted = true;
    console.log("In use effect");
    facade
      .fetchData(links.countries)
      .then((data) => {
        setAllCountries(data.map((c) => c));
        console.log(data);
        localStorage.setItem("countries", JSON.stringify(data));
      })

      .then(() => {
        if (mounted) {
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
  }, []);

  function filterCountries(e) {
    setCountryTarget(e.target);
    setSug([]);
    setOptions([]);

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
    if (e.target.value.length < 1) {
      setOptions(
        allCountries.map((s) => (
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
    setCitysOfCountry([]);
    setCountryTarget(e.target);
    if (countryInputTarget === null) {
      setCountryTarget(e.target);
    }
    setCityOptions([]);
    console.log(cityOptions);
    console.log(countryInputTarget);
  }
  function onClickCountry(e) {
    e.preventDefault();

    countryInputTarget.value = e.currentTarget.value;
    // countryInputTarget.disabled = true;

    setCountry({ country: e.currentTarget.value });
    setOptions([]);
    setCityOptions([]);
    setFetchCities(true);

    if (cityInputTarget !== null) {
      cityInputTarget.value = "";
    }
  }

  useEffect(() => {
    if (fetchCities) {
      let mounted = true;
      setShowCityInput(true);
      setLoadingCities(true);

      facade
        .fetchCities(chosenCountry)

        .then((data) => {
          let tmp = [];
          data.forEach((city) => {
            tmp.push(city);

            citiesOfCountry.push(city);
          });
          console.log("citiesOfCountry");
          console.log(citiesOfCountry);
        })
        .then(() => {
          if (mounted) {
            setLoadingCities(false);
            setFetchCities(false);
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

  function filterCities(e) {
    // setCityTarget(e.target);
    setSug([]);
    setCityOptions([]);
    setCityTarget(e.target);
    console.log("cityInputTarget:");
    console.log(cityInputTarget);

    const input = e.target.value;
    if (input.length > 0) {
      citiesOfCountry.forEach((c) => {
        if (c.name.toLowerCase().startsWith(input.toLowerCase())) {
          sugestions.push(c);

          setCityOptions(
            sugestions.map((s) => (
              <button
                className="tableContent"
                style={{ textAlign: "center", fontWeight: "bold" }}
                value={s.name}
                key={s.name}
                id={s.id}
                onClick={onClickCity}
              >
                {s.name}{" "}
              </button>
            ))
          );
        }
      });
    }
    setCityTarget(e.target);
  }

  function onClickCity(e) {
    const city_name = e.target.value;
    let ciity_id = -1;
    citiesOfCountry.forEach((element) => {
      if (element.name === city_name) {
        ciity_id = element.id;
      }
      console.log(ciity_id);
    });
    cityInputTarget.value = e.currentTarget.value;
    setChosenCity([ciity_id])
    setCityOptions([]);
    setFetchCityData(true)
  }

  function clickOnInputCity(e) {
    e.preventDefault();
    setCityOptions([]);

    setCityTarget(e.target);
    console.log(cityInputTarget);
    if (e.target.value.length === 0) {
      setCityOptions(
        citiesOfCountry.map((s) => (
          <button
            className="tableContent"
            style={{ textAlign: "center", fontWeight: "bold" }}
            value={s.name}
            key={s.name}
            onClick={onClickCity}
          >
            {s.name}
          </button>
        ))
      );
    }
    setCityDataOfCities([])
  }

  useEffect(() => {
    if (fetchCityData) {
      let mounted = true;
      setShowCityDataInput(true);
      setLoadingCityData(true);

      facade
        .fetchCityData(chosenCity)
        .then((data) => {
          let tmp = [];
          data.forEach((city) => {
            tmp.push(city);

            cityDataOfCities.push(city);
          });

        })
        .then(() => {
          if (mounted) {
            setLoadingCityData(false);
            setFetchCityData(false);
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
  }, [fetchCityData]);

  function filterCuisines(e) {

    setSug([])
    setCuisineInputTarget(e.target)
    setCuisines([])
    const input = e.target.value
    if(input.length>0) {
      cityDataOfCities.forEach((cd) => {
        if (cd.name.toLowerCase().startsWith(input.toLowerCase)) {
          sugestions.push(cd)

          setCuisines(
            sugestions.map((s) => (
              <button
                className="tableContent"
                style={{ textAlign: "center", fontWeight: "bold" }}
                value={s.name}
                key={s.name}
                id={s.id}
                onClick={onClickCuisine}
              >
                {s.name}{" "}
              </button>
            ))
          )
        }
      })
    }
    setCuisines(e.target)
  }

  function onClickCuisine(e) {
    cuisineInputTarget.value = e.currentTarget.value
    setCuisines([])
  }

  function clickOnInputCuisines(e) {
    e.preventDefault();
    setCuisines([]);
    setCuisineInputTarget(e.target);
    console.log(cuisineInputTarget);
    if (e.target.value.length === 0) {
      setCuisines(
        cuisineInputTarget.map((s) => (
          <button
            className="tableContent"
            style={{ textAlign: "center", fontWeight: "bold" }}
            value={s.name}
            key={s.name}
            onClick={onClickCuisine}
          >
            {s.name}
          </button>
        ))
      );
    }
    setCuisinesOfCity([])
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
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
          <button>XXX</button>
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
                        placeholder={"Country"}
                        onChange={filterCountries}
                        onClick={(e) => {
                          setCountryTarget(e.target);
                          if (countryInputTarget !== null) {
                            clickOnInputCountry(e);
                          }
                        }}
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
                                placeholder={"City"}
                                onChange={filterCities}
                                onClick={(e) => {
                                  setCityTarget(e.target);
                                  if (cityInputTarget !== null) {
                                    clickOnInputCity(e);
                                  }
                                }}
                              />
                              <div className="form-group"></div>
                              <ul
                                className="list-group"
                                style={{ listStyleType: "none" }}
                              >
                                {cityOptions}
                              </ul>
                            </>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      {showCityDataInput ? (
                        <>
                          {loadingCityData ? (
                            loader
                          ) : (
                            <>
                              <input
                                className="tableContent"
                                type="text"
                                id="city"
                                key="city"
                                placeholder={"City"}
                                onChange={filterCuisines}
                                onClick={(e) => {
                                  setCuisineInputTarget(e.target);
                                  if (cityInputTarget !== null) {
                                    clickOnInputCuisines(e);
                                  }
                                }}
                              />
                              <div className="form-group"></div>
                              <ul
                                className="list-group"
                                style={{ listStyleType: "none" }}
                              >
                                {cuisines}
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
