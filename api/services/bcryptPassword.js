/**
 * Created by georgia.chr on 14-Jan-16.
 */

//ASYNC functions
var Passwords = require('bcrypt');
var Q = require('q');

/**
 *
 * @returns {*}
 */
module.exports.encryptPassword = function(passwordToAdd) {

    return Q.fcall(function() {
        var salt = Passwords.genSaltSync(10);
        return Passwords.hashSync(passwordToAdd, salt);
    },passwordToAdd);
};

module.exports.comparePasswords = function(passwordTocheck,passwordFromDb) {
    return Q.fcall(function() {
            return Passwords.compareSync(passwordTocheck,passwordFromDb);
    },passwordTocheck,passwordFromDb);
};

/**
 * Salt is added by default
 * @param password
 */
module.exports.encryptPasswordSync = function(passwordToBeEncrypted) {

    //create salt
    var salt = Passwords.genSaltSync(10);

    //create hashed password using salt
    var hashedPassword = Passwords.hashSync(passwordToBeEncrypted, salt);

    return hashedPassword;
};