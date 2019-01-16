const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

///////////////////////////////////////////////////////////////////////////////
//Content for fileupload///////////////////////////////////////////////////////
// const busboy = require('connect-busboy')
// const path = require('path')
// const fs = require('fs-extra')
const formidable = require('express-formidable')
///////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

///////////////////////////////////////////////////////////////////////////////
//Content for fileupload///////////////////////////////////////////////////////
// app.use(express.static(path.join(__dirname, 'controllers/img/')))
///////////////////////////////////////////////////////////////////////////////

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/queue', require('./routes/queue'))
app.use('/search', require('./routes/search'))
app.use(formidable())
app.use('/upload', require('./routes/upload'))

app.use((req, res, next) => {
    res.status(404).send({message: "Couldn't find it, bruh"})
})

app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    res.status(status).send({message:err.message})
})

const listener = () => {console.log(`Queueing on port ${port}`)}
app.listen(port, listener)