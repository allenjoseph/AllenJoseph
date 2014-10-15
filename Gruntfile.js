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
					"public/js/allenjoseph.min.js" : [
					    'public/vendor/jquery/jquery.js',
					    'public/vendor/slick-carousel/slick.min.js',
                        'public/vendor/underscore/underscore.js',
                        'public/vendor/backbone/backbone.js',

                        'js/app/init.js',
                        'js/app/models/models.js',
                        'js/app/collections/collections.js',
                        'js/app/views/menu.js',
                        'js/app/views/menuList.js',
                        'js/app/views/feedMini.js',
                        'js/app/views/feed.js',
                        'js/app/views/feedList.js',
                        'js/app/views/info.js',
                        'js/app/views/socialLink.js',
                        'js/app/views/socialLinkList.js',
                        'js/app/views/section.js',
                        'js/app/views/sectionList.js',
                        'js/app/views/footerItem.js',
                        'js/app/routers/routers.js',
                        'js/app/app.js'
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

	grunt.registerTask("default", ['cssmin','uglify']);
    grunt.registerTask("css", ['cssmin']);
};
