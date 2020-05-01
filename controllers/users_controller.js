const shortid = require('shortid');
const db = require('../db');

module.exports.index = function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
};

module.exports.create = function(req, res) {
  res.render('users/create');
};

module.exports.search = function(req, res) {
  var searchName = req.query.name;
  var matchedUsers = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUsers
  });
};

module.exports.view = function(req, res) {
  var id = req.params.id;
  var user = db.get('users').find({ id: id }).value();

  res.render('users/view', {
    user: user
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get('users').remove({ id: id }).write();
  res.redirect('/users');
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  
  var errors = [];
  if(!req.body.name) {
    errors.push('Name is required!');
  }
  if(!req.body.phone) {
    errors.push('Phone is required!');
  }

  if(errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    });
    return;
  }

  db.get('users').push(req.body).write();
  res.redirect('/users');
};