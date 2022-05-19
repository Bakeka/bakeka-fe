import { Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";

const defaultPosition = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13
};

export function InfoPopup() {

  let boardType = "tipo_bacheca"

  return (
    <Popup>
      <h1>TITOLO</h1>
      <span>Board Type: {boardType}</span>

    </Popup>
  );
}