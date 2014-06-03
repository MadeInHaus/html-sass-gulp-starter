module.exports = function(grunt) {

    // Watcher for sass compilation and js hinting

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            main: {
                options: {
                    baseUrl: "static/js",
                    name: "main",
                    include: "libs/require",
                    wrap: true,
                    inlineText: true,
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    skipModuleInsertion: false,
                    optimize: "uglify2",
                    optimizeCss: "standard",
                    mainConfigFile: "static/js/config.js",
                    out: "static/js/main-built.js",

                    /*
                     * https://github.com/SlexAxton/require-handlebars-plugin
                     */
                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser: true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },

                    // Default i18n
                    locale: "en_us",

                    // options object which is passed to Handlebars compiler
                    hbs: {
                        templateExtension: "html",
                        disableHelpers: false
                    }
                }
            }

        },

        jshint: {
            // don't be so strict
            options: {
                '-W008': true,
                '-W030': true
            },
            all: ['static/js/app/**.js']
        },

        compass: {
            dist: {
                options: {
                    basePath: 'static',
                    cssDir: 'css',
                    sassDir: 'css/src',
                    imagesDir: 'img',
                    relativeAssets: true
                }
            }
        },

        watch: {
            css: {
                options: {
                    debounceDelay: 200,
                    interrupt: true
                },
                files: [
                    'static/css/src/**/*.{scss,sass}'
                ],
                tasks: ['compass']
            },

            js: {
                options: {
                    debounceDelay: 200,
                    interrupt: true
                },
                files: [
                    'static/js/app/*.js',
                    'static/js/app/**/*.js'
                ],
                tasks: ['jshint']
            }
        },

        connect: {
            server: {
                options: {
                    //protocol: 'https',
                    hostname: '*',
                    port: 8000,
                    base: './static'
                }
            }
        }
    });

    // on watch events configure jshint:all to only run on changed file
    grunt.event.on('watch', function(action, filepath) {
        grunt.config(['jshint', 'changed'], filepath);
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', "Run for local development.", function() {
        grunt.log.writeln('\n================================ \n Running the "default" task...\n================================');
        grunt.task.run('compass');
        grunt.task.run('jshint');
    });

    // Dev task(s).
    grunt.registerTask('dev', "Run for local development.", function() {
        grunt.log.writeln('\n============================== \n- Compiling css... \n- Running a server... \n- Watching for changes... \n==============================');
        grunt.task.run('compass');
        grunt.task.run('connect');
        grunt.task.run('watch');
    });

    // Production/Build task(s).
    grunt.registerTask('prod', "Run for production development.", function() {
        grunt.log.writeln('\n======================================= \n Building a production environment...\n=======================================');
        grunt.task.run('requirejs:main');
        grunt.task.run('compass');
    });

};
