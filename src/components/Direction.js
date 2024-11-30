// Directions.js
import { useEffect } from "react";
import { useMap } from "react-kakao-maps-sdk";

export default function Directions({ start, end }) {
  const map = useMap();

  useEffect(() => {
    const { kakao } = window;

    if (!map || !start || !end) return;

    // Kakao Directions 객체 생성
    const directionsService = new kakao.maps.services.Directions();
    const request = {
      origin: new kakao.maps.LatLng(start.lat, start.lng),
      destination: new kakao.maps.LatLng(end.lat, end.lng),
      travelMode: kakao.maps.services.Directions.TYPETRANSIT, // 대중교통 경로
    };

    // 경로 요청
    directionsService.route(request, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const routePath = result.routes[0].steps.map(
          (step) => new kakao.maps.LatLng(step.lat, step.lng)
        );

        // Polyline 추가
        const polyline = new kakao.maps.Polyline({
          map,
          path: routePath,
          strokeWeight: 5,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeStyle: "solid",
        });

        // 컴포넌트 언마운트 시 Polyline 제거
        return () => polyline.setMap(null);
      } else {
        console.error("경로 탐색 실패:", status);
      }
    });
  }, [map, start, end]);

  return null;
}
