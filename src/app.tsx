import { MapContainer, TileLayer } from "react-leaflet"
import "./index.css";
import "leaflet/dist/leaflet.css";
import { DraggableMarker } from "./Components/infoPopup";

const defaultPosition = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13
};





export function App() {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={defaultPosition.zoom}
    >
      <TileLayer  
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <DraggableMarker />
    </MapContainer>
  );
}

