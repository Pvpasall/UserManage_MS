require('./database/connexion');
const mongoose = require("mongoose");
const Profile = require('./model/schema');

const express = require('express');

const app = express();
app.use(express.json());

app.get('/profile/:userId', async (req, res) => {
    try {
        const userId= req.params.userId;
       
        const mongoUserId = new mongoose.Types.ObjectId(userId);
       
        const profile = await Profile.findOne({ userId: mongoUserId }).exec();

        if (!profile) {
            return res.status(404).json({ error: 'pas de profil sur ce compte' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur' });
    }
});

app.post('/profile/:userId', async (req, res) => {
    try {
      const { name, firstname, age, userId } = req.body;
      const mongoUserId = new mongoose.Types.ObjectId(userId);

      // check if a profile already exists for the given userId
      const existingProfile = await Profile.findOne({ userId: mongoUserId }).exec();
      if (existingProfile) {
        return res.status(400).json({
          error: "Un profil existe déjà pour cet utilisateur.",
        });
      }

      const newUser = new Profile({
        name,
        firstname,
        age,
        userId: mongoUserId,
      });
      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Une erreur est survenue lors de la création de l\'utilisateur.'
        });
    }
});

app.put('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;
            const mongoUserId = new mongoose.Types.ObjectId(userId);
          const updatedProfile = await Profile.findOneAndUpdate(
            { userId: mongoUserId },
            newData,
            { new: true }
          ).exec();

        if (!updatedProfile) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur' });
    }
});

app.delete('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const mongoUserId = new mongoose.Types.ObjectId(userId);
         const deletedProfile = await Profile.findOneAndDelete({
           userId: mongoUserId,
         }).exec();

        if (!deletedProfile) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur' });
    }
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});