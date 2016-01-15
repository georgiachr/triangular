/**
 * Created by georgia.chr on 29-Dec-15.
 */

module.exports.videoList = function(req) {

    try{
        var limit = req.param("limit");
        var skip = req.param("skip");

        return true
    }
    catch (err) {
        return false;
    }

}