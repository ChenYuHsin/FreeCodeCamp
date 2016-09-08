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


// 編譯scss
gulp.task('compile_SCSS', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(gulp_sass())
    .pipe(cssnano())
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'compiled and minified .scss' }));
});

// 檢查 js並合併壓縮
gulp.task('uglify_js', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'uglified .js' }));
});

// Images 壓縮圖片
gulp.task('compress_images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'compressed images' }));
});

// Clean 清掉舊的 dist 檔案，並免不必要的錯誤
gulp.task('clean', function() {
  return del(['dist/css', 'dist/js', 'dist/images']);
});

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


// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('compile_SCSS', 'uglify_js', 'compress_images');
});

// Watch
gulp.task('watch', ['server_on'], function() {

  // Watch .scss files
  gulp.watch('src/SCSS/*.scss', ['compile_SCSS']);

  // Watch .js files
  gulp.watch('src/js/*.js', ['uglify_js']);

  // Watch image files
  gulp.watch('src/images/**/*', ['compress_images']);

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**','./*.html'],['reload']);
});
