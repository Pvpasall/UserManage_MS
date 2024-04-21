// Importez les dépendances nécessaires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv = require("dotenv");
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);

// Utilise CORS pour contrôler l'accès entre les domaines
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//useses cookies parser
app.use(cookieParser());

//url de connectioin pour MongoDB
const mongoDBURL = process.env.DB_URL;
// Connectez-vous à MongoDB
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Un gestionnaire d'événements pour la connexion réussie à MongoDB
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Un gestionnaire d'événements pour les erreurs de connexion à MongoDB
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Utilisez le middleware pour analyser les requêtes JSON
app.use(express.json());
// Utilisez le middleware pour analyser les données de formulaire
app.use(express.urlencoded({ extended: true }));

//routes initialisation
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/auth");

//auth routes
require("./middlewares/auth");
app.use("/api/auth", authRoutes);

// getway routes
const passport = require("passport")

 app.use(
   "/api/profile",
   passport.authenticate("jwt", { session: false }),
   profileRoutes
 );
// app.use(
//   "/api/sections",
//   passport.authenticate("jwt", { session: false }),
//   sectionRoutes
// );
// app.use(
//   "/api/tabs",
//   passport.authenticate("jwt", { session: false }),
//   tabRoutes
// );
// app.use(
//   "/api/tasks",
//   passport.authenticate("jwt", { session: false }),
//   taskRoutes
// );

const PORT = process.env.SERVER_PORT || 5000;

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

httpServer.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
