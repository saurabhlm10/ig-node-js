import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import postRoutes from "./routes/postRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import morgan from "morgan";
import cors from "cors";

const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/post", postRoutes);
app.use("/api/page", pageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
