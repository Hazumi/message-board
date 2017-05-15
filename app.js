var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/message_board');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var messageSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
});

var Message = mongoose.model("Message", messageSchema);

app.get('/', function(req, res) {
    Message.find({}, function(err, messages) {
    //Message.find({}, function(err, messages) {
      if(err) {
        console.log(err);
      } else {
        res.render('home', {messages: messages})
      }
    }).sort({date: -1}).limit(10);
});

app.get('/page2', function(req, res) {
    Message.find({}, function(err, messages) {
    //Message.find({}, function(err, messages) {
      if(err) {
        console.log(err);
      } else {
        res.render('home', {messages: messages})
      }
    }).sort({date: -1}).skip(10).limit(10);
});

app.get('/page3', function(req, res) {
    Message.find({}, function(err, messages) {
    //Message.find({}, function(err, messages) {
      if(err) {
        console.log(err);
      } else {
        res.render('home', {messages: messages})
      }
    }).sort({date: -1}).skip(20).limit(10);
});

app.get('/new', function(req, res) {
    res.render('new');
});

app.get('/:id', function(req, res) {
    Message.findById(req.params.id, function(err, selectedMessage) {
        if(err) {
            console.log(err);
        } else {
          res.render('show', {message: selectedMessage});
        }
    });
});

app.post('/new', function(req, res) {
    var title = req.body.title;
    var message = req.body.message;
    var date = req.body.date;
    var newPost = {title: title, message: message, date: date};
    Message.create(newPost, function(err, newPost) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
    });
});

app.listen(3000, function() {
    console.log('listening');
});
