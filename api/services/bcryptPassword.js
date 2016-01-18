/**
 * Created by georgia.chr on 14-Jan-16.
 * @description This service handles the application's password encryption and comparison using bcrypt.
 * passwordSaltLength should be defined in globals.js. passwordSaltLength defines salt length.
 *
 * @version 1.0.0
 * @requires module:bcrypt
 * @requires module:q
 * @author Georgia Christodoulou
 */

var Passwords = require('bcrypt');
var Q = require('q');

/**
 * PROMISABLE method
 * We use bcrypt's Synchronous functions to generate and hash the 'passwordToBeEncrypted'.
 * In the end, we use Q.fcall() to create a promise for these tasks.
 * @param {String} passwordToBeEncrypted - password from user that has to be encrypted
 * @returns {*}
 */
module.exports.encryptPassword = function(passwordToBeEncrypted) {

    return Q.fcall(function() {
        var salt = Passwords.genSaltSync(sails.config.globals.passwordSaltLength);
        return Passwords.hashSync(passwordToBeEncrypted, salt);
    },passwordToBeEncrypted);
};

/**
 * PROMISABLE method
 * We use bcrypt's Synchronous functions to compare two passwords.
 * In the end, we use Q.fcall() to create a promise for this task.
 * @param {String} passwordTocheck - password given as input from user.
 * @param {String} passwordFromDb - password stored in user's database record.
 * @returns {*}
 */
module.exports.comparePasswords = function(passwordTocheck,passwordFromDb) {
    return Q.fcall(function() {
            return Passwords.compareSync(passwordTocheck,passwordFromDb);
    },passwordTocheck,passwordFromDb);
};
