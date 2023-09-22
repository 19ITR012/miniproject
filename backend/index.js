const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');

// app.use('/', (req, res) => {
//     return res.json("from backend");
// });

app.use('/user', userRoutes);
app.use('/skill', skillRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});