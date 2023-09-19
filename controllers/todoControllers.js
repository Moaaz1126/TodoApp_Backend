const toDoModle = require('../models/todo');
const mongoose = require('mongoose');

// get all ToDo
const getToDos = async (req, res) => {
  const {id} = req.params
  const toDos = await toDoModle.find({user: id}).sort({createdAt: -1})

  res.status(200).json(toDos)
}

// get a single ToDo
const getToDo = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({err: 'No Such User'})
  }
  const toDo = await toDoModle.find({user: id}).sort({createdAt: -1})

  if(!toDo) {
    return res.status(404).json({err: 'No Such User'});
  }
  // console.log("getee")
  res.status(200).json(toDo)
}

// create a ToDo
const createToDo = async (req, res) => {
  const {title, checked, date, user} = req.body;

  try {
    const toDo = await toDoModle.create({title, checked, date, user})
    res.status(200).json(toDo)
  } catch (err) {
    res.status(400).json({err: err})
    console.log(err)
  }

}

// delete a ToDo
const deleteToDo = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json('OK')
  }
  const toDo = await toDoModle.findByIdAndDelete(id)

  if(!toDo) {
    return res.status(404).json({errr: 'No Such ToDo'});
  }
  res.status(200).json(toDo)
}

// update a ToDo
const updateToDo = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({err: 'No Such ToDo'})
  }
  const toDo = await toDoModle.findByIdAndUpdate(id, req.body)

  if(!toDo) {
    return res.status(404).json({err: 'No Such ToDo'});
  }

  res.status(200).json(toDo)
}

// const Clear = async (req, res) => {
//   const {id} = req.params
//   if(!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json('No id')
//   }
//   const toDo = await toDoModle.deleteMany({user: id, checked: true})

//   if(!toDo) {
//     return res.status(403).json({errr: 'No Such ToDo', err: todo});
//   }
//   res.status(200).json(toDo)
// }
const Clear = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json('No id')
  }
  const toDo = await toDoModle.deleteMany({user: id, checked: true});

  if (toDo.deletedCount === 0) {
    return res.status(404).json({error: 'No ToDo items found to delete'});
  }

  res.status(200).json(toDo);
}

module.exports = {
  getToDos,
  getToDo,
  createToDo,
  deleteToDo,
  updateToDo,
  Clear
}