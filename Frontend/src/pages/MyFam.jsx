import React, { useRef, useState, useEffect, useCallback, use } from "react";
import FamCard from "../Components/FamCard";
import { useAuth } from "../context/AuthContext";
import { useGenerateUserMarker, useMap, useMapCircle, useNavigationControl, useGeofenceAlert } from "../hooks/MapHooks";
import { useSocket } from "../hooks/Sockethook";
import { Menu, X, MapPin } from "lucide-react";
import axios from "axios";

// 🔹 Debounce Function
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};


function MyFam() {
  const { user, userFamily } = useAuth();
  const mapContainer = useRef(null);
  const [usersData, setUsersData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const map = useMap(mapContainer);useNavigationControl(map); // Basic Map integration
  useSocket(setUsersData, user._id, user.familyId);
  useGenerateUserMarker(map, "#693ff2", usersData, userFamily);
  useMapCircle(map, selectedLocation, 1);
  useGeofenceAlert(map, usersData, userFamily, selectedLocation, 1);
  
  const handleAutocomplete = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }, 500),
    []
  );

  // 🔹 Handle input change and call debounce
  const handleSearchInputChange = (e) => {
    const query = e.target.value.trim();
    setSearchTerm(query);

    if (query.length > 0) {
      handleAutocomplete(query);
    } else {
      setSuggestions([]);
    }
  };

  // 🔹 Handle selecting a place from dropdown
  const handleLocationUpdate = (place) => {
    setSearchTerm(place.display_name);
    setSuggestions([]);
    setSelectedLocation({ lon: place.lon, lat: place.lat });

    if (map) {
      map.flyTo({ center: [place.lon, place.lat], zoom: 14 });
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const locationName = response.data.display_name;
          setSearchTerm(locationName);

          if (map) {
            map.flyTo({ center: [longitude, latitude], zoom: 14 });
            setSelectedLocation({ lon: longitude, lat: latitude });
          }
        } catch (error) {
          console.error("Error fetching current location name:", error);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Failed to get current location");
      }
    );
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-white">
      {/* Header */}
      <div className="text-center text-2xl font-semibold mb-4 relative">
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-white rounded-xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <div className="rounded-xl bg-white p-2">
              <X size={24} className="text-black" />
            </div>
          ) : (
            <div className="rounded-xl bg-white p-2">
              <Menu size={24} className="text-black" />
            </div>
          )}
        </button>
        MY FAMILY
      </div>

      {/* Main Container */}
      <div className="flex flex-1 rounded-2xl shadow-lg overflow-hidden gap-2 border-2">
        {/* Left Sidebar */}
        {isMenuOpen && (
          <div className="w-1/3 p-4 flex flex-col space-y-4 overflow-y-auto transition-all duration-500 border-r-2 rounded-xl resize-x">
            {/* Family Members List (Draggable Sidebar) */}
            <div className="overflow-y-auto flex-1">
              {userFamily.length > 0 ? (
                userFamily.map((member) => <FamCard key={member._id} member={member} />)
              ) : (
                <p>No family members found.</p>
              )}
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="flex-1 bg-white rounded-2xl relative transition-all duration-500">
          {/* 🔹 Floating Search Box + Current Location Button */}
          <div className="absolute top-4 right-4 bg-white p-3 shadow-lg rounded-lg w-72 flex items-center space-x-2 z-10">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Search location..."
            />
            {/* 📍 Current Location Button */}
            <button onClick={handleCurrentLocation} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <MapPin size={20} />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-16 right-4 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-auto w-72 z-20">
              {suggestions.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => handleLocationUpdate(place)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}

          {/* Map Container */}
          <div ref={mapContainer} className="h-full w-full rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export default MyFam;
