const config = require('config');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();


if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined!');
    process.exit(1); //exit with error
    /*
    must set like below
    set vidyl_jwtPrivateKey=mySecureKey

    * */
}

mongoose.connect('mongodb://localhost/vidly')
    .then( ()=> console.log('Connected to MongoDB!'))
    .catch( (err)=> console.log(`Could not connect to MongoDB: ${err}`));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);



const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));

