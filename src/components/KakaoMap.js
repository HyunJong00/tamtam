import React, { useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import tamtam from "../assets/images/tamtam.svg";

function PolylineComponent({ positions }) {
  const map = useMap();

  useEffect(() => {
    const { kakao } = window;

    if (!map || positions.length < 2) return;

    const linePath = positions.map(
      (position) =>
        new kakao.maps.LatLng(position.latlng.lat, position.latlng.lng)
    );

    const polyline = new kakao.maps.Polyline({
      map,
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#FFAE00",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });

    return () => polyline.setMap(null); // 컴포넌트 언마운트 시 제거
  }, [map, positions]);

  return null;
}

function KakaoMap() {
  const positions = [
    {
      title: "카카오",
      latlng: { lat: 33.450705, lng: 126.570677 },
    },
    {
      title: "생태연못",
      latlng: { lat: 33.450936, lng: 126.569477 },
    },
    {
      title: "텃밭",
      latlng: { lat: 33.450879, lng: 126.56994 },
    },
    {
      title: "근린공원",
      latlng: { lat: 33.451393, lng: 126.570738 },
    },
  ];

  return (
    <Map
      center={{ lat: 33.450705, lng: 126.570677 }}
      style={{ width: "100%", height: "100%" }}
      level={3}
    >
      <PolylineComponent positions={positions} />

      {positions.map((position, index) => (
        <MapMarker
          key={`${position.title}-${index}`}
          position={position.latlng}
          image={{
            src: tamtam,
            size: {
              width: 24,
              height: 35,
            },
          }}
          title={position.title}
        >
          {/* index가 0일 때만 InfoWindow를 표시 */}
          {index === 0 && (
            <div style={{ padding: "5px", color: "#000" }}>
              {position.title}에서 여행을 시작하세요!
            </div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
}

export default KakaoMap;
