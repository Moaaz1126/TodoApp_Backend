const userModle = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



// Sign Uo
// const signUp = async (req, res) => {
//   data = req.body;
//   usr = new userModle(data)
//   salt = bcrypt.genSaltSync(10);
//   cryptedPass = await bcrypt.hashSync(data.password, salt);
//   usr.password = cryptedPass;
//   usr.save().then(
//     (saved)=> {
//       res.status(200).send(saved)
//     }
//     ).catch(
//       (err)=> {
//         res.status(400).send(err);
//       }
//     )
// }

// Sign In
const signIn = async (req, res) => {
  data = req.body;
  user = await userModle.findOne({username: data.username})

  if(!user) {
    res.status(404).send('username or Password invalid !')
  } else {
    validPass = bcrypt.compareSync(data.password, user.password);
    if(!validPass) {
      res.status(404).send('username or password invalid !')
    } else {
      payload = {
        _id: user._id,
        username: user.username
      }
      token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '7d'})
      await res.cookie("token", token)

      res.status(200).send({
        _id: user._id,
        username: user.username
      })
    }
  }
}

// get all User
const getUsers= async (req, res) => {
  const Users = await userModle.find({}).sort({createdAt: -1})

  res.status(200).json(Users)
}

// get a single User
const getUser = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({err: 'No Such User'})
  }
  const user = await userModle.findById(id)

  if(!user) {
    return res.status(404).json({err: 'No Such User'});
  }
  res.status(200).json(user)
}

// create a User
const createUser = async (req, res) => {
  let {username, password} = req.body;
  const Users = await userModle.findOne({username: username}).sort({createdAt: -1})

  if(!Users) {
    try {
      salt = bcrypt.genSaltSync(10);
      cryptedPass = await bcrypt.hashSync(password, salt);
      password = cryptedPass;
      const User = await userModle.create({username, password})
      return res.status(200).json("OK")
    } catch (err) {
      res.status(400).json({err: err})
      console.log(err)
    }
  } else {
    res.status(400).json({err: "This Username is unvaluable"})
  }
  
}

// delete a User
const deleteUser = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({err: 'No Such User'})
  }
  const User = await userModle.findByIdAndDelete(id)

  if(!User) {
    return res.status(404).json({err: 'No Such User'});
  }
  res.status(200).json(User)
}

// update a User
const updateUser = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({err: 'No Such ToDo'})
  }
  const User = await UserModle.findByIdAndUpdate(id, req.body)

  if(!User) {
    return res.status(404).json({err: 'No Such User'});
  }

  res.status(200).json(User)
}

const verifyUser = async (req, res) => {
  const token = req.cookies.token;
  console.log(token)
  console.log(req.cookies)
  if(!token) {
    res.status(402).json("Token Is Missing")
  } else {
    await jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if(err) {
        return res.json("Error With Token")
      } else {
        res.json(decoded)
        // console.log(decoded)
      }
    })

  }
}

const logout = (req, res) => {
  res.status(200).clearCookie("token", {
    path: '/'
  });
  res.status(200).json("OK")
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  signIn,
  verifyUser,
  logout
}