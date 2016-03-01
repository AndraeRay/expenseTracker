(function () {
  'use strict';

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (ExpenseTracker, app, auth, database) {

    app.get('/api/expenseTracker/example/anyone', function (req, res, next) {
      res.send('Anyone can access this');
    });

    app.get('/api/expenseTracker/example/auth', auth.requiresLogin, function (req, res, next) {
      res.send('Only authenticated users can access this');
    });

    app.get('/api/expenseTracker/example/admin', auth.requiresAdmin, function (req, res, next) {
      res.send('Only users with Admin role can access this');
    });

    app.get('/api/test', function (req, res, next) {

      res.send('enjoy your banana');
    });

    var mongoose = require('mongoose');
    var Post = mongoose.model('Post');
    var Comment = mongoose.model('Comment');
    var Categories = mongoose.model('Categories');
    var Expense = mongoose.model('Expenses');

    app.get('/api/posts', function(req, res, next) {
      Post.find(function(err, posts){
        if(err){ return next(err); }

        res.json(posts);
      });
    });
    app.post('/api/posts', function(req, res, next) {
      var post = new Post(req.body);

      post.save(function(err, post){
        if(err){ return next(err); }

        res.json(post);
      });
    });
    app.param('post', function(req, res, next, id) {
      var query = Post.findById(id);

      query.exec(function (err, post){
        if (err) { return next(err); }
        if (!post) { return next(new Error('can\'t find post')); }

        req.post = post;
        return next();
      });
    });
    app.get('/api/posts/:post', function(req, res) {
      res.json(req.post);
    });
    app.put('/api/posts/:post/upvote', function(req, res, next) {
      req.post.upvote(function(err, post){
        if (err) { return next(err); }

        res.json(post);
      });
    });
    app.get('/api/categories', function(req, res, next) {
      Categories.findOne({ username: 'default'}, function(err, categories){
        if(err){ return next(err); }

        res.json(categories);
      });
    });
    app.put('/api/categories', function(req, res, next) {
      // var query= {'username': req.body.username}
      var query= {'username': 'default'}
      Categories.save(req.body, function(err, categories){
        if(err){ return next(err); }

        res.json("succesfully saved");
      });
    });
    app.get('/api/expenses', function(req, res, next) {
      Expense.find({ username: 'default'}, function(err, categories){
        if(err){ return next(err); }

        res.json(categories);
      });
    });
    app.post('/api/expenses', function(req, res, next) {
      var expense = new Expense(req.body);
      expense.save(function(err, expense){
        if(err){ return next(err); }

        res.json("succesfully saved");
      });
    });
    app.get('/api/expenseTracker/example/render', function (req, res, next) {
      ExpenseTracker.render('index', {
        package: 'expenseTracker'
      }, function (err, html) {
        //Rendering a view from the Package server/views
        res.send(html);
      });
    });
  };
})();
