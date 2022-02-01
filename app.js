import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Read environment variable from .env
dotenv.config();

const app = express();

//Express Cors Configuration
const corsOptions = {
  origin: process.env.ALLOWED_DOMAIN,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", , "Access-Control-Allow-Origin"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.enable("trust proxy");
app.use(cors(corsOptions));
app.use(express.json());

//Ping routes to check server status
app.get("/api/ping", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server up and running",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    statusCode: 404,
    message: `${req.method} ${req.url} not found`,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
