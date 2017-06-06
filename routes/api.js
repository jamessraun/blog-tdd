var express = require('express'),
    router = express.Router()
    controller = require('../controllers/article_controller')


router.get('/articles',controller.getAll)
router.get('/articles/:id',controller.getById)
router.post('/articles/',controller.createArticle)
router.put('/articles/:id',controller.updateArticle)
router.delete('/articles/:id',controller.deleteArticle)


module.exports = router;
