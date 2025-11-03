const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is live on PORT: ${PORT}`);
});
