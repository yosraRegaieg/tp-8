const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');


const app = express();
app.use(cors());
app.use(express.json());


// Remplacez l'URI si vous utilisez MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todoApp';


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.error('Erreur MongoDB:', err));


app.use('/tasks', tasksRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend en écoute sur le port ${PORT}`));