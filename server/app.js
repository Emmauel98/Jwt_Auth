const express = require('express');
const app = express();
const connectDB = require('../database/db');
const Userroute = require('../routes/user');
const LoginUserRoute = require('../routes/loginUser');
require('dotenv').config();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware for user routes
app.use('/api/v1/users',Userroute);

// Middleware for login routes
app.use('/api/v1/login',LoginUserRoute);

const port = process.env.PORT || 3001;

console.log(process.env.ACCESS_TOKEN);
const startServer = async ()=>{
    try {
        app.listen(port,console.log(`server is running on ${port}`));
        connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(`Failed to connect because: ${error}`);
    }
};

startServer();