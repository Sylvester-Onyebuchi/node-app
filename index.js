import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {ConnectDB} from "./db/DBConnect.js";
import routes from './routes/routes.js'
import  dotenv from 'dotenv'
import  session from 'express-session'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
ConnectDB()
app.use(cors({
    origin: [
        'https://mysonapp.netlify.app'
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'hello from myson',
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