
/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var PNG = require("pngjs-image");
var fs = require("fs");


module.exports = {

	upload: function  (req, res) {

		var uploadFilesList, uploadFile;
		console.log('upload action ');


	},

	georgiaExamples: function (req,res){

		/*
		 if(myarray == 0){
		 myarray++;
		 sleep.sleep(10);
		 }
		 console.log(myarray);
		 */

		/*
		 fs.readFile("", function (err, data) {

		 sleep.sleep(10);

		 console.log(myarray);

		 myarray--;

		 console.log(myarray);
		 });*/

		//Example 3: not working
		/*var  myarray = new Array(10);
		 var count = 0;
		 _.each(myarray, function () {
		 count++;
		 console.log('each = ' + count);
		 (function example3() {
		 fs.readFile("", function (err, data) {
		 console.log('readfile = ' + count);
		 //sleep.sleep(10);
		 })
		 })(count);
		 });*/

		//example 2
		/*
		 var myarray = new Array(10);

		 var num=0;
		 _.forEach(myarray,function(number){

		 num++;
		 console.log("foreach: " + num);


		 fs.readFile("", function (err, data) {
		 if (err) {console.log("readfile: " + num);}
		 });

		 });
		 */


		//Example 3
		/*
		 var myarray = new Array(10);

		 var num=0;
		 _.forEach(myarray,function(number){

		 num++;
		 console.log("foreach: " + num);

		 (function ioio (){

		 //this.num = num;
		 var numo = num;
		 console.log("ioio: " + num);

		 fs.readFile("../../sails.pdf", function (err, data) {
		 if (err) {
		 console.log("readfile: " + numo);
		 }
		 });

		 })(num);

		 });


		 //Example 4: sleep
		 /*var myarray = new Array(10);

		 var num=0;
		 _.forEach(myarray,function(number){

		 num++;
		 console.log("foreach: " + num);

		 (function ioio (){

		 //this.num = num;
		 var numo = num;
		 console.log("ioio: " + num);

		 sleep.sleep(10);

		 })(num);

		 });
		 */

	},

	testing: function (req,res){

		var filename = req.param('filename');
		var filetype = req.param('filetype');
		var filepath = './'+filename+"."+filetype;
		var headerContentType;

		var stat = fs.statSync(filepath);

		if(filetype === "png" || filetype === "jpg")
			headerContentType = "image"+"/"+filetype;
		else if (filetype === "pdf")
			headerContentType = "application"+"/"+filetype;

		res.writeHead(200, {
			'Content-Type': headerContentType,//'application/pdf'
			'Content-Length': stat.size,
			'Content-Disposition': 'attachment; filename='+filename+'.'+filetype
		});

		require('fs').createReadStream(filepath) //read data and send to client
			.on('error', function (err) {
				return res.serverError(err);
			})
			.on('end', function onSuccess() {
				console.log('finish');

			})
			.pipe(res,{
				end: false
			});



		console.log("code completed here ");

	}
};

