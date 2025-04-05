import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Map as MapLibreMap, NavigationControl, GeolocateControl, Marker, Popup } from 'maplibre-gl';
import * as turf from '@turf/turf';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from "axios";
import { Backendurl } from '../../Private/backend';

const useMap = (mapContainer) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map || !mapContainer?.current) return;

    const newMap = new MapLibreMap({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm-layer",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [78.9629, 22.5937], // Center on India
      zoom: 4,
      minZoom: 2, // Prevent excessive zooming out
      maxZoom: 18, // Prevent white screen issue
      maxBounds: [
        [60, 5], // Southwest bounds (approximate India coverage)
        [100, 40], // Northeast bounds
      ],
    });

    // Enforce zoom limits
    newMap.on("zoomend", () => {
      if (newMap.getZoom() > 18) {
        newMap.setZoom(18);
      }
      if (newMap.getZoom() < 1) {
        newMap.setZoom(1);
      }
    });

    setMap(newMap);

    return () => {
      newMap.off("zoomend"); // Cleanup event listener
      newMap.remove(); // Destroy map instance
    };
  }, []);

  return useMemo(() => map, [map]);
};

const useGeolocateControl = (map) => {
  useEffect(() => {
    if (!map) return;
    const geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showAccuracyCircle: true,
    });
    map.addControl(geolocate);

    map.on("load", () => {
      geolocate.trigger();
    });
  }, [map]);
  return true;
};

const useNavigationControl = (map) => {
  useEffect(() => {
    if (!map) return;
    map.addControl(new NavigationControl({ visualizePitch: false, showCompass: true }), "bottom-left");
  }, [map]);
  return 1;
};

const useGenerateUserMarker = (map, color, usersData, userFamily) => {
  useEffect(() => {
    if (!map || !usersData || !userFamily) {
      console.error("Please Upload all userData || userFamily error at useGenerateUserMarker");
      return;
    }

    const commonMembers = usersData.filter(user =>
      userFamily.some(member => member._id === user.userId)
    );

    const markers = [];
    // const bounds = new LngLatBounds();

    commonMembers.forEach((userData) => {
      const familyMember = userFamily.find(member => member._id === userData.userId);
      if (!familyMember) return;

      // console.log("Family member are", familyMember);

      const popup = new Popup({ closeButton: false, closeOnClick: false })
        .setHTML(
          `<div class="flex flex-col items-center bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl p-4 w-40 transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
  
          <div class="w-16 h-16 rounded-full overflow-hidden border-1 border-black shadow-md">
            <img src="${familyMember.avatar || 'default-avatar.png'}" alt="Avatar" class="w-full h-full object-cover">
          </div>
        
         
          <div class="mt-1 text-center">
            <h3 class="text-lg font-semibold text-gray-900 tracking-wide">${familyMember.name}</h3>
            <span class="bg-black text-white text-xs font-medium px-4 py-1 rounded-full mt-1 inline-block shadow-md">
              ${familyMember.role}
            </span>
            <p class="text-sm text-gray-700 mt-1 font-medium">Age: <span class="text-gray-900 font-semibold">${familyMember.age}</span></p>
            <p class="text-xs text-gray-600 italic">📍 Location: (${userData.latitude}, ${userData.longitude})</p>
          </div>
          </div>`
        );

      const marker = new Marker({ color })
        .setLngLat([userData.longitude, userData.latitude])
        .addTo(map);

      marker.getElement().addEventListener("mouseover", () => {
        marker.setPopup(popup).togglePopup();
      });

      marker.getElement().addEventListener("mouseout", () => {
        marker.getPopup().remove();
      });

      // bounds.extend([userData.longitude, userData.latitude]);
      markers.push(marker);
    });

    // Adjust the map to fit all markers
    // if (commonMembers.length > 0) {
    //   map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 1000 });
    // }

    // console.log("Bounds:", bounds);

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [map, usersData, userFamily]);
};

const useMapCircle = (map, initialCenter, initialRadiusKm) => {
  // Function to update circle dynamically
  const updateCircle = useCallback((initialCenter, radiusKm) => {
    if (!map) return;

    const center = [initialCenter.lon, initialCenter.lat];
    const options = { steps: 64, units: "kilometers" };
    const circle = turf.circle(center, radiusKm, options);

    if (map.getSource("location-radius")) {
      map.getSource("location-radius").setData(circle);
    } else {
      map.addSource("location-radius", {
        type: "geojson",
        data: circle,
      });

      map.addLayer({
        id: "location-radius",
        type: "fill",
        source: "location-radius",
        paint: {
          "fill-color": "#8CCFFF",
          "fill-opacity": 0.5,
        },
      });

      map.addLayer({
        id: "location-radius-outline",
        type: "line",
        source: "location-radius",
        paint: {
          "line-color": "#0094ff",
          "line-width": 3,
        },
      });
    }
  }, [map]);

  // Initialize the circle when the component mounts
  useEffect(() => {
    if (!map || initialCenter === null) return;
    if (!map.isStyleLoaded()) {
      map.once("styledata", () => updateCircle(initialCenter, initialRadiusKm));
    } else {
      updateCircle(initialCenter, initialRadiusKm);
    }

    return () => {
      if (map.getLayer("location-radius")) map.removeLayer("location-radius");
      if (map.getLayer("location-radius-outline")) map.removeLayer("location-radius-outline");
      if (map.getSource("location-radius")) map.removeSource("location-radius");
    };
  }, [map, initialCenter, initialRadiusKm, updateCircle]);

  return { update: updateCircle };
};

const useGeofenceAlert = (map, usersData, userFamily, center, radiusKm) => {
  useEffect(() => {
    if (!map || !center || !usersData || !userFamily) return;

    const circle = turf.circle([center.lon, center.lat], radiusKm, { units: "kilometers" });

    usersData.forEach(async (userData) => {
      const point = turf.point([userData.longitude, userData.latitude]);
      const isInside = turf.booleanPointInPolygon(point, circle);

      if (!isInside) {
        const member = userFamily.find((m) => m._id === userData.userId);
        if (member) {
          console.log("Sending notification for familyId:", member.familyId);
          console.log("Message:", `${member.name} is outside the safe zone.`);

          try {
            const notificationPayload = {
              notification: {
                title: "Geofence Alert",
                body: `${member.name} is outside the safe zone.`,
              },
              data: {
                familyId: member.familyId,
                userId: member._id,
              },
              to: `/topics/${member.familyId}`, // Assuming familyId is used as the topic
            };

            const response = await axios.post("https://fcm.googleapis.com/fcm/send", notificationPayload, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `1009162222089`, // Replace with your Firebase server key
              },
            });

            console.log("Firebase notification response:", response.data);
          } catch (err) {
            console.error("Firebase notification failed:", err);
          }
        }
      }
    });
  }, [map, usersData, userFamily, center, radiusKm]);
};

export { useMap, useGeolocateControl, useNavigationControl, useGenerateUserMarker, useMapCircle, useGeofenceAlert };