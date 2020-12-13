import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "250px",
  height: "250px",
};

function MyComponent({ loc }) {
  const [map, setMap] = React.useState(null);
  // uses in stead of loc because it does not load wit loc
  const center = {
    lat: 55.62905,
    lng: 12.647601,
  };
  const center3 = {
    lat: loc.lat,
    lng: loc.lng,
  };
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
    console.log("In onUnmonted");
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyA_TFT5QOQG_5Yooe70UBkzIayXBaNkT0c">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center3}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}

        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
