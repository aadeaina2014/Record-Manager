/**************************************************************************
  Server Application Driver File Records Server
  Backend Script: NodeJS
  FrontendScripts: Boostrap
  Dependencies : mongoose, express, morgan, cookie-parser
  Author : Ayokunle Ade-Aina
  Date   : 28th June  2016   script  writting duration: 3-days
  review comments: Project Requires integration with an auhetication system
***************************************************************************/



/*
future works: how to build tables based on complex query
                how to seperate main.js code into seperate files
                how to use single mongoose schema for records and authetication
                how to extract database entries into arrays for plotting
                how to integrate authetication app and table query app

*/

///////////////////////////////////
// Mark:  Required Modules     //
/////////////////////////////////

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
configDB         = 'mongodb://localhost:27017/General';




/////////////////////////////////////////////////////////////////////////////////
//Database schema   =========================================records.js/users.js/ 
/////////////////////////////////////////////////////////////////////////////////
mongoose.connect(configDB); // connect to our database
var recordSchema = mongoose.Schema(
{
    firstName: String,
    lastName : String,
    age      : Number,
    height   : Number,
    weight   : Number,
    sex      : String
}
);
var rec = mongoose.model('rec', recordSchema);

/////////////////////////////////////////////////////////////////////////////////
// Application  configuration =================================main.js/server.js
/////////////////////////////////////////////////////////////////////////////////
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'ejs'); // set up ejs for templating



////////////////////////////////////////////////////////////////////////////////////
//Application routes ===================================================== route.js/
////////////////////////////////////////////////////////////////////////////////////


app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
        res.end();
    });





////////////////////////////////////////////////////
// *get all the users and dispaly them in console */
/////////////////////////////////////////////////////

/*
function printRecord2Console()
{
 rec.find({}, function(err, recs) {
  if (err) throw err;

  // object of all the users
  console.log(recs);
 });
}
 */

////////////////////////////////////////////////////
// *get all the users and dispaly them in ejs */
/////////////////////////////////////////////////////

app.get('/records', function(req, res) { 
  rec.find({}, function(error, recs) {
    if (error || !recs) {
      res.render('error', {});
    } else { 
      res.render('records', { recs : recs });
    }
  });
});


app.post('/index', function(req, res)
{
 fileRecord(req);
 res.redirect('/records');
 res.end();
});


/////////////////////////////////////////////////////////////////////////////////
//Database routines ========================================= main.js/server.js/ 
/////////////////////////////////////////////////////////////////////////////////
function fileRecord(req)
{

 var user_records = new rec({ 
    firstName: req.body.firstName,
    lastName : req.body.lastName, 
    age      : req.body.age,
    height   : req.body.height,
    weight   : req.body.weight,
    sex      : req.body.sex
});

 user_records.save(function (err, user_records) {
  if (err) return console.error(err);

});
}






app.listen(port);
console.log('The magic happens on port ' + 8080);