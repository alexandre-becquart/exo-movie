const http = require('http')
const router = require('./appRouter')
require('./config')
/**
 * CREATE SERVER WITH HTTP
 */

 http.createServer(router).listen('8001',(error)=>{
     if(error) throw error;
     console.log(`Server is running on port ${global.config.port}`)
 })