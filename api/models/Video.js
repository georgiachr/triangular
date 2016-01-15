  /**
  * Video.js
  *
  *  * https://github.com/balderdashy/waterline
  * TODO: change the db name to 'amslogs'
  *
  * Only for READ - not write!
  * Due to the need of distinct values then the code
  * has been amended with special functions using .native Waterline function
  * Connection types: 'sails-mongo', 'sails-mysql'
  *
  * Note 1: Does not support MongoDB distinct yet
  *
   * @version 1.0.0
  * @type {{schema: boolean, migrate: string, adapter: string, attributes: {id: {type: string, size: number, primaryKey: boolean, unique: boolean}, event: {type: string, size: number}, eventdatetype: {type: string}, timezone: {type: string, size: number}, category: {type: string, size: number}, cpuload: {type: string}, memload: {type: string}, clientip: {type: string, size: number}, clientprotocol: {type: string, size: number}, sname: {type: string, size: number}, filename: {type: string, size: number}, fileext: {type: string, size: number}, filesize: {type: string, size: number}, filelength: {type: string}, pageurl: {type: string, size: number}, comment: {type: string, size: number}}}}
  * @description :: TODO: You might write a short summary of how this model works and what it represents here.
  * @docs        :: http://sailsjs.org/#!documentation/models
  */
module.exports = {

  schema: true, // Set schema true/false for adapters that support schemaless
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

  getVideoName: function (sname) {
    var arrayOfValues = sname.split("/");

    var nameWithExtension = arrayOfValues[arrayOfValues.length-1];
    var name = nameWithExtension.split(".");

    return name[0];
  },

  getVideoExtension: function (name){
    var arrayOfValues = name.split(".");
    console.log(arrayOfValues[1]);
    return arrayOfValues[1];
  },

  getVideoCount: function () {
    //
    // if called here
    //
    //Video.count()
    //.then(function(number){
    //
    //})
    //.catch(function(err){
    //
    //});

    return Video.count();
  },

  getVideoListByPage: function (req) {

    var limit = req.param("limit");
    var skip = req.param("skip") - 1;

    //
    // if called here
    //
    // Video.find()
    // .paginate({page: skip,limit: limit})
    // .then(function(videolist){
    //
    // })
    // .catch(function(err){
    //
    // });
    //

    return Video.find()
        .paginate({
          page: skip,
          limit: limit
        });
  },

  /**
   * Returns the count of distinct values (based on field)
   * .query() in combination with MySQL commands used in here
   * @param fields Array
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
   * Returns a page based on limit and skip values.
   * Distinct was used here to verify that each video appears only once
   * .query() in combination with MySQL commands used in here
   * @param req Object
   * @param fields Array
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

          /*.then(
          function(results) {
            sails.log.info(results);
          },
          function(err) {
              sails.log.info(err);
          }

        );*/
    }
  },

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

