import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import serviceBranches from "../../assets/service-branches/service-branches.json";

// Default icon fix for leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Fly map to a position programmatically
const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 10, { duration: 1.5 });
  }, [position, map]);
  return null;
};

const Coverage = () => {
  const defaultPosition = [23.8103, 90.4125]; // Dhaka
  const [search, setSearch] = useState("");
  const [flyPosition, setFlyPosition] = useState(defaultPosition);
  const [activeDistrict, setActiveDistrict] = useState(null);

  // Refs to all markers
  const markerRefs = useRef([]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search) {
      setFlyPosition(defaultPosition);
      setActiveDistrict(null);
      return;
    }

    const district = serviceBranches.find(
      (d) => d.district.toLowerCase() === search.toLowerCase()
    );

    if (district) {
      setFlyPosition([district.latitude, district.longitude]);
      setActiveDistrict(district.district); // Track which popup to open
    } else {
      alert("District not found!");
    }
  };

  // Open popup when activeDistrict changes
  useEffect(() => {
    if (!activeDistrict) return;

    const marker = markerRefs.current.find(
      (m) => m?.options?.district === activeDistrict
    );
    if (marker) marker.openPopup();
  }, [activeDistrict]);

  return (
    <div>
      <form onSubmit={handleSearch} className="p-4 flex justify-center gap-2">
        <input
          type="text"
          placeholder="Search District"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input focus-within:outline-0"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-[500px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToLocation position={flyPosition} />

        {serviceBranches.map((district, index) => (
          <Marker
            key={index}
            position={[district.latitude, district.longitude]}
            ref={(el) => {
              if (el) {
                el.options.district = district.district; // attach name for reference
                markerRefs.current[index] = el;
              }
            }}
          >
            <Popup>
              <strong>Region:</strong> {district.region} <br />
              <strong>District:</strong> {district.district} <br />
              <strong>Covered Areas:</strong>{" "}
              {district.covered_area.join(", ")} <br />
              <img
                src={district.flowchart}
                alt="Flowchart"
                className="w-32 mt-2"
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
