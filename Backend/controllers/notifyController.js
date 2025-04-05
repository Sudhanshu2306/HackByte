const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (Make sure you have a serviceAccountKey.json)
if (!admin.apps.length) {
  const serviceAccount = require("../config/serviceAccountKey.json"); // Replace with your file
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const sendGeofenceAlert = async (req, res) => {
  try {
    const { userId, familyId, message } = req.body;

    // Fetch family members' FCM tokens from database
    const familyMembers = await User.find({ familyId, _id: { $ne: userId } }, "fcmToken");
    if (!familyMembers || familyMembers.length === 0) {
      return res.status(404).json({ message: "No family members found." });
    }

    const tokens = familyMembers.map(member => member.fcmToken).filter(token => !!token);
    if (tokens.length === 0) {
      return res.status(400).json({ message: "No valid FCM tokens found." });
    }

    const payload = {
      notification: {
        title: "⚠️ Geofence Alert",
        body: message,
      },
    };

    const response = await admin.messaging().sendMulticast({ tokens, ...payload });
    console.log("FCM Response:", response);

    return res.status(200).json({ message: "Notification sent successfully.", response });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ message: "Error sending notification.", error });
  }
};

module.exports = { sendGeofenceAlert };
