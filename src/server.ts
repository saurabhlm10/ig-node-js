import app from "./app";
import postRoutes from "./routes/postRoutes";
import pageRoutes from "./routes/pageRoutes";
import statusRoutes from "./routes/statusRoutes";
import batchRoutes from "./routes/batch.route";
import secretRoutes from "./routes/secret.route";
import cacheRoutes from "./routes/cache.route";
import morgan from "morgan";
import cors from "cors";
import os from "os";
import { ENV } from "./constants";

const port = ENV.PORT || 4000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/post", postRoutes);
app.use("/api/page", pageRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/batch", batchRoutes);
app.use("/api/secret", secretRoutes);
app.use("/api/cache", cacheRoutes);

console.log("CPUS", os.cpus().length);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
