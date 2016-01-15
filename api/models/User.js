/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


module.exports = {

    // Define a custom table name
    tableName: 'user',

    // Set schema true/false for adapters that support schemaless
    schema: true,

    connection: 'myMongoLab',

  /* A T T R I B U T E S */
  attributes: {

    // The user's name
    name: {
      type: 'string',
      required: true
    },

    // The user's surname
    surname: {
      type: 'string',
      required: true
    },

    // The user's email address
    email: {
      type: 'email',
      required: true,
      unique: true
    },

    /**
    * user role options:
    * 1. Administrator : system administrator
    * 2. Coordinator : Nurse with more privileges
    * 3. Nurse :
    * 4. login-user
    */
    role: {
      type: 'string',
      defaultsTo: 'Administrator',
      required: true
    },

    // The encrypted password for the user after MD5
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    encryptedPassword: {
      type: 'string'
    },

    // The token
      //TODO: 1-N association - A user may have many tokens
    token: {
      type: 'string'
        //collection: 'token'
        //via: ''
    },

    // The salt used for user's password
    passwordSalt: {
      type: 'string'
    },

    lastActive: {
      type: 'date',
      required: false,
      defaultsTo: new Date(0)
    },

    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
      required: false,
      defaultsTo: new Date(0)
    },


    //unused attributes for this model
    admin: {
      type: 'boolean',
      defaultsTo: false
    },
    title: {
      type: 'string'
    },
    gravatarUrl: {
      type: 'string'
    },
    avatar:{
      model: 'filemodel'
      //TODO: defaultsTo:
    }

      //    cars:{
//      collection: 'car',
//      via: 'owner'
//    },

  },

    /* M E T H O D S */

    // We don't want to send back encrypted password either
    toJSON: function () {
        var obj = this.toObject();
        delete obj.encryptedPassword;
        return obj;
    },

    findUserByAttribute: function (attr){

        return User.findOne(attr);

    },

    updateUserToken: function (token){

    },

    updateUserByAttr: function (userid, attr){

        return User.update(userid, attr);

    },

    checkPassword: function (useridCredentials, passwordToCheck) {
        return true;
    },

    deleteUserById: function (userid) {

        return User.destroy(
            {id: userid}
        );

    },

    createNewUser: function (options) {

        return User.create(options);

        //User.create(userdetails, function userCreated(err, newUser)

    },

    getUserListByPage: function (req) {

        var limit = req.param("limit");
        var skip = req.param("skip") - 1;

        return User.find()
            .paginate({
                page: skip,
                limit: limit
            });

    },

    getUserCount: function () {
        return User.count();
    }


};
