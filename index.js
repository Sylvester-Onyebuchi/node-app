import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {ConnectDB} from "./db/DBConnect.js";
import routes from './routes/routes.js'
import  dotenv from 'dotenv'
import  session from 'express-session'
import MongoStore from "connect-mongo";
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
ConnectDB()
app.use(cors({
    origin: [
        'http://localhost:4200',
        'https://mysonap.netlify.app'
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
}));


app.use('/api', routes)



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})