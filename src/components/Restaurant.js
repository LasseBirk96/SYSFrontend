import r1 from "../img/restImg/1.jpg";
import r2 from "../img/restImg/2.jpg";
import r3 from "../img/restImg/3.jpg";
import r4 from "../img/restImg/4.jpg";
import r5 from "../img/restImg/5.jpg";
import r6 from "../img/restImg/6.jpg";
import r7 from "../img/restImg/7.jpg";
import r8 from "../img/restImg/8.jpg";
import r9 from "../img/restImg/9.jpg";
import r10 from "../img/restImg/10.jpg";
import r11 from "../img/restImg/11.jpg";
import r12 from "../img/restImg/12.jpg";
import r13 from "../img/restImg/13.jpg";
import r14 from "../img/restImg/14.jpg";
import r15 from "../img/restImg/15.jpg";
import r16 from "../img/restImg/16.jpg";
import r17 from "../img/restImg/17.jpg";
import r18 from "../img/restImg/18.jpg";
import r19 from "../img/restImg/19.jpg";
import r20 from "../img/restImg/20.jpg";
import r21 from "../img/restImg/21.jpg";
import r22 from "../img/restImg/22.jpg";
import r23 from "../img/restImg/23.jpg";
import r24 from "../img/restImg/24.jpg";
import r25 from "../img/restImg/25.jpg";
import r26 from "../img/restImg/26.jpg";
import r27 from "../img/restImg/27.jpg";
import r28 from "../img/restImg/28.jpg";
import r29 from "../img/restImg/29.jpg";
import r30 from "../img/restImg/30.jpg";
import r31 from "../img/restImg/31.jpg";
import GoogleMap from "./googleMap";
// Very hard coded, but <img src={require(`../img/restImg/1.jpg`)} /> did not work
export default function Restaurant({ restaurant, imgId }) {
  const imgArr = [
    r1,
    r2,
    r3,
    r4,
    r5,
    r6,
    r7,
    r8,
    r9,
    r10,
    r11,
    r12,
    r13,
    r14,
    r15,
    r16,
    r17,
    r18,
    r19,
    r20,
    r21,
    r22,
    r23,
    r24,
    r25,
    r26,
    r27,
    r28,
    r29,
    r30,
    r31,
  ];
  const loader = <div className="loader"></div>;
  const lat = parseFloat(restaurant.location.latitude);
  const lon = parseFloat(restaurant.location.longitude);
  const locationn = { lat: lat, lng: lon };
  const init = {
    id: "16780467",
    name: "Veselka",
    location: {
      address: "144 2nd Avenue 12",
      city: "New York City",
      latitude: "40.7287300000",
      longitude: "-73.9870800000",
      zipcode: "10003",
    },
  };
  return (
    <div className="col-xl-12 col-xl-6">
      <img src={imgArr[imgId - 1]} style={{ maxWidth: 250 }} />
      <div
        className="col-xl-12"
        style={{
          textAlign: "left",
          color: "rgb(240, 20, 110",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 30,
        }}
      >
        {restaurant.name}
      </div>
      <div
        className="col-xl-12"
        style={{
          textAlign: "left",
          color: "rgb(140, 110, 140",
          fontWeight: "400",
          textAlign: "center",
          
        }}
      >
        {restaurant.location.address}
      </div>
      <div
        className="col-xl-12"
        style={{
          textAlign: "left",
          color: "rgb(140, 110, 140",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {restaurant.location.city}, {restaurant.location.zipcode}
      </div>

      <GoogleMap
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
        }}
        onUnmount={(map) => {
          // do your stuff before map is unmounted
        }}
        loc={locationn}
      />
    </div>
  );
}
