import { IconMapPin } from "@tabler/icons";
import { useEffect, useState } from "preact/hooks";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { ButtonIcons, MarkerIcons } from "../constants/icons";
import { Board, Filter, Numbers, Type } from "../entities";
import { filterBoards, getNumbers } from "../services/api";
import { toTitleCase } from "../utils";
import { FilterBoard } from "./filterBoards";
import { InfoPopup } from "./infoPopup";
import { Search } from "./searchControl";

const defaultPosition = {
  lat: 46.06734,
  lng: 11.14968,
  zoom: 17,
};

function MarkersLoader(props: { filter: Filter }) {
  const [boards, setBoards] = useState([] as Board[]);

  const refreshBoards = () => {
    const bounds = map.getBounds().pad(0.3);
    filterBoards({
      ...props.filter,
      box: [
        [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
        [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      ],
    }).then((result) => setBoards(result));
  };

  const map = useMapEvents({
    load: refreshBoards,
    moveend: refreshBoards,
    zoomstart: refreshBoards,
  });

  useEffect(() => refreshBoards(), [props.filter])

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

export function LocateButton() {
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, 16)
    },
  })

  return <button
    class="px-2 pt-2 bg-light-50 font-medium text-lg hover:bg-light-200 text-dark-600 rounded-4xl"
    onClick={() => map.locate()}
  >
    <IconMapPin />
  </button>
}

export function Map() {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

  const [filter, setFilter] = useState({} as Filter)

  const [numbers, setNumbers] = useState({} as Numbers)

  useEffect(() => {
    getNumbers().then(result => setNumbers(result))
  }, [])

  const handleCheckbox = (patch: Partial<Board>) => {
    const [key, value] = Object.entries(patch)[0]
    if (filter[key] && filter[key].includes(value)) {
      filter[key] = filter[key].filter(v => v !== value)
      if (filter[key].length === 0) delete filter[key]
    } else {
      if (!filter[key]) filter[key] = []
      filter[key].push(value)
    }

    setFilter(filter)
  }

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={defaultPosition.zoom}
      minZoom={3}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />

      <Control position="topleft">
        <LocateButton />
      </Control>

      <Control position="bottomleft">
        <div className="bg-light-50 shadow-xl m-2 p-4 rounded-2xl grid grid-cols-3 grid-rows-2 gap-4 justify-items-start">
          {Object.entries(numbers).map(pair => {
            const Icon = ButtonIcons.get(pair[0])
            return <>
              <Icon className="w-full self-center" />
              <span className="self-center font-bold">{toTitleCase(pair[0])}</span>
              <span className="self-center">{pair[1]}</span>
            </>
          })}
        </div>
      </Control>

      <Control position="topright">
        <FilterBoard onChange={handleCheckbox} />
      </Control>

      <Search
        animateZoom={true}
        zoomLevel={9}
        showMarker={false} />

      <MarkersLoader filter={filter} />
    </MapContainer>
  );
}
