var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var articleSchema= new Schema({
    title:String,
    author:String,
    body:String,
    createdAt:Date,
    updatedAt:Date
})

var Article = mongoose.model('Article',articleSchema);

module.exports = Article;
