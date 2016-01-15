/**
 * Created by georgia.chr on 15-Dec-15.
 */

module.exports.validateNewUserFields = function(req) {

    var status = 1;

    try {
        req.validate({
            email: 'email',
            password: 'string',
            name: 'string',
            surname: 'string',
            role: 'string'
        });
    }
    catch(exception){
        console.log("AddUser: Error during field validations." + JSON.stringify(exception));
        //return exception;
        status = 0;
    }

    return status;
};

module.exports.validateResetPasswordWithTokenFields = function(req) {

    var status = 1;

    try {
        req.validate({
            email: 'email'
        });
    }
    catch(exception){
        console.log("ResetPasswordWithToken: Error during field validations." + JSON.stringify(exception));
        status = 0;
    }

    return status;
};

module.exports.validateChangePasswordFields = function(req) {

    var status = 1;

    try {
        req.validate({
            password: 'string',
            userid: 'string',
            token: 'string'
        });
    }
    catch(exception){
        console.log("ChangePassword: Error during field validations." + JSON.stringify(exception));
        status = 0;
    }

    return status;
};

module.exports.validateUserLoginFields = function(req) {

    var status = 1;

    try {
        req.validate({
            email: 'email',
            password: 'string'
        });
    }
    catch(exception){
        console.log("LoginUser: Error during field validations." + JSON.stringify(exception));
        //return exception;
        status = 0;
    }

    return status;
};

module.exports.validateUserListWithPagination = function(req){

    /**
     * check for
     * check for
     * check for
     */
    try{

    }
    catch (error) {

    }


    var asyncCounter = 0;
    var options = {};
    options.usercount = 0;
    options.textForSearch = req.param('searchText');
    options.pagesize = req.param("pageSize");
    options.skipcount = req.param("paginationGetListStartIndex")-1;



    if(options.textForSearch === undefined)
        options.textForSearch = "";

    options.likeObject = {
        like:{
            name:'%'+options.textForSearch+'%'
        }
    };

    options.likewithpaginationObject = {
        like:{
            name:'%'+options.textForSearch+'%'
        },
        skip:options.skipcount,
        limit:options.pagesize
    };

    return options;
};

