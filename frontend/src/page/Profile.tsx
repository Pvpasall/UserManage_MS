import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function Profile() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState(""); // Nouvel état pour l'âge
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfessionChange = (event) => {
    setProfession(event.target.value);
  };

  const handleAgeChange = (event) => { // Fonction pour gérer les changements d'âge
    setAge(event.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             Profile
          </Typography>
          {isLoggedIn && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="logout"
              onClick={handleLogout}
            >
              <ExitToAppIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ padding: "20px" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Mon Profile
            </Typography>
            <TextField
              id="name"
              label="Full Name"
              fullWidth
              value={name}
              onChange={handleNameChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              id="profession"
              label="Profession"
              fullWidth
              value={profession}
              onChange={handleProfessionChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              id="age" // Champ pour l'âge
              label="Age"
              fullWidth
              value={age}
              onChange={handleAgeChange}
              style={{ marginBottom: "10px" }}
            />
            <Button variant="contained" color="primary">
              Enregistrer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
