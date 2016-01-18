/**
 *  Created by georgia.chr on 14-Sep-15.
 *  This service handles the encode / decode of application's tokens (calls jsonwebtoken's methods sign and verify respectively)
 *  The user token of this application is comprised of:
 *  1. payload which is user's id (key is 'userid'). Payload has expiration time.
 *  2. tokenSalt declared in globals.js
 *  3. data in a json (for example: expirationInMinute which is also declared in globals.js)
 *
 *  @version 1.0.0
 *  @requires module:jsonwebtoken
 *  @author Georgia Christodoulou
 */

var jwt = require('jsonwebtoken');

/**
 * Synchronous method (using jwt.sign).
 * Create an expiration date/time for the new token. Then amend the new expiration time into the payload.
 * Finally creates a new token that comprised of a. payload (userid), b. tokenSalt (define in globals) and c. other data
 * like expirationInMinutes.
 *
 * @summary Creates a token based on userid
 * @param {String} payload - payload is the user's id. The key is 'userid'
 * @returns {String} token
 * @todo Use sails.config.globals to set TIME, TIME TO LEAVE, NEAR TIME TO EXPIRE
 */
module.exports.issueToken = function(payload) {

  //get an expiration time for this token
  var expirationTime = new Date(
    (new Date()).getTime() + (sails.config.globals.tokenExpirationInMinutes * 60 * 1000 )
  );

  //add expirationTime into payload
  payload.expiration = expirationTime;

  //finally create the new token
  //jwt.sign(payload, secretOrPrivateKey, options, [callback])
  var token = jwt.sign(
    payload,
    process.env.TOKEN_SECRET || sails.config.globals.tokenSalt,
    {
      expirationInMinutes: sails.config.globals.tokenExpirationInMinutes
    }
  );

  return token;
};

/**
 * Asynchronous method (using jwt.verifyToken).
 * @param {String} token - the token to be verified
 * @param callback
 * @returns {*}
 * @todo Use NEAR TIME TO EXPIRE to re-issue the token
 * @todo (and optionally expiration, audience, issuer)
 */
module.exports.verifyToken = function(token,callback) {

    //jwt.verify(token, secretOrPublicKey, [options, callback])
  return jwt.verify(
    token,
    process.env.TOKEN_SECRET || sails.config.globals.tokenSalt, // Same token we used to sign
    {},
    // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};

/**
 * Synchronous method (using jwt.decode).
 * Returns the decoded payload and header (if options complete is true).
 * Then access payload by decoded.payload.
 *
 * @param {String} token - the token to be decoded
 * @param {Object} options - {complete: true}
 * @returns {Object} decoded - object with decoded payload and header
 */
module.exports.decodeToken = function(token,options) {

  //jwt.decode is synchronous
  var decoded =  jwt.decode(
    token, // The token to be verified
    options
  );

  return decoded;
};

/**
 * Synchronous method.
 * Returns a negative value if the token is invalid or a positive value if token is valid.
 * The value is the number of minutes until expiration.
 *
 * @param {String} token - the token
 * @return {Number} isexpired - a positive or negative value
 */
module.exports.tokenExpiresInMinutes = function(token) {

  var decoded = jwt.decode(
    token, // The token to be verified
    {complete: true}
  );

  var token_exp = new Date(decoded.payload.expiration);
  var now = new Date().getTime();

  return (token_exp - now)/1000/60;
};
