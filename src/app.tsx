import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { InfoPopup } from "./Components/infoPopup";
import { Icon } from "leaflet";

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

const LeafIcon = Icon.extend({
  options: {},
});

export function App() {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

  return (
    <MapContainer className="map" center={position} zoom={defaultPosition.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {boardsCoordinates.map((board) => (
        <Marker position={[board.lat, board.lng]} icon={getIcon(board.type)}>
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

function getIcon(type: string) {
  if (type === "board1") {
    return new Icon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fc0339&chf=a,s,ee00FFFF",
    });
  }

  if (type === "board2") {
    return new Icon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3533ab&chf=a,s,ee00FFFF",
    });
  }

  if (type === "board3") {
    return new Icon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e9f030&chf=a,s,ee00FFFF",
    });
  }

  if (type === "board4") {
    return new Icon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
    });
  }
}
