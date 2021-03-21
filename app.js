
/**
 * Module dependencies.
 * abhattachan
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('hbs');
	/*
	 * express-hbs

		Express 3 handlebars template engine with multiple layouts, blocks and cached partials.

		Open source project from Barc, instant real-time forum on any website.

		0.7 BREAKING CHANGES: The logic for layout resolution for layoutsDir, 
		* layout and declarative layouts in previous versions stepped on each other. 
		* Read Layouts section below on how layouts are resolved.
	*/
	const blogEngine = require('./blog');
	/**
	 * All these libraries are required for the program. 
	 * Its usage will be clear in the following code.
	 */

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	
	app.set('view engine', 'html');
	app.engine('html', hbs.__express);
	app.use(express.static('public'));
	/*
	 * This tutorial is a basic introduction to routing with Express. 
	 * Routing refers to determining how an application responds to a client request to a particular endpoint,
	 *  which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
		Each route has a handler function, executed when the route is matched.
	 */
	app.get('/', function(req, res) {
		res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
	});

	app.get('/about', function(req, res) {
		res.render('about', {title:"About Me"});
	});

	app.get('/article/:id', function(req, res) {
		const entry = blogEngine.getBlogEntry(req.params.id);
		res.render('article',{title:entry.title, blog:entry});
	});

	const server = app.listen(3001, '127.0.0.1',function () {

	  //var host = server.address().address
	  var host = server.address().address
	  var port = server.address().port

	  console.log('Example app listening at http://%s:%s', host, port)

	})
