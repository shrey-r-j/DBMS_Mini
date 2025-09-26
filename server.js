// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(require('cors')());

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4, // Force IPv4
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};


// Routes
app.use("/api/donors", require("./routes/donorRoutes.js"));
app.use("/api/blood", require("./routes/bloodroute.js"));
app.use("/api/bloodbanks", require("./routes/bloodBankRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes.js"));
app.use("/api/hospitals", require("./routes/hospitalRoutes.js"));
app.use("/api/patients", require("./routes/patientRoutes.js"));

// Start server
const port = process.env.PORT || 3000;

connectDB().then(() => {
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
});
