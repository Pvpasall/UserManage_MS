require('./database/connexion');
const User = require('./model/schema');
const cors = require('cors');

const express = require('express');

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost : 3000",
        ],
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/users/get', async (req, res) => {
    console.log('toto');
    try {
        const users = await User.find()

        if (!users) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error whule getting users: ', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
    }
})

app.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(`Error while getting user with id "${userId}" : ${error}`);
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
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error while updating the user: ', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur' });
    }
});

app.delete('/users/delete/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Error while deleting user :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur' });
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});