  /**
  * Video.js
  * Only for READ purposes - not write!
  * Note 1: Does not support MongoDB distinct yet
  * Note 2: All model methods are Promisified.
   *
  * @docs https://github.com/balderdashy/waterline
  *
  * @version 1.0.0
  * @type {{schema: boolean, migrate: string, adapter: string, attributes: {id: {type: string, size: number, primaryKey: boolean, unique: boolean}, event: {type: string, size: number}, eventdatetype: {type: string}, timezone: {type: string, size: number}, category: {type: string, size: number}, cpuload: {type: string}, memload: {type: string}, clientip: {type: string, size: number}, clientprotocol: {type: string, size: number}, sname: {type: string, size: number}, filename: {type: string, size: number}, fileext: {type: string, size: number}, filesize: {type: string, size: number}, filelength: {type: string}, pageurl: {type: string, size: number}, comment: {type: string, size: number}}}}
  * @description :: Due to the need of distinct values then the code has been amended with special functions using .native Waterline function
  * @todo change database. The current database is a testing one.
  * @todo write purposes?
  * @author Georgia Christodoulou
  */
module.exports = {

  schema: true,
  migrate: 'alter',
  tableName: 'videoreport',
  autoPK: false, //prevent to create 'id'

  /**
   * can i find out the adapter in runtime?
   */
  connection: 'teleprometheus', // Define an adapter to use

  attributes: {

    //this is the PK. In MySQL this is an AI PK
    //AI is false because this model is used only for READ purposes.
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true
    },

    event: {
      type: 'string',
      size: 45
    },

    eventdatetype: {
      type: 'datetime'
    },

    timezone: {
      type: 'string',
      size: 4
    },

    category: {
      type: 'string',
      size: 45
    },

    cpuload: {
      type: 'float'
    },

    memload: {
      type: 'float'
    },

    clientip: {
      type: 'string',
      size: 16
    },

    clientprotocol: {
      type: 'string',
      size: 8
    },

    sname: {
      type: 'string',
      size: 1024
    },

    filename: {
      type: 'string',
      size: 1024
    },

    fileext: {
      type: 'string',
      size: 16
    },

    filesize: {
      type: 'integer'
    },

    filelength: {
      type: 'float'
    },

    pageurl: {
      type: 'string',
      size: 256
    },

    comment: {
      type: 'string',
      size: 256
    }

  },

    /**
     * Returns video's name without URL or extension type.
     *
     * @param {String} sname - the name of video as URL with extension (ex. /Georgia/antibiotics.mp4)
     * @returns {String} name - the actual video name (antibiotics)
     */
  getVideoName: function (sname) {
    var arrayOfValues = sname.split("/");

    var nameWithExtension = arrayOfValues[arrayOfValues.length-1];
    var name = nameWithExtension.split(".");

    return name[0];
  },

    /**
     * Extracts extension from video URL
     *
     * @param {String} name - video URL name (ex. /Georgia/antibiotics.mp4)
     * @returns {String} extension - video extension (mp4)
     */
  getVideoExtension: function (name){
    var arrayOfValues = name.split(".");

    return arrayOfValues[1];
  },

    /**
     * Prepares the Video count question and returns a promise.
     * @returns {Object} - PROMISE
     */
  getVideoCount: function () {

    return Video.count();
  },

    /**
     * Prepares the following question: Find all videos with paginate values (skip,limit) and returns a promise.
     * @param {Object} req - Has limit and skip values (as client requested)
     * @returns {Object} - PROMISE
     */
  getVideoListByPage: function (req) {

    var limit = req.param("limit");
    var skip = req.param("skip") - 1;

    return Video.find()
        .paginate({
          page: skip,
          limit: limit
        });
  },

  /**
   * This method is written for MySQL connections (MySQL supports DISTINCT)
   * Therefore this method returns the count of distinct values (based on fields)
   * .query() is used in combination with MySQL commands.
   * We verify that connection of this model is MySQL using model.connections.config.adapter
   *
   * @param {Array} fields - fields to be included in DISTINCT command
   */
  getDistinctVideoCount: function (fields) {

    /**
     * Find adapter type
     */
    var adapterType = Video.connections[
        Object.keys(Video.connections)[0]
        ].config.adapter;

    if(adapterType == 'sails-mysql'){

      //create the query string
      fields.toString();

      //prepare the command
      var command = 'SELECT COUNT(DISTINCT '+fields+') as result FROM videoreport';

      //return a promise
      return Video.query(command);

    }
  },

  /**
   * This method is written for MySQL connections (MySQL supports DISTINCT).
   * Prepares the following question: Find all DISTINCT videos with paginate values (skip,limit) and returns a promise.
   * .query() is used in combination with MySQL commands.
   * We verify that connection of this model is MySQL using model.connections.config.adapter
   *
   * @param {Object} req - Has limit and skip values (as client requested)
   * @param {Array} fields - fields to use as DISTINCT
   */
  getDistinctVideoListByPage: function(req,fields){

    var limit = req.param("limit");
    var skip = req.param("skip") - 1;

    /**
     * Find adapter type
     */
    var adapterType = Video.connections[
        Object.keys(Video.connections)[0]
        ].config.adapter;

    if(adapterType == 'sails-mysql'){

      //create the query string
      //fields.toString();

      var command = 'SELECT DISTINCT sname,fileext FROM videoreport LIMIT '+limit+' OFFSET '+skip;

      return Video.query(command);
    }
  },

    /**
     * This method is written for MySQL connections.
     * .query() is used in combination with MySQL commands.
     *
     * @todo check this functon again
     * @param {Object} req - Has limit and skip values (as client requested)
     * @param {Array} options -
     */
  getVideoViewsByPage: function(req,options) {

    var limit = req.param("limit");
    var skip = req.param("skip") - 1;

    var command =
        "SELECT sname, COUNT(sname) as views " +
        "FROM videoreport " +
        "GROUP BY sname " +
        "ORDER BY views " + 'DESC' +
        " LIMIT " + limit +
        " OFFSET " + skip;


    return Video.query(command);
  }
};

