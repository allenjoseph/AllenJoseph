var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var html2js = require("gulp-ng-html2js");
var connect = require('gulp-connect');

var paths = {
	js: ['./client/app/**/*.js'],
	css: ['./client/css/**/*.css'],
	html: ['./client/app/**/*.html'],
	fonts: ['./bower_components/font-awesome/fonts/*.*']
};

var dist = {
	css: ['./dist/**/*.css'],
	js: ['./dist/app/**/*.js'],
	vendor: ['./dist/vendor/*.js']
};

gulp.task('copy', function(){
	gulp.src(bowerFiles()).pipe(gulp.dest('./dist/vendor'));
	gulp.src(paths.fonts).pipe(gulp.dest('./dist/vendor/fonts'));
	gulp.src(paths.js).pipe(gulp.dest('./dist/app'));

	return gulp.src('./client/index.html')
	.pipe(gulp.dest('./dist'));
});

gulp.task('html2js', function(){
	return gulp.src(paths.html)
	.pipe(html2js({moduleName: 'app.partials'}))
	.pipe(concat('app.partials.js'))
	.pipe(gulp.dest('./dist/app'));
});

gulp.task('inject:bower', ['html2js','copy'], function(){
	gulp.src('./dist/index.html')
	.pipe(inject(gulp.src(dist.vendor), {name: 'bower', relative: true}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('inject:js', ['inject:bower'], function(){
	gulp.src('./dist/index.html')
	.pipe(inject(gulp.src(dist.js), {relative: true}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('inject:css', ['inject:js'], function(){
	gulp.src('./dist/index.html')
	.pipe(inject(gulp.src(dist.css), {relative: true}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('connect', ['inject:css'], function () {
	connect.server({
		root: ['dist'],
		port: 8000,
		livereload: true
	});
});

gulp.task('default', [
	'connect'
]);
