require('dotenv').config({ quiet: true })
const express = require("express")
const cors = require("cors")
const dns = require("dns")
dns.setServers(['8.8.8.8', '8.8.4.4']);
const dbConfig = require("./dbConfig")
const router = require("./routes")
const cookieParser = require('cookie-parser')
const cloudConfig = require('./services/cloudConfig');
const app = express()

// ------------------- Middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://munna-scriptz.vercel.app",
        "https://ameersuhaildev.vercel.app"
    ],
    credentials: true
}))

// HTTP Cache-Control header middleware for GET requests
app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600')
    }
    next()
})

// ------------------- Route 
app.use(router)

// ------------------- Database 
dbConfig()
cloudConfig()


// ------------------- Server Listener 
if (process.env.NODE_ENV !== "production") {
    app.listen(8000, () => {
        console.log('Server Is Running on port 8000')
    })
}

module.exports = app