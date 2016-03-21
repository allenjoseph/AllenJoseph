var gulp = require('gulp');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var html2js = require("gulp-ng-html2js");

var paths = {
	js: ['./client/app/js/**/*.js', '!*.min.js'],
	css: []
}

gulp.task('inject:bower', function(){
	return gulp.src('./client/index.html')
	.pipe(inject(gulp.src(bowerFiles(), {relative: true}), {name: 'bower'}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('inject:js', function(){
	return gulp.src('./dist/index.html')
	.pipe(inject(gulp.src(paths.js), {relative: true}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('inject:css', function(){
	return gulp.src('./dist/index.html')
	.pipe(inject(gulp.src(paths.css), {relative: true}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('html2js', function(){
	return gulp.src(paths.html)
		.pipe(html2js({moduleName: 'app.partials'}))
		.pipe(concat('app.partials.js'))
		.pipe(gulp.dest('./dist/app'));
});

gulp.task('default', [
	'inject:bower',
	'inject:js',
	'inject:css'
]);
