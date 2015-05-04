/*globals module*/
module.exports = function (grunt) {
    "use strict";
    
    var hilaryFiles = [
            '../src/locales/en_US.js',
            '../src/interfaces/IButtons.js',
            '../src/interfaces/ICaption.js',
            '../src/interfaces/IEventEmitter.js',
            '../src/interfaces/IEvents.js',
            '../src/interfaces/IHtmlTemplateGenerator.js',
            '../src/interfaces/IManifest.js',
            '../src/interfaces/IMoviq.js',
            '../src/interfaces/IProgressMeter.js',
            '../src/interfaces/ISnapshot.js',
            '../src/interfaces/ISource.js',
            '../src/interfaces/ISourceParser.js',
            '../src/interfaces/ISourceManifestParser.js',
            '../src/interfaces/ITimeFormatter.js',
            '../src/interfaces/IVideo.js',
            '../src/interfaces/IVideoInitializer.js',
            '../src/implementations/consoleEventEmitter.js',
            '../src/implementations/defaultEventHandlers.js',
            '../src/implementations/defaultHtmlTemplates.js',
            '../src/implementations/simpleEventEmitter.js',
            '../src/implementations/snapshot.js',
            '../src/implementations/timeFormatter.js',
            // jQuery Implementations
            '../src/jQueryImplementations/IJqVideo.js',
            '../src/jQueryImplementations/jqButtons.js',
            '../src/jQueryImplementations/jqEventEmitter.js',
            '../src/jQueryImplementations/jqHtmlTemplateGenerator.js',
            '../src/jQueryImplementations/jqProgressMeter.js',
            '../src/jQueryImplementations/jqQuerySelectors.js',
            '../src/jQueryImplementations/jqSourceParser.js',
            '../src/jQueryImplementations/jqVideo.js',
            '../src/jQueryImplementations/jqVideoInitializer.js',
            '../src/models/CoverageReport.js',
            '../src/models/WatchReport.js',
            // Bootstrapper
            '../src/moviqBootstrapper.js'
        ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
            Watch the JS and LESS folders for changes. Triggering
            fires off the listed tasks
        **/
        watch: {
            js: {
                files: '../src/**/*.js',
                tasks: ["uglify:debug", "uglify:release", "copy:js"],
                options: { nospawn: true, livereload: true, debounceDelay: 250 }
            },
            css: {
                files: '../styles/moviq.css',
                tasks: ["copy:css"],
                options: { nospawn: true, livereload: true, debounceDelay: 250 }
            },
            examples: {
                files: '../examples/_public/**/*',
                tasks: ["copy:examples"],
                options: { nospawn: true, livereload: true, debounceDelay: 250 }
            }
        },
        /**
            Used for production mode, minify and uglyfy the JavaScript Output
        **/
        uglify: {
            debug: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    beautify: true,
                    mangle: false,
                    compress: false,
                    sourceMap: false,
                    drop_console: false,
                    preserveComments: 'some'
                },
                files: {
                    '../release/moviq.js': hilaryFiles
                }
            },
            release: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//                    mangle: true,
//                    compress: true,
//                    sourceMap: true,
//                    drop_console: true
                },
                files: {
                    '../release/moviq.min.js': hilaryFiles
                }
            }
        },
        copy: {
            js: {
                files: [
                    { src: ['../lib/hilary.min.js'], dest: '../examples/nodeapp/public/scripts/lib/hilary/hilary.min.js', filter: 'isFile' },
                    { src: ['../release/moviq.js'], dest: '../examples/nodeapp/public/scripts/moviq.js', filter: 'isFile' },
                    //{ src: ['../release/moviq.js.map'], dest: '../examples/nodeapp/public/scripts/moviq.js.map', filter: 'isFile' },
                    { src: ['../release/moviq.min.js'], dest: '../examples/nodeapp/public/scripts/moviq.min.js', filter: 'isFile' }
                    //,{ src: ['../release/moviq.min.js.map'], dest: '../examples/nodeapp/public/scripts/moviq.min.js.map', filter: 'isFile' }
                ]
            },
            css: {
                files: [
                    { src: ['../styles/moviq.css'], dest: '../examples/nodeapp/public/styles/moviq.css', filter: 'isFile' }
                ]
            },
            examples: {
                files: [
                    { src: ['../examples/_public/captions/example.vtt'], dest: '../examples/nodeapp/public/captions/example.vtt', filter: 'isFile' },
                    { src: ['../examples/_public/styles/main.css'], dest: '../examples/nodeapp/public/styles/main.css', filter: 'isFile' }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('mon', ['watch']);
    grunt.registerTask('default', ["uglify:debug", "uglify:release", "copy:js", "copy:css", "copy:examples"]);

};
