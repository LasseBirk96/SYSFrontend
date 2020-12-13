function URL() {
  return {
    server: "https://dgpcoding.com/SYS",
    otherServer: "https://jsonplaceholder.typicode.com/users/",
    airports: "/api/flight/allairports",
    flights: "/api/flight/findflights",
    saveTrip: "/api/flight/savetrip",
    countries: "/api/zomato/countries",
    restaurant: "/api/zomato/search",
    cities: "/api/zomato/citylist",
    flightsets: "/api/flight/flightset",
  };
}
const url = URL();
export default url;
