const express = require("express");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Review Service running on port ${PORT}`);
});
