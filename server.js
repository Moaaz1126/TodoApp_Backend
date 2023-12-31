require('dotenv').config()
require('./config/mongoDB')
const express = require("express");
// const cors = require('cors')
const cookieParser = require('cookie-parser');

const todo = require('./routes/todo')
const user = require('./routes/user')

// Express App
const app = express();
// app.use(cors());
// MiddleWare
app.use(express.json())
app.use(cookieParser());

// Cors
// app.options('*', cors())



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://lively-figolla-6460e1.netlify.app/');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



// Routes 
app.use('/api/todo', todo)
app.use('/api/user', user)

app.listen(process.env.PORT, () => {
  console.log('Server Started At PORT ', process.env.PORT)
})