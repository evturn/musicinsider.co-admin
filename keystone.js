// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Music Insider',
	'brand': 'Admin',
	
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,
	
	'host': process.env.IP || '127.0.0.1',
	'env': process.env.NODE_ENV || "development",
	'auto update': true,
	'mongo': process.env.MONGO_URI || 'mongodb://localhost/miDB',
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || '0!/ze&$4*emwc[To6Z+2nz6?v-FFGqC7OyX-r~3-`rS;o8?)*R.c."FFkJ/uu1"<'

});

// Load your project's Models
var User = require('./models/User');
var Post = require('./models/Post');
var PostCategory = require('./models/PostCategory');
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));


keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
