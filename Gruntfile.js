module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			/*The rules for JS hinting can be found at 
		http://www.jshint.com/docs/options/
			 */
			options:{
				undef:false,     //checked
				unused:false,     //checked
				curly:true,      //checked
				eqeqeq:true,     //checked
				immed:true,      //checked
				latedef: true,
				newcap:true,
				noarg:true,
				sub:true,
				boss:true,
				eqnull:true,
				browser:true,
				predef: ["jQuery", "$"],
				ignores:['www/js/development/theme/handlebars.js',
				         'www/js/development/theme/cordova-2.7.0.js',
				         'www/js/development/theme/phonegap-websocket.js',
				         'www/js/development/theme/socket.io.js']
			},
			/*'all' is an array of files / folders that are to be included in the JS Lint*/
			files: ['www/js/development/theme/*.js'],
		},
		concat:{
			options: {
				separator: ';',
			},
			jsConcat:{
				src:[
				     	//'www/js/production/minified/cordova.min.js',
				     	'www/js/production/minified/websocket.min.js',
				     	'www/js/production/minified/socket-io.min.js',
						'www/js/production/minified/index.min.js'
				     ],
				     dest:'www/js/production/combined.min.js'
			},
			bootstrapContcat:{
				src:[
					 'www/js/production/minified/bootstrap-carousel.min.js',
					 'www/js/production/minified/bootstrap-dropdown.min.js',
				     'www/js/production/minified/bootstrap-transition.min.js',
				     'www/js/production/minified/bootstrap-tooltip.min.js',
				     'www/js/production/minified/bootstrap-tab.min.js',
				     'www/js/production/minified/bootstrap-modal.min.js',
				     'www/js/production/minified/bootstrap-popover.min.js'
				     ],
				     dest:'www/js/production/bootstrap.min.js',
			}
		},
		uglify: {
			options:{
				report:'gzip',
				except:['jQuery']
			},
			uglifyjs: {
				files: {
					 'www/js/production/minified/bootstrap-carousel.min.js':['www/js/development/bootstrap/bootstrap-carousel.js'],
					 'www/js/production/minified/bootstrap-dropdown.min.js':['www/js/development/bootstrap/bootstrap-dropdown.js'],
				     'www/js/production/minified/bootstrap-transition.min.js':['www/js/development/bootstrap/bootstrap-transition.js'],
				     'www/js/production/minified/bootstrap-tooltip.min.js':['www/js/development/bootstrap/bootstrap-tooltip.js'],
				     'www/js/production/minified/bootstrap-tab.min.js':['www/js/development/bootstrap/bootstrap-tab.js'],
				     'www/js/production/minified/bootstrap-modal.min.js':['www/js/development/bootstrap/bootstrap-modal.js'],
				     'www/js/production/minified/bootstrap-popover.min.js':['www/js/development/bootstrap/bootstrap-popover.js'],
					 
				     /** The index.js to hold the main functionality **/
					 'www/js/production/minified/index.min.js':['www/js/development/theme/index.js'],
					 
					 /** Phone gap and sockect IO related stuff**/
					 //'www/js/production/minified/cordova.min.js':['www/js/development/theme/cordova-2.7.0.js'],
					 'www/js/production/minified/websocket.min.js':['www/js/development/theme/phonegap-websocket.js'],
					 'www/js/production/minified/socket-io.min.js':['www/js/development/theme/socket.io.js'],
					 
				}
			}
		}
		
		});
		

	// Load the plugin that provides the various tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// Default task(s).
	grunt.registerTask('default', ['jshint','uglify','concat']);

};