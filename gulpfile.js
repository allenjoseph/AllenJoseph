var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({lazy: true});
var removeDirectories = require('remove-empty-directories');
var proxy = require('http-proxy-middleware');

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
		min: './dist/min/',
		release: [
			'./dist/js/app.modules.js',
			'./dist/js/app.*.js',
			'./dist/js/**/*.js'
		]
	},
	client: {
		index: './client/index.html',
		js: './client/app/**/*.js',
		sass: './client/sass/**/*.scss',
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

gulp.task('clean:release', function(done) {
	return del([
		config.dist.root + ext.alljs,
		'!' + config.dist.root + 'allenjoseph.min.js',
	], done);
});

gulp.task('clean:directories', function(){
	return removeDirectories(config.dist.root);
})

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

gulp.task('inject:js', function(){
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(config.dist.js + ext.alljs, config.client.jsOrder), {relative: true}))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('inject:css', function(){
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(config.dist.css + ext.allcss), {relative: true}))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('inject', function() {
	return runSequence(
		'inject:vendor',
		'inject:js',
		'inject:css'
	);
});

gulp.task('inject:release', function() {
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(config.dist.root + ext.alljs), {relative: true}))
	.pipe($.inject(gulp.src(config.dist.root + ext.allcss), {relative: true}))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('sass', function () {
	return gulp
	.src(config.client.sass)
	.pipe($.sass().on('error', $.sass.logError))
	.pipe(gulp.dest(config.dist.css));
});

gulp.task('compress', function(){
	var lib = require('bower-files')();
	return gulp
	.src(lib.ext('js').files.concat(config.dist.release))
	.pipe($.concat('allenjoseph.min.js'))
	.pipe($.uglify())
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('watch', function () {
	gulp.watch(config.client.sass, ['sass']);
	gulp.watch(config.client.html, ['html2js']);
	gulp.watch(config.client.js, ['jshint', 'copy:js']);
});

gulp.task('connect', function () {
	$.connect.server({
		root: ['dist'],
		port: 8000,
		livereload: true,
		middleware: function(connect, o){
			return [
				proxy('/data', {
					target: 'http://localhost:3030',
					changeOrigin: true
				}),
				proxy('/feeds', {
					target: 'http://localhost:3030',
					changeOrigin: true
				})
			];
		}
	});
});

gulp.task('build', function() {
	return runSequence(
		'clean',
		['copy', 'html2js'],
		'sass',
		'inject',
		'connect',
		'watch'
	);
});

gulp.task('release', function() {
	return runSequence(
		'clean',
		['copy', 'html2js'],
		'compress',
		'sass',
		'clean:release',
		'clean:directories',
		'inject:release'
	);
});

gulp.task('default', ['release']);
