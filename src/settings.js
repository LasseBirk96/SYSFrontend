function URL() {
  return {
    server: "https://dgpcoding.com/SYS",
    otherServer: "https://jsonplaceholder.typicode.com/users/",
    airports: "/api/flight/allairports",
    flights: "/api/flight/findflights",
    saveTrip: "/api/flight/savetrip",
  };
}
const url = URL();
export default url;
