import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface ProfileDataType {
  name: string;
  firstname: string;
  age: number;
}
export function Profile() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [age, setAge] = useState(0);
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [noChanges, setNoChanges] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if profileData is not null and all fields are equal to the initial state
    if (
      profileData !== null &&
      profileData.name === name &&
      profileData.firstname === firstname &&
      profileData.age == age
    ) {
      setNoChanges(true);
    } else {
      setNoChanges(false);
    }
  }, [profileData, name, firstname, age, noChanges]);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleAgeChange = (event) => {
    // Fonction pour gérer les changements d'âge
    setAge(event.target.value);
  };

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/islogged", {
        credentials: "include",
      });
      const data = await response.json();
      if (!data.isLogged) {
        navigate("/login");
      }
      setIsLoggedIn(data.isLogged);
    } catch (error) {
      console.error("Error fetching login status:", error);
    }
  };
  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const profileData = await response.json();
      setProfileData(profileData);
      setName(profileData.name);
      setFirstname(profileData.firstname);
      setAge(profileData.age);
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };
  const updateProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          firstname: firstname,
          age: age,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfileData(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      return null;
    }
  };
  useEffect(() => {
    checkLoginStatus();
    fetchProfile();
  }, []);

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
      {isLoggedIn && profileData ? (
        <div style={{ padding: "20px" }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Mon Profile
              </Typography>
              <TextField
                id="firstname"
                label="FirstName"
                fullWidth
                value={firstname}
                onChange={handleFirstnameChange}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                id="name"
                label="name"
                fullWidth
                value={name}
                onChange={handleNameChange}
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
              <Button
                variant="contained"
                color="primary"
                onClick={updateProfile}
                disabled={noChanges}
              >
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>You should probably login </>
      )}
    </div>
  );
}
