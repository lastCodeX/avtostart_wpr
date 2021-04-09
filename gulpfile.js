const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const cssnano = require('gulp-cssnano')


sass.compiler = require('node-sass')

//подключаем sass
function sass() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}

//объединяем и минифицируем js
function scripts() {
  return gulp.src(['./js/common.js'])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
}

//объединяем и минифицируем css
function cssLibs() {
  return gulp.src([
          './app/libs/bootstrap-4.2.1-dist/css/bootstrap.min.css',
          './app/css/fonts.css',
          './app/css/main_1.css',
          './app/css/media.css'
  ])
      .pipe(cssnano())
      .pipe(concat('libs.min.css'))
      .pipe(gulp.dest('./dist/css'));
}

//включаем watch 
function watch() {
  gulp.watch('./sass/**/*.scss', sass());
}

