import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from "react-leaflet";
import type { Location } from "../data/locations";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function makeIcon(color: string) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

const greenIcon = makeIcon("green");
const redIcon = makeIcon("red");
const blueIcon = makeIcon("blue");

interface TravelMapProps {
  locations: Location[];
}

/**
 * Build a path that takes the short way around the globe between consecutive
 * points. When the longitude gap is > 180° we offset by ±360 so the line
 * goes west over the Pacific instead of east.
 */
function buildPath(sorted: Location[]): [number, number][] {
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

/**
 * Shift the path so it stays visible in the current view. The first point
 * is snapped to the nearest copy of the map center, then each subsequent
 * point is kept within 180° of the previous one. This keeps the entire
 * chain together on one world copy instead of splitting across two.
 */
function shiftToView(
  path: [number, number][],
  centerLng: number
): [number, number][] {
  if (path.length === 0) return [];
  let [lat0, lng0] = path[0];
  while (lng0 < centerLng - 180) lng0 += 360;
  while (lng0 > centerLng + 180) lng0 -= 360;

  const result: [number, number][] = [[lat0, lng0]];
  let prevLng = lng0;

  for (let i = 1; i < path.length; i++) {
    let lng = path[i][1];
    const diff = lng - prevLng;
    // Keep within 180° of previous point to preserve the chain
    if (diff > 180) lng -= 360;
    else if (diff < -180) lng += 360;
    // If still far, do another pass (e.g., crossing from -400 range)
    while (lng < prevLng - 180) lng += 360;
    while (lng > prevLng + 180) lng -= 360;
    result.push([path[i][0], lng]);
    prevLng = lng;
  }
  return result;
}

function MapContent({ sorted }: { sorted: Location[] }) {
  const basePath = buildPath(sorted);
  const [centerLng, setCenterLng] = useState(
    sorted.length > 0 ? sorted[0].lng : 0
  );

  useMapEvents({
    moveend(e) {
      setCenterLng(e.target.getCenter().lng);
    },
  });

  const path = shiftToView(basePath, centerLng);

  return (
    <>
      {path.length > 1 && (
        <Polyline positions={path} color="#e74c3c" weight={2} dashArray="8" />
      )}
      {sorted.map((loc, i) => (
        <Marker
          key={i}
          position={path[i]}
          icon={i === 0 ? greenIcon : i === sorted.length - 1 ? redIcon : blueIcon}
        >
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
    </>
  );
}

export default function TravelMap({ locations }: TravelMapProps) {
  const sorted = [...locations].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

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
      <MapContent sorted={sorted} />
    </MapContainer>
  );
}
