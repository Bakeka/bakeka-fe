import { Component } from "preact";
import { Map } from "preact-leaflet-ts";
import L from "leaflet";

type PMDrawCircleEvent = { layer: L.Circle & { pm: { enable: () => void } } };
type PMEditCircleEvent = { target: L.Circle };

interface Props {
  onSelectionCircleAdded: (latLang: L.LatLng, radius: number) => void;
  onSelectionCircleMoved: (latLang: L.LatLng, radius: number) => void;
  onSelectionCircleRemoved: () => void;
}

const CustomMap: Component.FC<Props> = (props) => {
  const {
    children,
    onSelectionCircleAdded: onCircleAdded,
    onSelectionCircleMoved: onCircleMoved,
    onSelectionCircleRemoved: onCircleRemoved,
    ...mapProps
  } = props;

  const leafletMapRef = Preact.useRef<Map>(null);

  preact.useEffect(() => {
    if (leafletMapRef.current) {
      const mapElement = leafletMapRef.current.leafletElement;

      (mapElement as any).pm.addControls({
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        editMode: false,
        dragMode: false,
        cutPolygon: false
      });

      (mapElement as any).pm.setGlobalOptions({ pmIgnore: false });

      mapElement.on("pm:create", (e) => {
        if (e.layer && e.layer.pm) {
          const circle = (e as unknown) as PMDrawCircleEvent;

          // enable editing of circle
          circle.layer.pm.enable();

          onCircleAdded(circle.layer.getLatLng(), circle.layer.getRadius());

          circle.layer.on("pm:edit", (e) => {
            const event = (e as unknown) as PMEditCircleEvent;
            onCircleMoved(event.target.getLatLng(), event.target.getRadius());
          });
        }
      });

      mapElement.on("pm:remove", () => {
        onCircleRemoved();
      });
    }
  });

  return (
    <Map ref={leafletMapRef}>
      {children}
    </Map>
  );
};

export default CustomMap;
