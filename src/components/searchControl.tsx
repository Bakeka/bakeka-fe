import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/assets/css/leaflet.css";
import { SearchControlOptions } from "leaflet-geosearch/dist/SearchControl";
import { useEffect } from "preact/hooks";
import { useMap } from "react-leaflet";

export function Search(props?: Partial<SearchControlOptions> | {}) {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    ...props,
    // retainZoomLevel: true,
    provider: provider,
    style: "bar"
  } as SearchControlOptions);

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};
