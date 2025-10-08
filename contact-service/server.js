const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3009;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`✅ Contact service running at http://localhost:${PORT}`);
});
