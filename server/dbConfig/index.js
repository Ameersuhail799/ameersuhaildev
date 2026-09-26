const mongoose = require('mongoose')

const dbConfig = () => {
    return (
        mongoose.connect(process.env.DB_STRING, {
            maxPoolSize: 50,
            minPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
            .then(() => console.log('DB Connected with connection pool maxPoolSize: 50'))
    )
}

module.exports = dbConfig