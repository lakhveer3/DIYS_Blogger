const http = require('http')
    , express = require('express')
    , app = express()
    , server = http.createServer(app)
    ,passport = require('./passport/passport');

const ingredients = require('./routes/ingredients.route.js');

app.use(passport.initialize());
app.use(passport.session());
module.exports = app;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
	});

app.use(express.static('./../'));




app.use('/',(req,res,next)=>{
  console.log('inside routes');
  next();
},ingredients);

module.exports = server.listen(3000, err => {
  if(err)
  {
    throw err
  }
  console.log('DIY Server running on 3000')
  })
