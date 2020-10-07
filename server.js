const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express();

const userRouter = require('./user/user-router')




server.use(helmet());
server.use(express.json());

server.use("/api", userRouter)

server.get("/", (req,res) => {
    res.json({api: "up"})
});


module.exports = server

