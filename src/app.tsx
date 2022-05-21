import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { InfoPopup } from "./Components/infoPopup";

const defaultPosition = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
};

const boardsCoordinates = [
  {
    lat: 51.505,
    lng: -0.09,
    type: "board1",
    size: "small",
    accessibility: "3",
    flow: "5",
    material: "metal",
  },
  {
    lat: 52.505,
    lng: -1.09,
    type: "board2",
    size: "big",
    accessibility: "5",
    flow: "1",
    material: "wood",
  },
  {
    lat: 49.505,
    lng: 2.09,
    type: "board3",
    size: "medium",
    accessibility: "1",
    flow: "2",
    material: "wood",
  },
  {
    lat: 37.505,
    lng: 5.09,
    type: "board4",
    size: "giant",
    accessibility: "2",
    flow: "3",
    material: "glass",
  },
];

export function App() {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

  return (
    <MapContainer className="map" center={position} zoom={defaultPosition.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {boardsCoordinates.map((board) => (
        <Marker position={[board.lat, board.lng]}>
          <InfoPopup
            type={board.type}
            material={board.material}
            size={board.size}
            accessibility={board.accessibility}
            flow={board.flow}
          />
        </Marker>
      ))}
    </MapContainer>
  );
}
