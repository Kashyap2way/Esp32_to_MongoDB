const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB connection URI
const mongoURI = 'mongodb+srv://kashyapmistry2021:ws7Gqbfgy3*hQZ5@db1cluster1.skf8r.mongodb.net/?retry Writes=true&w=majority&appName=DB1Cluster1';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the Ride schema and model
const rideSchema = new mongoose.Schema({
  pickup: String,
  destination: String,
  name: String // Add name field to schema
});

const Ride = mongoose.model('Ride', rideSchema);

// Route to get all rides
app.get('/rides', async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new ride
app.post('/rides', async (req, res) => {
  const { pickup, destination, name } = req.body;

  const newRide = new Ride({
    pickup,
    destination,
    name
  });

  try {
    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
