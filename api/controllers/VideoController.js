/**
 * VideoController
 *
 * @description :: Server-side logic for managing Videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Q = require('q');

module.exports = {

    videolistold: function (req, res) {

        var limit = req.param("limit");
        var skip = req.param("skip") - 1;
        var videoCount = null;

        Video.count()
            .then(function (count) {
                videoCount = count;
                return Video.getVideoListWithPagination(limit, skip);
            })
            .then(function (videolist) {
                return res.json(200,
                    {
                        videoList: videolist,
                        totalVideoCount: videoCount
                    })
            })
            .catch(function (err) {
                console.log("VideoController - videolist: Error  : " + err);

                //notify client about the error
                return res.serverError(err);
            });


    },

    videolistotherway: function (req, res) {

        var limit = req.param("limit");
        var skip = req.param("skip") - 1;
        var videoCount = 10;

        getVideoCountPromise = Video.getVideoCount;
        getVideoListWithPaginationPromise = Video.getVideoListWithPagination(limit, skip);

        Q.spread([getVideoListWithPaginationPromise, getVideoCountPromise],
            function (list, count) {
                return res.json(200,
                    {
                        videoList: list,
                        totalVideoCount: count
                    })
            },
            function (err) {

                console.log("VideoController - videolist: Error  : " + err);

                //notify client about the error
                return res.serverError(err);
            }
        );

    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Used just for testing sockets
     * @param req
     * @param res
     */

    testingSockets: function (req,res){
        var roomName = "videoStatisticsRoom";
        sails.log.info('hello from testingSockets');
        //if (req.isSocket){
            //var mySocketId = sails.sockets.id(req.socket);
            //var roomName = req.param('roomName');

            sails.log.info('in Socket');

            //sails.sockets.emit(sails.sockets.subscribers(roomName), 'playing', {text:"hello"});

            sails.sockets.broadcast(roomName, 'playing', {text:"hello"});

            return res.json({
                messages: 'Message was sent to all socket ids subscribed in room: '+roomName
            });

        //}else{
        //    sails.log.info('No Socket');
        //}
    },

    enterRoom: function (req,res){
        var roomName = "videoStatisticsRoom";



        //sails.log.info(req.socket.request.connection._peername);

        if (req.isSocket){
            var availableRooms = JSON.stringify(sails.sockets.rooms());
            //var roomName = req.param('roomName');

            sails.sockets.join(req.socket, roomName);

            return res.json({
                messages: 'Subscribed to a fun room called '+roomName+'!',
                availableRooms: availableRooms,
                thisRoomNumber: 15
            });
        }else{
            return res.badRequest();
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    videolist: function (req, res) {


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
         *
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

            //sails.log.info(list);
            //sails.log.info(values[1].resultt);
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

