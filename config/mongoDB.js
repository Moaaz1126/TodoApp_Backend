const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Conected To DB")
}).catch((err) => {
  console.log(err)
})