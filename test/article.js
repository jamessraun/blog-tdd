process.env.NODE_ENV = 'test'

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server/app'),
    should = chai.should(),
    Article = require('../models/article');
    mongoose = require('mongoose')

    chai.use(chaiHttp)


describe('Article', function() {

  beforeEach((done) => {
    var newArticle = new Article({
      title: 'Makan Bakso',
      body: 'Makan bakso di tengah jalan siang hari panas banget coy!',
      author: 'Saya',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    newArticle.save((err, result) => {
      done()
    })
  });

  afterEach((done) => {
    Article.collection.drop();
    done()
  })

  it('should get ALL articles on GET /articles', (done) => {
    chai.request(server)
      .get('/articles')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body[0].should.have.property('title')
        res.body[0].should.have.property('body')
        res.body[0].should.have.property('author')
        res.body[0].should.have.property('createdAt')
        res.body[0].should.have.property('updatedAt')
        done()
      })
  })

  it('should get a SINGLE article on GET /articles/<id>', (done) => {
    var newArticle = new Article({
        title: 'Makan Es Batu',
        body: 'Makan es batu di tengah hutan malam hari dingin banget coy!',
        author: 'Dia',
        createdAt: new Date(),
        updatedAt: new Date()
    })

    newArticle.save((err,res)=>{
      chai.request(server)
        .get('/articles/'+(res._id))
        .end((err, response) =>{
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('_id');
          response.body.should.have.property('title');
          response.body.should.have.property('body');
          response.body.should.have.property('author');
          response.body.should.have.property('createdAt');
          response.body.should.have.property('updatedAt');
          response.body._id.should.equal(res._id.toString());
          done()
        });
    })

  })


  it('should add a SINGLE article on POST /articles', (done) =>{
    chai.request(server)
    .post('/articles')
    .send({
      title: 'Makan Ayam',
      body: 'Makan bakso di tengah jalan siang hari panas banget coy!',
      author: 'Saya',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .end((err,res) => {
      console.log(res.body);
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('_id')
      res.body.should.have.property('title')
      res.body.should.have.property('body')
      res.body.should.have.property('author')
      res.body.should.have.property('createdAt')
      res.body.should.have.property('updatedAt')
      done()
    })
  })

  it('should update a SINGLE article on PUT /articles/<id>',done =>{
      chai.request(server)
      .get('/articles')
      .end((err,res)=>{
          chai.request(server)
          .put('/articles/'+res.body[0]._id)
          .send({'title':'Makan Sapi'})
          .end((err,response) =>{
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('_id')
          response.body.should.have.property('title')
          response.body.should.have.property('body')
          response.body.should.have.property('author')
          response.body.should.have.property('createdAt')
          response.body.should.have.property('updatedAt')
          response.body.title.should.equal('Makan Sapi')
          done();
        })
      })
  })

  it('should add a SINGLE article on DELETE /articles/<id>',done =>{
    chai.request(server)
      .get('/articles')
      .end((err, res)=>{
        chai.request(server)
          .delete('/articles/'+res.body[0]._id)
          .end((err,response) =>{
            console.log(response.body);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('_id')
            response.body.should.have.property('title')
            response.body.should.have.property('body')
            response.body.should.have.property('author')
            response.body.should.have.property('createdAt')
            response.body.should.have.property('updatedAt')
            response.body.title.should.equal('Makan Bakso');
            done();
        });
      });
  });
});
