import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Board } from "../entities";

export function InfoPopup(props: { board: Board }) {
  return (
    <Popup minWidth={90}>
      <ul>
        <li>Type: {props.board.type}</li>
        <li>Material: {props.board.material}</li>
        <li>Size: {props.board.size}</li>
        <li>Accessibility: {props.board.accessibility}</li>
        <li>Traffic: {props.board.traffic}</li>
      </ul>
    </Popup>
  );
}
