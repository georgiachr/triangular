/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `app/styles/importer.less` instead.)

var cssFilesToInject = [
    'styles/*.css',
];

// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Dependencies like sails.io.js, jQuery, or Angular
  // are brought in here
    'app/dependencies/sails.io.js',
    'app/dependencies/jquery.js',
    'app/dependencies/angular.js',
    'app/dependencies/angular-animate.js',
    'app/dependencies/Chart.js',
    'app/dependencies/angular-chart.js',
    'app/dependencies/angular-cookies.js',
    'app/dependencies/digest-hud.js',
    'app/dependencies/angular-dragula.js',
    'app/dependencies/ng-google-chart.js',
    'app/dependencies/lodash.js',
    'app/dependencies/angular-google-maps.js',
    'app/dependencies/highlight.pack.js',
    'app/dependencies/angular-highlightjs.js',
    'app/dependencies/angular-linkify.js',
    'app/dependencies/angular-local-storage.js',
    'app/dependencies/angular-aria.js',
    'app/dependencies/angular-material.js',
    'app/dependencies/md-data-table.min.js',
    'app/dependencies/angular-messages.js',
    'app/dependencies/moment.js',
    'app/dependencies/angular-moment.js',
    'app/dependencies/angular-resource.js',
    'app/dependencies/angular-sanitize.js',
    'app/dependencies/angular-touch.js',
    'app/dependencies/angular-translate.js',
    'app/dependencies/angular-translate-loader-partial.js',
    'app/dependencies/angular-translate-storage-cookie.js',
    'app/dependencies/angular-translate-storage-local.js',
    'app/dependencies/fullcalendar.js',
    'app/dependencies/calendar.js',
    'app/dependencies/angular-ui-router.js',
    'app/dependencies/countUp.js',
    'app/dependencies/rangy-core.js',
    'app/dependencies/rangy-classapplier.js',
    'app/dependencies/rangy-highlighter.js',
    'app/dependencies/rangy-selectionsaverestore.js',
    'app/dependencies/rangy-serializer.js',
    'app/dependencies/rangy-textrange.js',
    'app/dependencies/textAngular.js',
    'app/dependencies/textAngular-sanitize.js',
    'app/dependencies/textAngularSetup.js',

    //Load triangular js
    'app/dependencies/triangular.js',

    // Load my Modules (only *.module.js files) to create Modules
    'app/modules/**/*.module.js',

    // Load main application module (app) to create App
    'app/app.module.js',

    //Load my Services
    'app/services/**/*.js',

    //Load Controllers not included in a module
    'app/controllers/**/*.js',

    //Load Controllers from my modules
    'app/modules/**/controllers/*Controller.js',

    'app/directives/**/*.js',
    'app/values/**/*.js',
    //'app/modules/**/.js',

    //Load modules' Config files
    'app/config/*.js',
    'app/modules/**/*.config.js',
    'app/*.js'


];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html',
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'client/' + path;
});
