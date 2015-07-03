var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var sass = require('gulp-sass');

gulp.task("react", function(){

	gulp.src([
  		'./react/Operators.js', 
  		'./react/NumberPad.js', 
  		'./react/Display.js',
  		'./react/Calculator.js'
  	])
  	.pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("public/assets/js"));

});

gulp.task("sass", function(){

	gulp.src('./sass/*.scss')
	.pipe(sass({
        errLogToConsole: true
    }))
    .pipe(gulp.dest('public/assets/css'));

});

gulp.task("default", function () {

    gulp.watch(['./sass/*.scss', './sass/*/*.scss'], ['sass']);

    gulp.watch([
  		'./react/Operators.js', 
  		'./react/NumberPad.js', 
  		'./react/Display.js',
  		'./react/Calculator.js'
  	], ['react'])

});

gulp.task("build", ['react', 'sass']);