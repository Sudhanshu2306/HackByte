import { useEffect } from "react";
import { io } from "socket.io-client";
import { Backendurl } from "../../Private/backend";


const useSocket = (setUsersData, userId, familyId) => {
  let interval;
  useEffect(() => {
    const socket = io(`${Backendurl}`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("joinFamily", { userId, familyId });
    });

    // Listen for updated users data and replace the entire usersData array
    socket.on("usersData", (updatedUsersData) => {
      // console.log("Received full updated usersData:", updatedUsersData);
      setUsersData(updatedUsersData);updatedUsersData
    }); 

    // Send location updates every 5 seconds
    const sendLocationUpdate = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // console.log(`Sending latitude = ${latitude}, longitude = ${longitude}`);
            socket.emit("updateLocation", { userId, familyId, latitude, longitude });
          },
          (error) => console.error("Geolocation error:", error),
          { enableHighAccuracy: true }
        );
      }
    };

    interval = setInterval(sendLocationUpdate, 10000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [userId, familyId]);

  return interval;
};

export { useSocket };
