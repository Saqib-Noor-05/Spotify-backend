const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const authRoute = require('./Routes/auth.routes')
const musicRoutes = require('./Routes/music.routes')

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/music", musicRoutes)

module.exports = app