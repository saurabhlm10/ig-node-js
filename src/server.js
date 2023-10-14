require("dotenv").config();

const app = require("./app");
const postRoutes = require("./routes/postRoutes");
const pageRoutes = require("./routes/pageRoutes");
const morgan = require("morgan");
const cors = require("cors");

const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/post", postRoutes);
app.use("/api/page", pageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
