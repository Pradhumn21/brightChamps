require('dotenv').config()
const express = require('express')
const connection = require('./db.config')
const userRoute = require('./Routes/users.route')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())
server.use('/users',userRoute)

server.listen(process.env.PORT,async()=>{
    try {
       await connection
       console.log('server is running fine and db connected successfully') 
    } catch (error) {
        console.log(error)
    }
})