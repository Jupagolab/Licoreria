const mongoose = require('mongoose');
const { MONGODBHOST, MONGODB_DB }  = process.env;

const MONGODB_URL = `mongodb://${MONGODBHOST}/${MONGODB_DB}`;

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
 .then(()=> console.log('Base de datos Conectada'))
 .catch(err => console.log(err));