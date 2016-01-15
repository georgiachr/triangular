/**
 * Created by Geochr on 12/28/2015.
 */

module.exports.userListRequestValidation = function(req) {

    try{
        var textForSearch = req.param('searchText');
        var limit = req.param("pageSize");
        var skip = req.param("paginationGetListStartIndex");
        return true
    }
    catch (err) {
        return false;
    }

},

module.exports.removeUser = function(req) {

}