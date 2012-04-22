
// for more info, checkout http://expressjs.com/

var express = require('express')
	, app = express.createServer()

app.configure(function(){
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/views');
	
	// compile less and on every request during development
	app.use(require('connect-less')({
		src: __dirname + '/'
		, dst : __dirname + '/../public'
		, compress : true
		, force : true
		//, debug : true
	}));
	
	// make sure to serve the static files after the connect-less
	// static resources (images, css, js, etc..)
	app.use(express.static(__dirname + '/../public'));
	
	app.get('/',function(req,res,next){
		res.render('home');
	});
});

module.exports = app;