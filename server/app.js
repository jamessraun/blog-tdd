var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./_config'),
    api = require('../routes/api'),
    app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',api)

mongoose.connect(config.mongoURI[app.settings.env],(err,res) => {
  if(err){
    console.log('Error connecting to the database'+ err );
  }else {
    console.log('Connected to Database:' + config.mongoURI[app.settings.env]);
  }

});



app.listen(3000);

module.exports = app;
