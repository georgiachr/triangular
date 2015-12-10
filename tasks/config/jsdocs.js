/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

	var path = 'c:/Users/Georgia Chr/workspace/mytriangular'
	grunt.config.set('jsdoc',{
		api: {
			src: [path+'/api/**/*.js',path + '/api/*.js'],
			options:{destination: 'docs-api'}
		},
		client: {
			src: [path+'/client/**/*.js',path+'/client/**/*.js'],
			options:{destination: 'docs-client'}
		}

		});

	grunt.loadNpmTasks('grunt-jsdoc');
};
