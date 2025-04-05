import mongoose from "mongoose";

const LastLocationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: "Family", required: true }, // Assuming Family model exists
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const LastLocation = mongoose.model("LastLocation", LastLocationSchema);
export default LastLocation;
