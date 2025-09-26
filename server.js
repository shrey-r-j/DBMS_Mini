// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/donors", require("./routes/donorRoutes.js"));
app.use("/api/blood", require("./routes/bloodroute.js"));
app.use("/api/bloodbanks", require("./routes/bloodBankRoutes.js"));
app.use("/api/employees", require("./routes/employeeRoutes.js"));
app.use("/api/hospitals", require("./routes/hospitalRoutes.js"));
app.use("/api/patients", require("./routes/patientRoutes.js"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
