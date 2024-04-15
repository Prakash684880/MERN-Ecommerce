const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const connectDB = require('./config/db')
const router = require('./Route/index')



const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

// Increase payload size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json())
app.use(cookieParser())


app.use('/api', router)


const port = process.env.PORT;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });

})

