module.exports = function(grunt) {
	grunt.initConfig({
		
		cssmin : {
		    options : {
		    	banner: '/* Minified on <%= grunt.template.date() %>*/\n'
		    },
		    app : {
		    	files : {
		    		'public/css/vendor.min.css' : [
		    			'public/css/vendor/*.css'
	    			],
	    			'public/css/app.min.css' : [
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
					"public/js/vendor.min.js" : [
					    'public/js/vendor/jquery.js',
					    'public/js/vendor/modernizr.js',
					    'public/js/vendor/foundation.min.js',
					    'public/js/vendor/slick.min.js',
					],
					"public/js/app.min.js" : [
						'public/js/app/allenjoseph.js'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask("default", ['cssmin','uglify']);
};