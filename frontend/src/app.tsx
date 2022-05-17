import { TileLayer } from "preact-leaflet-ts"
import CustomMap from './customMap';

import "./index.css";
import "leaflet/dist/leaflet.css";

const defaultPosition = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13
};

export function App() {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

  const onSelectionCircleAdded = () => console.log("circle added");
  const onSelectionCircleMoved = () => console.log("circle moved");
  const onSelectionCircleRemoved = () => console.log("circle removed");

  return (
    <CustomMap
      className="map"
      center={position}
      zoom={defaultPosition.zoom}
      onSelectionCircleAdded={onSelectionCircleAdded}
      onSelectionCircleMoved={onSelectionCircleMoved}
      onSelectionCircleRemoved={onSelectionCircleRemoved}
    >
      <TileLayer  
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </CustomMap>
  );
}