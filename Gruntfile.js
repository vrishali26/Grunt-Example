module.exports = function(grunt) {
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };
    grunt.initConfig({
        yeoman: appConfig,
        pkg: grunt.file.readJSON('package.json'),
        concat:{
            options:{
                separator:';'
            },
            dist:{
                files:{
                    '<%= yeoman.dist %>/scripts/<%= pkg.name %>.js':['<%= yeoman.app %>/scripts/**/*.js', '<%= yeoman.app %>/scripts/*.js'],
                    '<%= yeoman.dist %>/styles/<%= pkg.name %>.css':['<%= yeoman.app %>/styles/*.css']
                }
            }
        },
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist:{
                files:{
                    '<%= yeoman.dist %>/scripts/<%= pkg.name %>.min.js': ['<%= yeoman.dist %>/scripts/<%= pkg.name %>.js']
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/<%= pkg.name %>.min.css': ['<%= yeoman.dist %>/styles/<%= pkg.name %>.css']
                }
            }
        },
        jshint:{
            files:['Gruntfile.js', '<%= yeoman.app %>/scripts/**/*.js', 'test/**/**/*.js'],
            options:{
                globals:{
                    jQuery: true,
                    console:true,
                    module: true,
                    documents: true
                }
            }
        },
        watch:{
            scripts:{
                files:['<%= yeoman.app %>/scripts/**/*.js', '<%= yeoman.app %>/scripts/*.js', '<%= yeoman.app %>/styles/*.css'],
                tasks:['concatwatch']
            },
            uglify:{
                files:['<%= yeoman.app %>/scripts/*.js'],
                tasks:['uglify']
            },
            cssmin :{
                files:['<%= yeoman.dist %>/styles/<%= pkg.name %>.css'],
                tasks:['cssmin']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('test', ['jshint']);


    grunt.registerTask('default', 'Run Default Grunt', function (target) {
        grunt.task.run([
            'concat', 'uglify', 'cssmin', 'watch'
        ]);
    });

    grunt.registerTask('test', 'Run Default Grunt', function (target) {
        grunt.task.run([
            'concat', 'watch'
        ]);
    });
    
    grunt.registerTask('concatwatch', 'Concat Watch', function(target){
        grunt.task.run([
            'concat'
        ]);
    });
};