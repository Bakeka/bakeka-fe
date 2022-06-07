import { IconMapPin } from "@tabler/icons";
import { useState } from "preact/hooks";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { MarkerIcons } from "../constants/icons";
import { Board, Type } from "../entities";
import { filterBoards } from "../services/api";
import { FilterBoard } from "./filterBoards";
import { InfoPopup } from "./infoPopup";
import Search from "./searchButton";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";

const defaultPosition = {
  lat: 46.06734,
  lng: 11.14968,
  zoom: 19,
};

function MarkersLoader() {
  const [boards, setBoards] = useState([] as Board[]);

  const refreshBoards = () => {
    const bounds = map.getBounds().pad(0.3);
    filterBoards({
      box: [
        [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
        [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      ],
    }).then((result) => setBoards(result));
  };

  const map = useMapEvents({
    load: refreshBoards,
    moveend: refreshBoards,
  });

  return (
    <>
      {boards.map((b) => {
        return (
          <Marker
            position={b.location?.coordinates.reverse()}
            icon={MarkerIcons.get(b.type || Type.OTHER)}
          >
            <InfoPopup board={b} />
          </Marker>
        );
      })}
    </>
  );
}

export function Map() {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];
  const prov = new OpenStreetMapProvider();

  return (
    <MapContainer
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
      <Control position="topright">
        <button class="px-2 pt-2 bg-indigo-500 font-medium text-lg hover:bg-indigo-600 text-indigo-100 rounded-4xl">
          <IconMapPin />
        </button>
        <FilterBoard />
      </Control>
      <Search
        provider={prov}
        showMarker={true}
        showPopup={false}
        popupFormat={({ result }) => result.label}
        maxMarkers={3}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={false}
        searchLabel={"Enter address, please"}
        keepResult={true}
      />
      <MarkersLoader />
    </MapContainer>
  );
}
