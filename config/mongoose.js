const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/passport')

mongoose.connection 
    .on('error',(error) => {console.log('Db not Connected')})
    .once('open',() => {console.log('DB connected')})