import dotenv from "dotenv";
import { ConnectDB } from "./config/dbConfig.js";
import { app, port } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import LastLocation from "./models/LastLocation.js"; // Import LastLocation model

dotenv.config({ path: "./.env" });

const server = createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
      origin: [process.env.FRONTEND_URL],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
      credentials: true
  }
});


let families = {};

io.on("connection", (socket) => {
    // console.log(`New client connected: ${socket.id}`);

    // User joins a family room
    socket.on("joinFamily", async ({ userId, familyId }) => {
        socket.join(familyId);
        // console.log(`${userId} joined family ${familyId}`);

        if (!families[familyId]) {
            families[familyId] = {};
        }

        // Fetch last known location from the database
        const lastLocation = await LastLocation.findOne({ userId });

        families[familyId][userId] = {
            socketId: socket.id,
            latitude: lastLocation ? lastLocation.latitude : null,
            longitude: lastLocation ? lastLocation.longitude : null
        };

        // Send only the updated user's location **only to them**
        socket.emit("userLocation", {
            userId,
            latitude: families[familyId][userId].latitude,
            longitude: families[familyId][userId].longitude
        });
    });

    // Receive and process location updates
    socket.on("updateLocation", async ({ userId, familyId, latitude, longitude }) => {
        if (families[familyId] && families[familyId][userId]) {
            families[familyId][userId].latitude = latitude;
            families[familyId][userId].longitude = longitude;

            // console.log(`Location updated for ${userId} in Family ${familyId}: (${latitude}, ${longitude})`);

            // Send **only to the user who requested it**
            socket.emit("usersData", formatFamilyData(familyId));
        }
    });

    // Handle user disconnection
    socket.on("disconnect", async () => {
        // console.log(`Client disconnected: ${socket.id}`);

        Object.keys(families).forEach(async (familyId) => {
            Object.keys(families[familyId]).forEach(async (userId) => {
                if (families[familyId][userId].socketId === socket.id) {
                    // console.log(`Saving last location for ${userId} in Family ${familyId}`);

                    // Store last known location in MongoDB
                    const { latitude, longitude } = families[familyId][userId];
                    if (latitude !== null && longitude !== null) {
                        await LastLocation.findOneAndUpdate(
                            { userId },
                            { latitude, longitude, familyId, timestamp: new Date() },
                            { upsert: true }
                        );
                    }

                    delete families[familyId][userId];
                }
            });

            if (Object.keys(families[familyId]).length === 0) {
                delete families[familyId];
            }
        });
    });
});

// Helper function to format family data (returns **only the user who requested**)
const formatFamilyData = (familyId) => {
    return Object.entries(families[familyId] || {}).map(([userId, data]) => ({
        userId,
        latitude: data.latitude,
        longitude: data.longitude
    }));
};

// Connect to Database & Start Server
ConnectDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`✅ Server is running at: http://localhost:${port}`); 
        });
    })
    .catch((error) => {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1);
    });

// export { io };
