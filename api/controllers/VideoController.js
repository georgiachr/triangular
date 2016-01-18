/**
 * VideoController
 *
 * @description :: Server-side logic for managing Videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @require module:q
 * @todo implement videoList with WebSockets
 * @version 1.0.0
 * @author Georgia Christodoulou
 */

var Q = require('q');

module.exports = {

    /**
     * Get total video records (count) excluding any duplicates.
     * Distinct fields are declared as an array of values in this method.
     * Then it gets a video list page based on skip and page values given from request object.
     * This method is implemented using Promises to avoid callback hell.
     *
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @returns {*}
     */
    videoList: function (req, res) {

        var videoList = [];
        var distinctFields = ['sname'];

        //sails.log.info(req.socket.remotePort+' '+req.ip);

        /**
         *  Validate req parameters for object
         *  If not valid send bad request to server
         */
        if (!VideoValidations.videoList(req)) {
            return res.badRequest();
        }

        /**
         *  Get Both Video Count and Respective Page
         *  When all done go to done
         */
        Q.all([
            Video.getDistinctVideoListByPage(req,distinctFields),
            Video.getDistinctVideoCount(distinctFields)
        ])
        /**
         * When all promises finish call then with the corresponding values in an array
         */
        .then(function(values){

            var list = VideoDBResultsManagingFunctions.prepareVideoList(values[0]);
            var count = VideoDBResultsManagingFunctions.getVideoCountFromQueryResult(values[1]);

            return res.json(200,
                {
                    videoList: list,
                    totalVideoCount: count
                })

        })
        /**
         * If even one failed then call fail with rejection reason
         */
        .fail(function (err) {

            sails.log.error("VideoController - videoList: Error  : " + err);

            //notify client about the error
            return res.serverError(err);
        })
        /**
         * Call done no matter what
         */
        .done(function(){
            //sails.log.info('done from video controller paginating video lists');
        });
    }

};

