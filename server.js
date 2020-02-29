const express = require("express");
const connectDb = require("./config/db");
const morgan = require("morgan");
const routes = require("./routes/admin/index");
const cors = require("cors");
const app = express();

// connect database
connectDb();

//Init Middleware
app.use(express.json({ extended: false }));

app.use(morgan("combined"));
app.use(cors());

// After all that above middleware, we finally handle our own routes!
app.use("/", routes);

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "deft-epigram-237915-e465f10b0b67.json";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
