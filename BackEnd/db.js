const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`Connected to the ${process.env.DB_NAME} database!`))
  .catch((err) => console.error("Database connection error:", err));
