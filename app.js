const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


// Connect to MongoDB
mongoose.connect('mongodb+srv://harshithd:Kfz6hjs7ix9MfKLN@tasks.pugqheu.mongodb.net/?retryWrites=true&w=majority&appName=tasks', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/test",(req,res) => {
    return res.status(200).send({message:"test"})
})