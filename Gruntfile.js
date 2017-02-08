module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        // Bump version numbers
        version: {
            css: {
                options: {
                    prefix: 'Version\\:\\s'
                },
                src: [ 'style.scss' ],
            },
            php: {
                options: {
                        prefix: '\@version\\s+'
                },
                src: [ 'functions.php' ],
            }
        },
        // Commit and tag the new version
        gitcommit: {
            version: {
                options: {
                    message: 'New version: <%= pkg.version %>'
                },
                files: {
                    src: ['style.css', 'package.json', 'functions.php']
                }
            }
        },
        gittag: {
            version: {
                options: {
                    tag: '<%= pkg.version %>',
                    message: 'Tagging version <%= pkg.version %>'
                }
            }
        },
        gitpush: {
            version: {},
            tag: {
                options: {
                    tags: true
                }
            }
        },
        // Clean the build folder
        clean: {
            build: {
                src: ['build/']
            }
        },
        // Copy to build folder
        copy: {
            build: {
                src: ['**', '!node_modules/**', '!Gruntfile.js', '!package.json'],
                dest: 'build/',
            },
        },
        // Minify CSS files into NAME-OF-FILE.min.css
        cssmin: {
            build: {
                expand: true,
                src: ['*.css', '!*.min.css'],
                dest: 'build/',
                ext: '.min.css'
            }
        },
        // Compress the build folder into an upload-ready zip file
        compress: {
            build: {
                options: {
                    archive: 'build/<%= pkg.name %>.zip'
                },
                cwd: 'build/',
                src: ['**/*'],
                dest: '<%= pkg.name %>/'
            }
        },
        devUpdate: {
            main: {
                options: {
                    //task options go here
                }
            }
        }
    });

    // Load all grunt plugins here
//    grunt.loadNpmTasks('grunt-version');
//    grunt.loadNpmTasks('grunt-git');
//    grunt.loadNpmTasks('grunt-contrib-copy');
//    grunt.loadNpmTasks('grunt-contrib-clean');
//    grunt.loadNpmTasks('grunt-contrib-compress');
//    grunt.loadNpmTasks('grunt-contrib-cssmin');
//    grunt.loadNpmTasks('grunt-dev-update');
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    // Release task
    grunt.registerTask( 'release', [ 'version', 'gitcommit:version', 'gittag:version', 'gitpush:version', 'gitpush:tag' ]);

    // Build task
    grunt.registerTask( 'build', [ 'clean:build', 'copy:build', 'cssmin:build', 'compress:build' ]);

};
