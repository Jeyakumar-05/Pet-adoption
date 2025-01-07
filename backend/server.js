require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConn = require('./config/db'); 
const authRoutes = require('./routes/authRoutes'); 
const Pets = require('./routes/petRoutes');
const Contact = require('./routes/contactRoute');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 7778;

app.use('/contact', Contact);
app.use('/pets', Pets);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(200).json("Welcome"); 
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});