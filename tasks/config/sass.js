/**
 * Created by nstyl on 02-Dec-15.
 */
/**
 * Compile SCSS files
 */
module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
			files: [{
				expand: true,
				cwd: 'client/styles',
				src: ['app.scss'],
				dest: '.tmp/public/styles',
				ext: '.css',
				flatten:'false'
			}]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};
