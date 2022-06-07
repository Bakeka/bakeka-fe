import { IconMapPin } from "@tabler/icons";
import { Icon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import { Route } from "wouter-preact";
import Search from "./components/searchButton";
import { InfoPopup } from "./components/infoPopup";
import { NewBoard } from "./components/newBoard";
import { getBoard, getBoards } from "./services/api";
import { FilterBoard } from "./components/filterBoards";

const defaultPosition = {
  lat: 46.06734,
  lng: 11.14968,
  zoom: 19,
};

export interface board {
  lat: number;
  lng: number;
  type: string;
  size: string;
  accessibility: string;
  flow: string;
  material: string;
}

//const boardsCoordinates = getBoards({});

const boardsCoordinates: board[] = [
  {
    lat: 46.06734,
    lng: 11.14968,
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
  const prov = new OpenStreetMapProvider();

  console.log(getBoard("629e44064db6cf0df88bbbe0"));

  return (
    <>
      <Route path="/new">
        <NewBoard />
      </Route>
      <Route path="/">
        <MapContainer
          className="map"
          center={position}
          zoom={defaultPosition.zoom}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Control position="topright">
            <button
              class="px-2 pt-2 bg-indigo-500 font-medium text-lg hover:bg-indigo-600 text-indigo-100 rounded-4xl"
              onClick={() => FlyToUserLocation()}
            >
              <IconMapPin />
            </button>
          </Control>
          <Control position="bottomright">
            <FilterBoard />
          </Control>
          {boardsCoordinates.map((board) => (
            <Marker
              position={[board.lat, board.lng]}
              icon={getIcon(board.type)}
            >
              <InfoPopup
                type={board.type}
                material={board.material}
                size={board.size}
                accessibility={board.accessibility}
                flow={board.flow}
              />
            </Marker>
          ))}
          <Search
            provider={prov}
            showMarker={true}
            showPopup={false}
            popupFormat={({ query, result }) => result.label}
            maxMarkers={3}
            retainZoomLevel={false}
            animateZoom={true}
            autoClose={false}
            searchLabel={"Enter address, please"}
            keepResult={true}
          />
        </MapContainer>
      </Route>
    </>
  );
}

function getIcon(type: string): Icon | undefined {
  switch (type) {
    case "board1":
      return new Icon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fc0339&chf=a,s,ee00FFFF",
      });

    case "board2":
      return new Icon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3533ab&chf=a,s,ee00FFFF",
      });

    case "board3":
      return new Icon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e9f030&chf=a,s,ee00FFFF",
      });

    case "board4":
      return new Icon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
      });
  }

  return undefined;
}

function FlyToUserLocation() {
  //TODO: get the current position
}
