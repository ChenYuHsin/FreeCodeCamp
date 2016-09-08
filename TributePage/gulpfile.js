/*!
 * gulp
 * npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    connect = require('gulp-connect');
    htmlmin = require('gulp-htmlmin');
    gulp_sass= require('gulp-sass')


// 開啟含 livereload的 web_server
gulp.task('server_on',function(){
	connect.server({
		livereload:true,
	});
});

// 重新整理頁面
gulp.task('reload',function(){
	return gulp.src('index.html')
		.pipe(connect.reload())
    .pipe(notify({message:'reload completed'}));
});

// Watch
gulp.task('watch', ['server_on'], function() {
  // Watch any files in dist/, reload on change
  gulp.watch('*.*',['reload']);

});