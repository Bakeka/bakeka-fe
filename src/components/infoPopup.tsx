import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function InfoPopup(props: any) {
  return (
    <Popup minWidth={90}>
      <ul>
        <li>Type: {props.type}</li>
        <li>Material: {props.material}</li>
        <li>Size: {props.size}</li>
        <li>Accessibility: {props.accessibility}</li>
        <li>Flow: {props.flow}</li>
      </ul>
    </Popup>
  );
}
