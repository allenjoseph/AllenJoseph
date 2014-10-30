module.exports = function(grunt) {
	grunt.initConfig({

		cssmin : {
		    options : {
		    	banner: '/* Minified on <%= grunt.template.date() %>*/\n'
		    },
		    app : {
		    	files : {
		    		'public/css/allenjoseph.min.css' : [
                        'public/vendor/**/*.css',
                        'public/css/app/*.css'
	    			]
		    	}
		    }
		},

		uglify : {
			options : {
				compress : true,
				banner : '/* Minified on <%= grunt.template.date() %>*/\n'
			},
			app : {
				files : {
					'public/js/allenjoseph.min.js' : [
                        'public/vendor/jquery/jquery.js',
                        'public/vendor/slick-carousel/slick.min.js',
                        'public/vendor/underscore/underscore.js',
                        'public/vendor/backbone/backbone.js',
                        'public/js/app/init.js',
                        'public/js/app/models/models.js',
                        'public/js/app/collections/collections.js',
                        'public/js/app/views/menu.js',
                        'public/js/app/views/menuList.js',
                        'public/js/app/views/feedMini.js',
                        'public/js/app/views/feed.js',
                        'public/js/app/views/feedList.js',
                        'public/js/app/views/info.js',
                        'public/js/app/views/socialLink.js',
                        'public/js/app/views/socialLinkList.js',
                        'public/js/app/views/section.js',
                        'public/js/app/views/sectionList.js',
                        'public/js/app/views/footer.js',
                        'public/js/app/views/skill.js',
                        'public/js/app/views/skillList.js',
                        'public/js/app/views/video.js',
                        'public/js/app/views/videoList.js',
                        'public/js/app/views/alert.js',
                        'public/js/app/views/layout.js',
                        'public/js/app/routers/routers.js',
                        'public/js/app/app.js'
					]
				}
			}
		},

        bower: {
            install: {
                options: {
                    targetDir: './public/vendor',
                    layout:'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-task');

	grunt.registerTask('default', ['cssmin','uglify']);
    grunt.registerTask('css', ['cssmin']);
};
