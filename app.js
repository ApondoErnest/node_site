/**
* Module dependencies.
*/

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//var methodOverride = require('method-override');
var multer = require('multer');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var router = express.Router();
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'nolicorp_data'
            });
 connection.connect();

//include static pages
 var static = require('node-static');

var fileServer = new static.Server('./public');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
});
 
global.db = connection;

//set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
});
//init upload
const upload = multer({
    storage : storage
}).single('document');
router.post('/contactform', function(req, res, next){
    upload(req, res, err => {
        if (err) throw err
         var sql = "INSERT INTO `command` (`filename`) VALUES('"+req.file.filename+"')";
        connection.query(sql, function(err, results){
          //script lain misal redirect atau alert :D 
         })
     });
 });

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }));

// development only
 
app.get('/', routes.index);//call for main index page
app.post('/messageus', user.messageus);//call for signup post 
app.get('/contactform', user.contactform);
app.post('/contactform', user.contactform);
app.get('/shop', user.shop);
app.get('/about', user.about);
app.get('/contact', user.contact);
app.post('/contact', user.contact);
//app.get('/momo', user.momo);
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post
app.get('/login', user.login);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile
//Middleware
app.listen(8080)