const http = require('http')
const router = require('./appRouter')

const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise

require('./config')

/**
 * CREATE Database connexion
 */

Mongoose.connect('mongodb://localhost:27017/technocite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    console.log('Mongo is now connected to our system please request away');
})
/**
 * CREATE SERVER WITH HTTP
 */

http.createServer(router).listen(global.config.port, (error) => {
    if (error) throw error;
    console.log(`Server is running on port http://localhost:${global.config.port}`)
})