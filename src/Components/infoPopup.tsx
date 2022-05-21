import { Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import {useCallback, useMemo, useRef, useState} from "preact/compat"

const defaultPosition = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13
};

export function DraggableMarker() {
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