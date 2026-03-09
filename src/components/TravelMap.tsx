import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import type { Location } from "../data/locations";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons — Vite can't resolve the built-in Leaflet image
// imports, so we point at the unpkg CDN copies instead.
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface TravelMapProps {
  locations: Location[];
}

/**
 * Build a path that goes the short way around the globe between consecutive
 * points. When the longitude gap is > 180° we offset the target longitude
 * by ±360 so Leaflet draws westward over the Pacific instead of eastward
 * across the Atlantic.
 */
function buildPath(
  sorted: Location[]
): [number, number][] {
  if (sorted.length === 0) return [];
  const path: [number, number][] = [[sorted[0].lat, sorted[0].lng]];
  let prevLng = sorted[0].lng;

  for (let i = 1; i < sorted.length; i++) {
    let lng = sorted[i].lng;
    const diff = lng - prevLng;
    if (diff > 180) lng -= 360;
    else if (diff < -180) lng += 360;
    path.push([sorted[i].lat, lng]);
    prevLng = lng;
  }
  return path;
}

export default function TravelMap({ locations }: TravelMapProps) {
  const sorted = [...locations].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const path = buildPath(sorted);

  const center =
    sorted.length > 0
      ? ([sorted[0].lat, sorted[0].lng] as [number, number])
      : ([20, 0] as [number, number]);

  return (
    <MapContainer
      center={center}
      zoom={3}
      worldCopyJump
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {path.length > 1 && (
        <Polyline positions={path} color="#e74c3c" weight={2} dashArray="8" />
      )}
      {sorted.map((loc, i) => (
        <Marker key={i} position={path[i]} icon={defaultIcon}>
          <Popup>
            <strong>{loc.name}</strong>
            <br />
            <em>{loc.date}</em>
            <br />
            {loc.description}
            {loc.blogUrl && (
              <>
                <br />
                <a href={loc.blogUrl} target="_blank" rel="noreferrer">
                  Read more
                </a>
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
