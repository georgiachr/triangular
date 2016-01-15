/**
 * Created by Geochr on 12/28/2015.
 */


//returns a user page list based on limit and skip values
/**
 *
 * @param req
 * @param list
 * @returns {Array}
 */
module.exports.prepareUserList = function(req,list) {

    var userList = [];

    //subscribe
    if(req.isSocket) {
        User.subscribe(req, _.pluck(list, 'id'));
    }

    _.each(list, function (user, index) {

        userList.push({
            name: user.name,
            id: user.id,
            surname: user.surname,
            role: user.role,
            email: user.email
        });


    });

    return userList;

};

module.exports.prepareNewUserDetails = function(req,encryptedPassword) {

    var userDetails = {
        name: req.param('name'),
        surname: req.param('surname'),
        role: req.param('role'),
        email: req.param('email'),
        encryptedPassword: encryptedPassword,
        lastLoggedIn: new Date()
    };

    return userDetails;

};