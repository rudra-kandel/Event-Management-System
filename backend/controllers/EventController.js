// ======================= MODULES =====================
// USER MODULES
const { Event } = require("../models/index");

// TO GET ALL Events
module.exports.getAll = async (req, res) => {
  //   const { search } = req.query;
  //   const queryParam = {};
  //   if (search) queryParam.name = search;

  const event = await Event.find().sort("-createdAt");
  // .populate("brand", "brand");
  if (event.length > 0) return res.json({ status: true, event });
  return res.status(404).json({ status: false, msg: "Events not found" });
};

// GET ONE
module.exports.getOne = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) return res.json({ status: true, event });
  return res.status(404).json({ status: false, msg: "Event not found" });
};

// TO CREATE Event
module.exports.createEvent = async (req, res) => {
  req.body.organizer = req.user.id;
  if (req.file) {
    req.body.image = req.file.filename;
  }
  const event = await Event.create(req.body);
  return res.json({ status: true, event, msg: "Event created successfully" });
};

// TO UPDATE
module.exports.updateEvent = async (req, res) => {
  let event = await Event.findById(req.params.id);

  // Check if the event exists
  if (!event) {
    return res.status(404).json({ status: false, msg: "Event not found" });
  }

  // Check if the user making the request is the organizer
  if (event.organizer.toString() !== req.user.id) {
    return res.status(403).json({
      status: false,
      msg: "You are not authorized to update this event",
    });
  }
  if (req.file) {
    req.body.image = req.file.filename;
  }
  event = await Event.findByIdAndUpdate(req.params.id, req.body);
  return res.json({ status: true, event, msg: "Event updated successfully" });
};

// TO DELETE Event
module.exports.deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  // Check if the event exists
  if (!event) {
    return res.status(404).json({ status: false, msg: "Event not found" });
  }

  // Check if the user making the request is the organizer
  if (event.organizer.toString() !== req.user.id) {
    return res.status(403).json({
      status: false,
      msg: "You are not authorized to delete this event",
    });
  }
  await Event.findByIdAndDelete(req.params.id);

  return res.json({ status: true, msg: "Event deleted successfully" });
};

//TO REGISTER FOR EVENT
module.exports.registerForEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    //check if user is already registered for this event
    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({
        status: false,
        msg: "User is already registered for this event.",
      });
    }
    event.participants.push(req.user.id);
    await event.save();
    return res.json({
      status: true,
      msg: "Registration for the event successful.",
    });
  } else {
    return res.status(404).json({
      status: false,
      msg: "Event not found.",
    });
  }
};
