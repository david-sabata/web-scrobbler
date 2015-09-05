'use strict';

/* global module, require */
module.exports = function(grunt) {

	var jsConnectorFiles = ['connectors/v2/*.js', 'connectors/22tracks.js', 'connectors/archive.js', 'connectors/bandcamp.js', 'connectors/blinkboxmusic.js', 'connectors/ambientsleepingpill.js']; // intentionally does not contain all files yet
	var jsCoreFiles = ['Gruntfile.js', 'popup.js', 'core/**/*.js', 'options/options.js', 'popups/*.js'];
	var jsTestFiles = ['tests/**/*.js'];
	var jsonFiles = ['*.json', '.jshintrc'];
	var htmlFiles = ['*.html', 'options/*.html', 'popups/*.html', 'dialogs/**/*.html'];
	var cssFiles = ['options/options.css', 'popups/base.css', 'dialogs/base.css'];

	grunt.initConfig({
		jshint: {
			all: [jsCoreFiles, jsConnectorFiles],
			options: {
				jshintrc: true,
				reporter: require('jshint-stylish')
			}
		},
		compress: {
			main: {
				options: {
					archive: 'web-scrobbler.zip',
					pretty: true
				},
				expand: true,
				src: ['*.*', 'connectors/**', 'options/**', 'vendor/**']
			}
		},
		lintspaces: {
			all: {
				src: [
					jsCoreFiles, jsConnectorFiles, cssFiles, htmlFiles, jsTestFiles
				],

				options: {
					editorconfig: '.editorconfig',
					ignores: [
						'js-comments'
					]
				}
			}
		},
		jsonlint: {
			sample: {
				src: [ jsonFiles ]
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			strict: {
				src: [cssFiles]
			}
		},
		exec: {
			run_tests: {
				command: 'node tests/runner.js'
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.registerTask('lint', ['jshint', 'csslint']);
	grunt.registerTask('test', ['exec:run_tests']);
	grunt.registerTask('default', ['lint', 'lintspaces', 'jsonlint']);
};
