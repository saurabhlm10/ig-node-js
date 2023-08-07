import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import postRoutes from "./routes/postRoutes";
import morgan from "morgan";
import cors from "cors";

const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/post", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
