import database from "./database.js"

function listAll(req,res) {
  res.send(database.users)
}

function insert(req, res) {
  
}

function init(app) {
  app.get('/users',listAll)
}

export default {
  listAll,
  init
}