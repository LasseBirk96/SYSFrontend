import { useEffect, useState } from "react";
import facade from "../../apiFacade";
import links from "../../settings";
import "../../Css-files/flight.css";
import { getSuggestedQuery } from "@testing-library/react";
import Restaurant from "../Restaurant";

export default function RestauranSearcher({ addRestaurant }) {
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
  const [chosenCity, setChosenCity] = useState(null);
  const [showCityDataInput, setShowCityDataInput] = useState(false);
  const [loadingCityData, setLoadingCityData] = useState(false);
  const [cityDataOfCities, setCityDataOfCities] = useState([]);
  const [fetchCityData, setFetchCityData] = useState(false);
  const [cuisines, setCuisines] = useState([]);
  const [cuisineInputTarget, setCuisineTarget] = useState(null);
  const [cuisinesOfCity, setCuisinesOfCity] = useState([]);
  const [collections, setCollections] = useState([]);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [chosenCategries, setChosenCat] = useState([]);
  const [chosenCollections, setChosenColl] = useState([]);
  const [chosenCuisines, setChosenCuis] = useState([]);
  const [cityDataReady, setCityDataReady] = useState(false);
  const [startFetchRes, setStartFetchResta] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [restaurantRequest, setRestaurantRequest] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (!categories.length > 0) {
      setLoadingCategories(true);
      facade
        .fetchDataNOTOken(links.categories)
        .then((data) =>
          setCategories(
            data.map((e) => (
              <button
                className="tableContent"
                id={e.id}
                key={"cat:" + e.id}
                onClick={handleCategory}
                value={e.name}
              >
                {e.name}
              </button>
            ))
          )
        )
        .then(() => {
          if (mounted) {
            setLoadingCategories(false);
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => console.log(e.msg));
          } else {
            console.log(
              "Network error has occurred: could not load categories"
            );
          }
        });
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  function handleCategory(e) {
    e.preventDefault();

    let cat = e.target.id;

    let isOnList = false;
    let index;
    chosenCategries.forEach((c) => {
      if (c.id === cat) {
        isOnList = true;
        index = chosenCategries.indexOf(c);
      }
    });
    isOnList
      ? (e.currentTarget.style.background = "white")
      : (e.currentTarget.style.background = "rgb(233, 163, 0)");
    isOnList
      ? chosenCategries.splice(index, 1)
      : chosenCategries.push({ id: cat, name: e.target.value });
    setChosenCat(chosenCategries);
  }

  function handleColection(e) {
    e.preventDefault();
    let col = e.currentTarget.id;

    let isOnList = false;
    let index;
    chosenCollections.forEach((c) => {
      if (c.id === col) {
        isOnList = true;
        index = chosenCollections.indexOf(c);
      }
    });
    isOnList
      ? (e.currentTarget.style.background = "white")
      : (e.currentTarget.style.background = "rgb(233, 163, 0)");
    isOnList
      ? chosenCollections.splice(index, 1)
      : chosenCollections.push({ id: col, name: e.target.value });
    setChosenColl(chosenCollections);
  }

  function handleCuisine(e) {
    e.preventDefault();
    let cui = e.target.id;

    let isOnList = false;
    let index;
    chosenCuisines.forEach((c) => {
      if (c.id === cui) {
        isOnList = true;
        index = chosenCuisines.indexOf(c);
      }
    });
    isOnList
      ? (e.currentTarget.style.background = "white")
      : (e.currentTarget.style.background = "rgb(233, 163, 0)");
    isOnList
      ? chosenCuisines.splice(index, 1)
      : chosenCuisines.push({ id: cui, name: e.target.value });

    setChosenCuis(chosenCuisines);
  }

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
    setSug([]);
    setCityOptions([]);
    setCityTarget(e.target);
    setCityDataReady(false);

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
    setChosenCity(ciity_id);
    setCityOptions([]);
    setFetchCityData(true);
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
  }

  function searchRestaurants(e) {
    e.preventDefault();
    console.log("should find restaurants for options:");
    const collArr = [];
    const catArr = [];
    const cuisArr = [];
    chosenCategries.forEach((c) => catArr.push(parseInt(c.id)));
    chosenCollections.forEach((c) => collArr.push(parseInt(c.id)));

    chosenCuisines.forEach((c) => cuisArr.push(parseInt(c.id)));
    setRestaurantRequest({
      city_id: chosenCity,
      collections: collArr,
      cuisines: cuisArr,
      categories: catArr,
    });
    console.log(restaurantRequest);
    setLoadingRestaurants(true);
    setStartFetchResta(true);
  }
  var countId = 1;
  function getImgID() {
    if (countId === 32) {
      countId = 1;
    }
    const tmp = countId;
    countId++;
    return tmp;
  }
  useEffect(() => {
    let mounted = true;

    if (startFetchRes) {
      facade
        .searchRestaurants(restaurantRequest)
        .then((data) => {
          console.log(data);
          data.forEach((r) => {
            allRestaurants.push(
              <div className="col-md-12 col-xl-4">
                <div className="row">
                  {" "}
                  <div className="tripElement" key="resList">
                    <Restaurant id={r.id} restaurant={r} imgId={getImgID()} />
                  </div>
                </div>
                <div className="row">
                  <button
                    id={"buttres" + r.id}
                    className="tripElement"
                    style={{ marginTop: -12 }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(r);
                      addRestaurant(r);
                    }}
                  >
                    add to Trip
                  </button>
                </div>
              </div>
            );
            setAllRestaurants(allRestaurants);
          });
        })
        .then(() => {
          if (mounted) {
            setLoadingRestaurants(false);
            setStartFetchResta(false);
          }
        })

        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => console.log(e.message));
          } else {
            console.log("Network error! Could not load restaurant");
          }
        });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [restaurantRequest]);

  useEffect(() => {
    if (fetchCityData) {
      let mounted = true;
      setShowCityDataInput(true);
      setLoadingCityData(true);

      facade
        .fetchCityData({ city_id: chosenCity })

        .then((data) => {
          const tmpCol = data.collections.map((col) => (
            <button
              className="tableContent"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              id={col.collection_id}
              key={"col:" + col.collection_id}
              onClick={handleColection}
              value={col.title}
            >
              {col.title}
            </button>
          ));
          const tmpCui = data.cuisines.map((cui) => (
            <button
              className="tableContent"
              id={cui.cuisine_id}
              key={"cat:" + cui.cuisine_id}
              onClick={handleCuisine}
              value={cui.cuisine_name}
            >
              {cui.cuisine_name}
            </button>
          ));

          setCollections(tmpCol);
          setCuisines(tmpCui);
        })
        .then(() => {
          if (mounted) {
            setFetchCityData(false);
            setLoadingCityData(false);
            setCityDataReady(true);
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => console.log(e.message));
          } else {
            console.log("Network error! Could not load cityData");
          }
        });
      return function cleanup() {
        mounted = false;
      };
    } else {
    }
  }, [fetchCityData]);

  const [allRestaurants, setAllRestaurants] = useState([]);
  const restaurantsContainer = (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-xl-2" style={{ color: "white" }}></div>
        <div className="col-md-12 col-xl-8">
          <div className="row">
            {loadingRestaurants ? (
              loader
            ) : allRestaurants.length > 0 ? (
              allRestaurants
            ) : (
              <span style={{ color: "yellow", textAlign: "center" }}>
                No restaurants found{" "}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-12 col-xl-2"> </div>
      </div>
    </div>
  );

  const searcher = (
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        {loadingCategories ? (
          loader
        ) : cityDataReady ? (
          <div className="col-xl-12" style={{ padding: 15 }}>
            <div className="resultFlight">
              <div className="row">
                <div className="col" style={{ color: "white" }}>
                  Choos category
                </div>
              </div>
              <div className="row">{categories}</div>
            </div>
            <div className="col-xl-12" style={{ padding: 15 }}>
              <button
                className="tripElement"
                style={{
                  color: "rgb(0, 217, 255)",
                  fontWeight: "bold",
                  backgroundColor: "#150327",
                  marginLeft: "20%",
                }}
                onClick={searchRestaurants}
              >
                <div className="logo">SEARCH</div>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {loadingCityData ? (
          loader
        ) : (
          <>
            <div className="col-md-12 col-xl-6">
              <div className="resultFlight">
                <div className="row">
                  <div className="col" style={{ color: "white" }}>
                    Choos cuisine
                  </div>
                </div>
                <div className="row">{cuisines}</div>
              </div>
            </div>
            <div className="col-md-12 col-xl-6">
              <div className="resultFlight">
                <div className="row">
                  <div className="col" style={{ color: "white" }}>
                    Choos collection
                  </div>
                </div>
                <div className="row">{collections}</div>
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
  return restaurantRequest === null ? searcher : restaurantsContainer;
}
