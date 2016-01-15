/**
* File.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    /**
     * Name is a string of characters
     */
    name:{
      type: 'string',
      required: true,
      unique: true
    },

    userid: {
      model: 'user'
    },

    type:{
      type: 'string',
      required: true
    }



  }
};

