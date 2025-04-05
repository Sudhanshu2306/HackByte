import mongoose from "mongoose";

const lostPersonSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  aadharCardNumber: {
    type: String,
    required: true,
  },
  dateReported: {
    type: Date,
    default: Date.now,
  },
  zipCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageEmbedding: {
    type: [Number],
    required: true,
    default : [0],
  },
  bounty : {
    type : String,
    default : 0
  },
  resolved :{
    type: Boolean,
    default:false,
  },
  image_url : {
    type : String,
  }
});

const Lost = mongoose.model("LostPerson", lostPersonSchema);
export {Lost};