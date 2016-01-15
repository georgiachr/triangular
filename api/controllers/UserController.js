/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 */

//sleep = require('sleep');
var PNG = require("pngjs-image");
var fs = require("fs");
var Q = require('q');

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @returns {*}
     */
    removeUser: function (req, res) {

        //if is not null or undefined
        if (!req.param('id')){
            return res.badRequest('id is a required parameter.');
        }
        else{
            var userid = req.param('id');
        }


        User.deleteUserById(userid)
            .then(function (usersDestroyed){

                User.publishDestroy(usersDestroyed[0].id);
                sails.log.info(usersDestroyed[0].id);

                return res.ok();
            })
            .catch(function (err) {
                sails.log.info("UserController - removeUser: Error  : " + err);

                //notify client about the error
                return res.serverError(err);
            });
    },

    /**
     * Returns a user object to client
     * isTokenAuthorized policy is mandatory to this action.
     * @param req {String} User email and token
     * @param res
     */
    loginExistedUser: function (req, res) {

        var currentUser = req.options.policyparams.currentuser || {};

        if(undefined !== currentUser){

            /**
             * if there is a socket
             * Add user into a room called onlineUsers
             */
            if (req.isSocket) {
                sails.sockets.join(req.socket, 'onlineUsers');
            }

            return res.json(200, {user: currentUser});
        }
        else{
            sails.log.error(req.target.controller+" "+req.target.action+" Error: There is no user! ");
            return res.serverError();
        }
  },

    /**
     * Check
     * Mandatory Policies:
     * @param req email password
     * @param res
     * @returns {*}
     */
  login: function (req, res) {

        /**
         * Validate Request fields.
         * Necessary fields: email, password
         */
        if (!validationsAndInitializationsForUser.validateUserLoginFields(req)) {
            return res.badRequest();
        }
        else {
            var userPassword = req.param('password');
            var userEmail = req.param('email');
        }

    // Look up for user using the provided email address
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {

        if (err) {
          sails.log.info("negotiate error");
          return res.serverError(err);
        };

        if (!user) {
          sails.log.info("not user");
          return res.notFound();
        }


        // remove users
        require('machinepack-passwords').checkPassword({passwordAttempt: req.param('password') , encryptedPassword: user.encryptedPassword})
          .exec({

            error: function (err){
              return res.serverError(err);
            },

            /**
             * INCORRECT password:
             * If the password from the form parameters doesn't match
             * the encrypted password from the database returns notFound response (404)
             *
             * @returns {*}
             */
            incorrect: function (){
              return res.notFound();
            },

            /**
             * SUCCESS password:
             *
             */
            success: function (){
              // The user is "logging in" (e.g. establishing a session)
              //sails.log.info(JSON.stringify(user));

                /**
                 * if there is a socket
                 * Add user into a room called onlineUsers
                 */
                if (req.isSocket) {
                    sails.sockets.join(req.socket, 'onlineUsers');
                }

              // 1. so update the `lastLoggedIn` attribute.
              User.update(user.id, {lastLoggedIn: (new Date()).toString()},
                  function(err) {
                    if (err) return res.negotiate(err);

                  });

              // 2. issue a user token - another way
              // Keep in mind that function(err,updated) is used this way
              User.update(user.id, {token: jwtToken.issueToken({userid: user.id})},
                  function(err,updated) {
                    if (err) return res.negotiate(err);

                    // res.json([statusCode, ... ] data);
                    res.json(200, {user: updated[0]});
                  });
            }
          });
    });


  },


  /**OK
   * Log out
   * (wipes `me` from the session)
   */
  logout: function (req, res) {

    sails.log.info("Logout API");

    var header_token = null;

    if (req.headers) {

        if (header_token === undefined) {
            return res.json(401, {err: 'No Authorization header was found'});
        }
        else {

            User.findOne({
               id: req.param('id')
            }, function foundUser(err, user) {

              if (err) {
                sails.log.info("Logout: Error find user!");
                return res.negotiate(err);
              }

              if (user) {

                User.update(user.id, {token: ""},function (err, updated) {
                      if (err) return res.negotiate(err);

                      if (updated) {
                        res.json(200);
                      }
                });

              }
              else { //user not found
                sails.log.info("Logout: User not found!");
                return res.notFound();
              }

            }); //User.findOne
          }
      }
  },

    /**
     *
     * @param req
     * @param res
     */
    userList: function (req, res) {

        if(req.isSocket){}
        /**
         *  Validate req parameters for object
         *  If not valid send bad request to server
         */
        if (!UserValidations.userListRequestValidation(req)) {
            return res.badRequest();
        }

        /**
         *  Get Both User Count and Respective Page
         *  When all done go to done
         */
        Q.all([
            User.getUserListByPage(req),
            User.getUserCount()
        ])
        /**
         * When ALL promises finish call then with the corresponding values in an array
         */
        .then(function(arrayOfValues){

            //subscribe user ids
            var list = UserDBResultsManagingFunctions.prepareUserList(req,arrayOfValues[0]);

            return res.json(200,
                {
                    userList: list,
                    totalUsers: arrayOfValues[1]
                })

        })
        /**
         * If even one returns a rejected promise then catch
         */
            /*.catch(function (rejected) {
             sails.log.error("UserController - userList: Promise rejected  : " + rejected);

             //notify client about the error
             return res.serverError(rejected);
             })*/
        /**
         * If even one returns a rejected promise then .fail
         */
        .fail(function (err) {

            sails.log.error("UserController - userList: Error  : " + err);

            //notify client about the error
            return res.serverError(err);
        })
        /**
         * Call done no matter what
         */
        .done(function(){
            //sails.log.info('Done from UserController paginating user list');
        });
    },


  /** OK
   * Update a user account.
   * Update only user's name and user's email
   * updateuser action's policies: isTokenAuthorized, isUserTokenValid, isAdmin
   *
   */
  updateUser: function(req, res) {

    if (!req.param('id')) {
      return res.badRequest('`id` of user to edit is required');
    }

    (function _prepareAttributeValuesToSet(allParams, cb){

      var setAttrVals = {};
      if (allParams.name) {
        setAttrVals.name = allParams.name;
      }
      if (allParams.title) {
        setAttrVals.title = allParams.title;
      }
      if (allParams.email) {
        setAttrVals.email = allParams.email;
        // If email address changed, also update gravatar url
        // execSync() is only available for synchronous machines.
        // It will return the value sent out of the machine's defaultExit and throw otherwise.
        setAttrVals.gravatarUrl = require('machinepack-gravatar').getImageUrl({
          emailAddress: allParams.email
        }).execSync();
      }

      // In this case, we use _.isUndefined (which is pretty much just `typeof X==='undefined'`)
      // because the parameter could be sent as `false`, which we **do** care about.
      if ( !_.isUndefined(allParams.admin) ) {
        setAttrVals.admin = allParams.admin;
      }

      // Encrypt password if necessary
      if (!allParams.password) {
        return cb(null, setAttrVals);
      }
      require('machinepack-passwords').encryptPassword({password: allParams.password}).exec({
        error: function (err){
          return cb(err);
        },
        success: function (encryptedPassword) {
          setAttrVals.encryptedPassword = encryptedPassword;
          return cb(null, setAttrVals);
        }
      });
    })(req.allParams(), function afterwards (err, attributeValsToSet){
      if (err) return res.negotiate(err);

      User.update(req.param('id'), attributeValsToSet).exec(function (err){
        if (err) return res.negotiate(err);

        return res.ok();
      });
    });

  },

    /**
     *
     * Create a new user and add user in the database.
     * This function is developed using Q promises. First it requests an encrypted password for user's password.
     * If the promise is fulfilled then call the User.create promise to create the user.
     * Mandatory Policies: isTokenAuthorized, isUserAdmin
     * @param req new user's email and password
     * @param res
     */
    addUser: function(req, res) {

        /**
         * Validate Request fields.
         * Necessary fields: email, password
         */
        if (!validationsAndInitializationsForUser.validateNewUserFields(req)) {
            return res.badRequest();
        }
        else {
            var userPassword = req.param('password');
        }

        bcryptPassword.encryptPassword(userPassword)
            .then(function(encryptedPassword){
                //return bcryptPassword.comparePasswords(userPassword,hashed);

                var userDetails = UserDBResultsManagingFunctions.prepareNewUserDetails(req, encryptedPassword);

                return User.create(userDetails);
            })
            .then(function(user){

                return res.json(200,
                    {
                        id: user.id
                    })

            })
            .catch(function(err){

                sails.log.error("UserController - AddUser -- Promise failed!");

                return res.serverError(err);
            })
            .done(function(){

            });
    },

    changePassword: function changePassword(req,res) {

        /**
         * Validate Request fields.
         * Necessary fields: email
         */
        if (!validationsAndInitializationsForUser.validateChangePasswordFields(req)) {
            return res.badRequest();
        }
        else {
            var userPassword = req.param('password');
            var userID = req.param('userid');
            var token = req.param('token');
        }

        var theEncryptedPassword;

        bcryptPassword.encryptPassword(userPassword)
            .then(function(encryptedPassword){
                theEncryptedPassword = encryptedPassword;

                return User.findUserByAttribute({token: token});

            })
            .then(function(user){

                sails.log.info('user id found based on token  = ' + user.id);

                //issue a new token
                var newToken = jwtToken.issueToken({userid: user.id});

                //update user
                return User.updateUserByAttr(user.id, {token: newToken, encryptedPassword: theEncryptedPassword });

            })
            .then(function(users){

                return res.json(200,
                    {
                        user: users[0]
                    })

            })
            .catch(function(err){

                sails.log.error("UserController - User -- Promise failed!");

                return res.serverError(err);
            })
            .done(function(){

            });


    },

    initiateResetPassword: function initiateResetPassword(req,res){

        /**
         * Validate Request fields.
         * Necessary fields: email
         */
        if (!validationsAndInitializationsForUser.validateResetPasswordWithTokenFields(req)) {
            return res.badRequest();
        }
        else {
            var userEmail = req.param('email');
        }

        /**
         * Find user with the requested email
         * Email is a unique model attribute
         */
        User.findOne({email: userEmail})
            .then(function(userFound){

                if (!userFound)
                    sails.log.info("userNotFound = ");

                //1. create a temporary token using a synchronous function
                //2. set limit time
                var newToken =  jwtToken.issueToken({userid: userFound.id});

                sails.log.info("newToken = "+newToken);

                return User.updateUserByAttr(userFound.id,{token:newToken});
            })
            .then(function(userUpdated){

                sails.log.info("user's id is = "+userUpdated[0].id);
                sails.log.info("user's updated token is = "+userUpdated[0].token);

                return res.json(200,
                       {
                           token: userUpdated[0].token,
                           userid: userUpdated[0].id
                       }
                );

            })
            .catch(function(err){

                sails.log.error("UserController - initiateResetPassword -- Promise failed!");

                return res.serverError(err);
            })
            .done(function(){
                sails.log.info('done from initiateResetPassword');
            });
    }


    /*resetpasswordwithtoken: function resetpasswordwithtoken(req,res){
        //check token
        // redirect to reset password page

        res.redirect('http://localhost:1337/changepassword');
    }*/

};