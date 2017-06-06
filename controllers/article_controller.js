var mongoose = require('mongoose'),
  Article = require('../models/article')

var getAll = (req, res) => {
  Article.find()
    .then(article => {
      res.send(article)
    })
    .catch(err => {
      res.send(err)
    })
}

var getById = (req, res) => {
  console.log(req.params.id);
  Article.findOne({_id:req.params.id})
    .then(article => {
      res.send(article)
    })
    .catch(err => {
      res.send(err)
    })
}


var createArticle = (req, res) => {
  let new_article = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt
  }

  Article.create(new_article)
    .then(article => {
      res.send(article)
    })
    .catch(err => {
      res.send(err)
    })
}

var updateArticle = (req, res) => {
  Article.findOne({_id:req.params.id})
    .then(article => {
      article.title = req.body.title || article.title
      article.author = req.body.author || article.author
      article.body = req.body.body || article.body
      article.createdAt = req.body.createdAt || article.createdAt
      article.updatedAt = req.body.updatedAt || article.updatedAt

      article.save((err, updated_article) => {
        if (err) res.send(err);
        res.send(updated_article);
      })
    });
}


var deleteArticle = (req, res) => {
  Article.findOne({_id:req.params.id})
    .then(article => {
      article.remove((err, message) => {
        if (err) res.send(err);
        res.send(article);
      });
    })
    .catch(err => {
      res.send(err)
    })
}



module.exports = {
  getAll: getAll,
  getById: getById,
  createArticle: createArticle,
  updateArticle: updateArticle,
  deleteArticle: deleteArticle
};
