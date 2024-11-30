import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import Directions from "../components/Direction";

export default function TestPage() {
  const [routes, setRoutes] = useState([]);

  return (
    <div>
      <h1>길찾기</h1>
      {routes.map((route, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>
            {route.start.name} → {route.end.name}
          </h3>
          <div
            style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
          >
            <Map
              center={{ lat: route.start.lat, lng: route.start.lng }}
              style={{ width: "100%", height: "100%" }}
              level={3}
            >
              <Directions start={route.start} end={route.end} />
            </Map>
          </div>
        </div>
      ))}
    </div>
  );
}
