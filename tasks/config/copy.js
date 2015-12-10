/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [
				{
					expand: true,
					cwd: './client',
					src: ['**/*.!(coffee|less|scss)'],
					dest: '.tmp/public'
				},
				{ // add js libraries
					expand: true,
					cwd: './bower_components',
					src: [
						// add angular js
						'angular-chart.js/angular-chart.js',
						'angular/angular.js',
						'angular-animate/angular-animate.js',
						'angular-mocks/angular-mocks.js',
						'angular-loader/angular-loader.js',
						'angular-touch/angular-touch.js',
						'angular-resource/angular-resource.js',
						'angular-ui-router/release/angular-ui-router.js',
						'angular-route/angular-route.js',
						'angular-material/angular-material.js',
						'angular-dragula/dist/angular-dragula.js',
						'angular-aria/angular-aria.js',
						'angular-xeditable/dist/js/xeditable.min.js',
						'angular-toastr/dist/angular-toastr.js',
						'angular-bootstrap-dropdown/dist/bsDropdown.min.js',
						'angular-smart-table/dist/smart-table.js',
						'ng-file-upload/ng-file-upload.js',
						'angular-file-saver/dist/angular-file-saver.bundle.js',
						'angular-dragula/dist/angular-dragula.js',
						'angular-cookies/angular-cookies.js',
						'angular-toastr/dist/angular-toastr.tpls.js',
						'angular-bootstrap/ui-bootstrap-tpls.js',
						'angular-translate/angular-translate.js',
						'angular-translate-loader-partial/angular-translate-loader-partial.js',
						'angular-translate-storage-cookie/angular-translate-storage-cookie.js',
						'angular-translate-storage-local/angular-translate-storage-local.js',
						'angular-sanitize/angular-sanitize.js',
						'angular-messages/angular-messages.js',
						'angular-local-storage/dist/angular-local-storage.js',
						'angular-linkify/angular-linkify.js',
						'angular-highlightjs/build/angular-highlightjs.js',
						'angular-google-maps/dist/angular-google-maps.js',
						'angular-google-chart/ng-google-chart.js',
						'angular-ui-calendar/src/calendar.js',
						'angular-moment/angular-moment.js',
						'angular-material-data-table/dist/md-data-table.min.js',
						'angular-cookies/angular-cookies.js',
						'angular-digest-hud/digest-hud.js',
						'angular-translate-storage-cookie/angular-translate-storage-cookie.js',
						//
						// other libraries
						//
						'jquery/dist/jquery.js',
						'highlightjs/highlight.pack.js',
						'moment/moment.js',
						'chart.js/chart.js',
						'fullcalendar/dist/fullcalendar.js',
						'lodash/lodash.js',
						'countUp.js/countUp.js',
						'rangy/rangy-core.js',
						'rangy/rangy-selectionsaverestore.js',
						'rangy/rangy-classapplier.js',
						'rangy/rangy-highlighter.js',
						'rangy/rangy-serializer.js',
						'rangy/rangy-textrange.js',
						'textAngular/src/textAngular.js',
						'textAngular/src/textAngular-sanitize.js',
						'textAngular/src/textAngularSetup.js'


					],
					flatten: true,
					dest: '.tmp/public/app/dependencies'
				},
				{ // add bootstrap css
					expand: true,
					cwd: './bower_components',
					src: [
						'angular/angular-csp.css',
						'angular-chart.js/dist/angular-chart.css',
						'angular-dragula/dist/dragula.min.css',
						'angular-material-data-table/dist/md-data-table.min.css',
						'fullcalendar/dist/fullcalendar.css',
						'font-awesome/css/font-awesome.css',
						'material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
						'textAngular/src/textAngular.css',
						'weather-icons/css/weather-icons.css',
						'angular-material/angular-material.min.css'
					],
					flatten: true,
					dest: '.tmp/public/styles'
				},

				{ // add bootstrap fonts
					expand: true,
					cwd: './bower_components',
					src: [
						'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
						'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
						'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
						'highlightjs/styles/monokai.css'
					],
					flatten: true,
					dest: '.tmp/public/fonts'
				},
				{ // add js libraries
					expand: true,
					cwd: './client-libaries',
					src: [
						'*.html',
						'triangular/**/*.html'

					],
					flatten: false,
					dest: '.tmp/public/templates'
				}

			]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
