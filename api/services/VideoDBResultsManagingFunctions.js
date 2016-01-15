/**
 * Created by georgia.chr on 28-Dec-15.
 */


//returns a video list based on limit and skip values
//or error
module.exports.prepareVideoList = function(queryResult) {
    var videoList = [];
    _.each(queryResult, function (video, index) {

        var videoName = Video.getVideoName(video.sname);

        videoList.push({
            name: videoName,
            extension: video.fileext

        });

    });
    return videoList;

};

module.exports.getVideoCountFromQueryResult = function(queryResult) {

    var videoCount = queryResult[0].result;

    return videoCount;

};

module.exports.getVideoViewsFromQueryResult = function(queryResult) {

    var videoList = [];
    _.each(queryResult, function (video, index) {

        var videoName = Video.getVideoName(video.sname);
        var videoExtension = Video.getVideoExtension(video.sname);

        videoList.push({
            name: videoName,
            extension: videoExtension,
            views: video.views
        });

    });
    return videoList;

};
