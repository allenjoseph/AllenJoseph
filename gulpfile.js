var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

var ext = {
	alljs: '**/*.js',
	allcss: '**/*.css',
	js: '*.js',
	css: '*.css'
}

var config = {
	dist: {
		root: './dist/',
		index: './dist/index.html',
		js: './dist/js/',
		css: './dist/css/',
		vendor: './dist/bower_components/',
		vendorJsOrder: [
			'./dist/bower_components/angular.js',
			'./dist/bower_components/*.js'
		]
	},
	client: {
		index: './client/index.html',
		js: './client/app/**/*.js',
		css: './client/css/**/*.css',
		html: './client/app/**/*.html',
		fonts: './bower_components/font-awesome/fonts/*.*',
		jsOrder: [
			'./client/app/**/app.modules.js',
			'./client/app/**/*.module.js',
			'./client/app/**/*.js'
		]
	}
};

gulp.task('jshint', function() {
	return gulp
	.src(config.client.js)
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
	.pipe($.jshint.reporter('fail'))
	//.pipe($.jscs());
});

gulp.task('clean', function(done) {
	return del(config.dist.root, done);
});

gulp.task('copy:vendor', ['clean'], function(){
	return gulp
	.src(bowerFiles(), { base: './bower_components' })
	.pipe(gulp.dest(config.dist.vendor));
});

gulp.task('copy:fonts', ['copy:vendor'], function(){
	return gulp
	.src(config.client.fonts)
	.pipe(gulp.dest(config.dist.vendor + 'fonts'));
});

gulp.task('copy:js', ['copy:fonts'], function(){
	return gulp
	.src(config.client.js)
	.pipe(gulp.dest(config.dist.js));
});

gulp.task('copy', ['copy:js'], function(){
	return gulp
	.src(config.client.index)
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('html2js', ['copy'], function(){
	return gulp
	.src(config.client.html)
	.pipe($.ngHtml2js({moduleName: 'app.partials'}))
	.pipe($.concat('app.partials.js'))
	.pipe(gulp.dest(config.dist.js));
});

gulp.task('inject:vendor', ['html2js'], function(){
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(bowerFiles(), { read: false }),{ name: 'vendor' }))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('inject:js', ['inject:vendor'], function(){
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(config.dist.js + ext.alljs, config.client.jsOrder), {relative: true}))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('inject', ['inject:js'], function(){
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(config.dist.css + ext.allcss), {relative: true}))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('connect', function () {
	$.connect.server({
		root: ['dist'],
		port: 8000,
		livereload: true
	});
});

gulp.task('default', [
	'jshint',
	'inject',
	'connect'
]);
