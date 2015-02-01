module.exports = function(grunt){
    //load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
        'grunt-contrib-less',
        'grunt-lint-pattern'
    ].forEach(function(task){
            grunt.loadNpmTasks(task);
        });

    //configure plugins
    grunt.initConfig({
        cafemocha: {
            all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }}
        },
        jshint: {
            app: ['fantasyfrc.js', 'public/js/**/*.js', 'lib/**/*.js'],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
        },
        exec: {
            linkchecker: { cmd: 'linkchecker http://localhost:3000' }
        },
        less: {
            development: {
                options: {
                    customFunctions: {
                        static: function(lessObject, name) {
                            return 'url("' + require('./lib/static.js').map(name.value) + '")';
                        }
                    }
                },
                files: {
                    'public/css/main.css': 'less/main.less'
                }
            }
        },
        lint_pattern: {
            view_statics: {
                options: {
                    rules: [
                        {
                            pattern: /<link [^>]*href=["'](?!\{\{static )/,
                            message: 'Un-mapped static resource found in <link>.'
                        },
                        {
                            pattern: /<script [^>]*src=["'](?!\{\{static )/,
                            message: 'Un-mapped static resource found in <script>.'
                        },
                        {
                            pattern: /<img [^>]*src=["'](?!\{\{static )/,
                            message: 'Un-mapped static resource found in <img>.'
                        }
                    ]
                },
                files: {
                    src: [
                        'views/**/*.handlebars'
                    ]
                }
            },
            css_statics: {
                options: {
                    rules: [
                        {
                            pattern: /url\(/,
    message: 'Un-mapped static found in LESS property.'
                        },
                    ]
                },
                files: {
                    src: [
                        'less/**/*.less'
                    ]
                }
            }
        }
    });

    //register tasks
    grunt.registerTask('default', ['cafemocha', 'jshint', 'exec', 'lint_pattern']);
};