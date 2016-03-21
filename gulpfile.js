var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var del = require('del');
var runSequence = require('run-sequence');
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
		assets: './dist/assets/',
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
		assets: './client/assets/**/*.*',
		jsOrder: [
			'./client/app/**/app.modules.js',
			'./client/app/**/app.*.js',
			'./client/app/**/*.js'
		]
	},
	vendor: './bower_components/'
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

gulp.task('copy:assets', function(){
	return gulp
	.src(config.client.assets)
	.pipe(gulp.dest(config.dist.assets));
});

gulp.task('copy:vendor', function(){
	return gulp
	.src(bowerFiles(), { base: './bower_components' })
	.pipe(gulp.dest(config.dist.vendor));
});

gulp.task('copy:fonts', function(){
	return gulp
	.src(config.vendor + '**/*.{eot,svg,ttf,woff,woff2}')
	.pipe(gulp.dest(config.dist.vendor));
});

gulp.task('copy:js', function(){
	return gulp
	.src(config.client.js)
	.pipe(gulp.dest(config.dist.js));
});

gulp.task('copy', ['copy:vendor', 'copy:fonts', 'copy:js', 'copy:assets'], function(){
	return gulp
	.src(config.client.index)
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('html2js', function(){
	return gulp
	.src(config.client.html)
	.pipe($.ngHtml2js({moduleName: 'app.partials'}))
	.pipe($.concat('app.partials.js'))
	.pipe(gulp.dest(config.dist.js));
});

gulp.task('inject:vendor', function(){
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

gulp.task('build', function() {
	runSequence(
		'clean',
		['copy', 'html2js'],
		'inject',
		'connect'
	);
});

gulp.task('release', function() {
});

gulp.task('default', ['release']);
