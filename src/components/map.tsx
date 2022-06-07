import { useState } from "preact/hooks";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { MarkerIcons } from "../constants/icons";
import { Board, Type } from "../entities";
import { filterBoards } from "../services/api";
import { InfoPopup } from "./infoPopup";

const defaultPosition = {
  lat: 46.06734,
  lng: 11.14968,
  zoom: 19,
};

function MarkersLoader() {
  const [boards, setBoards] = useState([] as Board[])

  const refreshBoards = () => {
    const bounds = map.getBounds().pad(0.3)
    filterBoards({
      box: [
        [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
        [bounds.getSouthWest().lng, bounds.getSouthWest().lat]
      ]
    }).then(result => setBoards(result))
  }

  const map = useMapEvents({
    load: refreshBoards,
    moveend: refreshBoards,
  })

  return <>
    {boards.map(b => {
      return <Marker
        position={b.location?.coordinates.reverse()}
        icon={MarkerIcons.get(b.type || Type.OTHER)}
      >
        <InfoPopup board={b} />
      </Marker>
    })}
  </>
}

export function Map() {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

  return <MapContainer
    className="map"
    center={position}
    zoom={defaultPosition.zoom}
    minZoom={3}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      noWrap={true}
    />

    <MarkersLoader />
  </MapContainer>
}
