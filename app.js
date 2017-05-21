var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// initalizing mongoose
var mongoDB = 'mongodb://localhost/msg_board';
mongoose.connect(mongoDB);

// defining schema
var Schema = mongoose.Schema;
var messageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  }
});

var Message = mongoose.model("Message", messageSchema);

// INDEX
app.get('/', function(req, res) {
  res.redirect('/board');
});
app.get('/board', function(req, res) {
  Message.find({}, function(err, message) {
    if(err) {
      res.send('An error has occured. Please try again later.');
    } else {
      res.render('home', {message: message});
    }
  });
});

// NEW
app.get('/board/new', function(req, res) {
  res.render('new');
});

// CREATE
app.post('/board', function(req, res) {
  var newMessage = req.body.post;
  Message.create(newMessage, function(err, newMessage) {
    if(err) {
      res.redirect('/board/new');
    } else {
      res.redirect('/board');
    }
  });
});

// SHOW
app.get('/board/:id', function(req, res) {
  Message.findById(req.params.id, function(err, foundMessage) {
    if(err) {
      res.redirect('/board');
    } else {
      res.render('show', {message: foundMessage});
    }
  });
});

// EDIT
app.get('/board/:id/edit', function(req, res) {
  Message.findById(req.params.id, function(err, foundMessage) {
    if(err) {
      res.redirect('/board');
    } else {
      res.render('edit', {message: foundMessage});
    }
  });
});

// UPDATE
app.put('/board/:id', function(req, res) {
  Message.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedMessage) {
    if(err) {
      res.redirect('/board');
    } else {
      res.redirect('/board/' + req.params.id);
    }
  });
});

// DESTORY
app.delete('/board/:id', function(req, res) {
  Message.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect('/board');
    } else {
      res.redirect('/board');
    }
  });
});


app.listen(3000, function() {
  console.log('listening');
});
