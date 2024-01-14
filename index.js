require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')

const connectDB = require('./db/connect')

const userRouter = require('./routes/userRouter')
const categoryRouter = require('./routes/categoryRouter')
const uploadRouter = require('./routes/uploadRouter')
const productRouter = require('./routes/productRouter')

const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

app.use('/user', userRouter)
app.use('/api', categoryRouter)
app.use('/api', uploadRouter)
app.use('/api', productRouter)

app.use(errorHandler)

// serving the frontend
app.use(express.static('client/build'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000

const connect = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

connect()
