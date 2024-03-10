import express from "express";
import connectToDb from "./config/db";
import cors from "cors";
import morgan from "morgan";

connectToDb();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.params);
  res.send("Hello, TypeScript Express Server!");
});

// import axios, { AxiosError } from "axios";

// app.post("/getAccessToken", async (req, res) => {
//   try {
//     const response = await axios.post(
//       `https://api.instagram.com/oauth/access_token`,
//       {
//         client_id: "1350638815553493",
//         client_secret: "536eb7db8ce6c262e1f62f3c4a7e6eab",
//         grant_type: "authorization_code",
//         redirect_uri: "http://localhost:4000/api",
//         code: "code",
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       console.log(error.response?.data);

//       return res.status(400).json(error.response?.data.message);
//     }
//     if (error instanceof Error) {
//       console.log(error.message);
//       return res.status(500).send({ error: "Internal Server Error." });
//     } else {
//       return res.status(500).send({ error: "An unknown error occurred." });
//     }
//   }
// });
// app.get("/getCode", async (req, res) => {
//   try {
//     const clientId = "1350638815553493";
//     const redirectUri = encodeURIComponent("http://localhost:4000/api");
//     const scope = "user_profile,user_media";
//     const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

//     res.redirect(authUrl);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       console.log(error.response?.data);

//       return res.status(400).json(error.response?.data.message);
//     }
//     if (error instanceof Error) {
//       console.log(error.message);
//       return res.status(500).send({ error: "Internal Server Error." });
//     } else {
//       return res.status(500).send({ error: "An unknown error occurred." });
//     }
//   }
// });

export default app;
