const express = require("express");
const router = express.Router();
const getIdFromToken = require("../utils/getIdFromToken");


router.get("/", async (req, res) => {
  try {
    const userId = getIdFromToken(req);
    // Make an HTTP GET request to fetch profile data from another server
    const response = await fetch(`http://localhost:3001/profile/${userId}`);
    const profileData = await response.json();

    // Check if profile exists
    if (response.status === 404) {
      return res.status(404).json({ error: "Pas de profil sur ce compte" });
    }

    // Return the profile data in the response
    res.json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Le serveur a rencontré un problème lors de la récupération du profil.",
    });
  }
});

// POST request
router.post("/", async (req, res) => {
  try {
    const userId = getIdFromToken(req);
    const postData = req.body;

    // Make an HTTP POST request to create a new profile
    const response = await fetch(`http://localhost:3001/profile/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    const responseData = await response.json();

    // Return the response data in the response
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Le serveur a rencontré un problème lors de la création du profil.",
    });
  }
});

// UPDATE request
router.put("/", async (req, res) => {
  try {
    const userId = getIdFromToken(req);
    const updatedData = req.body;

    // Make an HTTP PUT request to update the profile
    const response = await fetch(`http://localhost:3001/profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const responseData = await response.json();

    // Return the response data in the response
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          "Le serveur a rencontré un problème lors de la mise à jour du profil.",
      });
  }
});

// DELETE request
router.delete("/", async (req, res) => {
  try {
    const userId = getIdFromToken(req);

    // Make an HTTP DELETE request to delete the profile
    const response = await fetch(`http://localhost:3001/profile/${userId}`, {
      method: "DELETE",
    });
    const responseData = await response.json();

    // Return the response data in the response
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          "Le serveur a rencontré un problème lors de la suppression du profil.",
      });
  }
});

module.exports = router;
