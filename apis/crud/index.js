require('./database/connexion');
const User = require('./model/schema');

const express = require('express');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur' });
    }
});

app.post('/users/new', async (req, res) => {
    try {
        const { name, firstname, email, password, age } = req.body;

        const newUser = new User({
            name,
            firstname,
            email,
            password,
            age
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

app.put('/users/update/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const newData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur' });
    }
});

app.delete('/users/delete/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur' });
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});