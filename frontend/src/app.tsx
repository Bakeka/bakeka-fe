import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "./index.css";
import "leaflet/dist/leaflet.css";
import {useCallback, useMemo, useRef, useState} from "preact/compat"

const defaultPosition = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13
};

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(defaultPosition)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}



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

