// const express = require('express')
import express from "express"
import users from "./users.js"
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

  users.init(app)
})

