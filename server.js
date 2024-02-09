require('dotenv').config({ path: '.env' });
require('./config/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoute);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });