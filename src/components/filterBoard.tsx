import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "preact/compat";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "react-leaflet-geosearch/lib/react-leaflet-geosearch.css";

// export function Search() {
//   const provider = new OpenStreetMapProvider();

//   // @ts-ignore
//   const searchControl = new GeoSearchControl({
//     provider: provider,
//   });

//   const map = useMap();
//   useEffect(() => {
//     map.addControl(searchControl);

//     return () => map.removeControl(searchControl);
//   }, []);

//   return null;
// }

const Search = (props) => {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: props.provider,
      ...props,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [props]);

  return null;
};
export default Search;
