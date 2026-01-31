
import User from "./register";
import mongoose from "mongoose";

const eventschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    eventDateTime: {
      type: Date,
      required: true,
    },

    location: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);



const Event = mongoose.models.Event ||  mongoose.model("Event", eventschema);

export default Event;
