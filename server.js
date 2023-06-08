// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // import route handlers
const helpers = require('./utils/helpers'); // import helper functions for handlebars

// Import sequelize and connect-session-sequelize for session storage
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an Express application
const app = express();
// Set the port for the server, either from environment variable or default to 3001
const PORT = process.env.PORT || 3001;

// Create an Express Handlebars instance with custom helpers
const hbs = exphbs.create({ helpers });

// Configuration object for the session
const sess = {
  secret: 'Super secret secret', // Secret key for session
  cookie: {
    maxAge: 15 * 60 * 1000, // Set cookie max age to 15 minutes
    httpOnly: true, // Prevent client side JS from accessing the cookie
    secure: false, // Cookie will not be sent over https
    sameSite: 'strict', // Strict CSRF protection
  },
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save uninitialized session
  store: new SequelizeStore({
    db: sequelize, // Using sequelize as session store
  }),
};

// Use session middleware with the above configuration
app.use(session(sess));

// Set the view engine to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middlewares to parse JSON and urlencoded data and to serve static files
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Use the routes defined in the './controllers' directory
app.use(routes);

// Sync sequelize models and then start the express server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    // Log message to console when the server starts
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
});
