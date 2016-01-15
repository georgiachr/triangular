/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {


  // If a request to a URL doesn't match any of the custom routes above,
  // it is matched against Sails route blueprints.  See `config/blueprints.js`
  // for configuration options and examples.
  'PUT /login': 'UserController.login',
  'PUT /loginExistedUser': 'UserController.loginExistedUser',
  //'PUT /test': 'UserController.test',
  'POST /logout': 'UserController.logout',
  'POST /adduser': 'UserController.addUser',
  'POST /updateuser': 'UserController.updateuser',
  'DELETE /removeuser': 'UserController.removeUser',
  //'POST /uploadavatar': 'FileController.uploadavatar',

  'GET /userlist': 'UserController.userlist',

  'GET /videolist': 'VideoController.videolist',
  'GET /sockettest': 'VideoController.testingSockets',
  'GET /enterroom': 'VideoController.enterRoom',
  'POST /resetpasswordwithtoken': 'UserController.initiateResetPassword',
  'POST /changepassword': 'UserController.changePassword'


};
