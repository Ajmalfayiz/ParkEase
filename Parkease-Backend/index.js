require("dotenv").config();

const connectDB = require("./config/dbConnection");
const app = require("./app");

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => process.exit(1));
