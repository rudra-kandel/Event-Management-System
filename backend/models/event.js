const mongoose = require("mongoose");

const { User } = require("../models/index");

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    registration_starts: {
      type: Date,
      required: true,
    },
    registration_ends: {
      type: Date,
      required: true,
    },
    event_starts: {
      type: Date,
      required: true,
    },
    event_ends: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
