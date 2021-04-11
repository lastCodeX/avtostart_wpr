const gulp = require('gulp')
const {parallel, watch} = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const cssnano = require('gulp-cssnano')
const browserSync = require('browser-sync').create()
const del = require('del')
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')



sass.compiler = require('node-sass')

//подключаем sass
function sassToCss(cb) {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css')),
    cb()
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
          './css/fonts.css',
          './css/main.css',
          './css/media.css'
  ])
      .pipe(cssnano())
      .pipe(concat('libs.min.css'))
      .pipe(gulp.dest('./dist/css'));
}

//включаем live reload
function browser_Sync() {
  browserSync.init({
      server: {
          baseDir: './'
      },
      notify: false
  });
}

// сборка ресурсов в папку dist
let filesToMove = [
  './fonts/**/*',
  './*.html'
];

function move() {
    gulp.src(filesToMove, {base: './'})
    .pipe(gulp.dest('dist'));
}

// очистка папки dist
function clean() {
  return del.sync('./dist');
}

//очистка кэша
function clear() {
  return cache.clearAll();
}

// сжатие картинок gif, jpg, svg
function img() {
  return gulp.src('./img/*')
      .pipe(cache(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
            ]
        })

      ])))
      .pipe(gulp.dest('./dist/img'));
}

//продакшен
exports.build = parallel(
      clean,
      clear,
      sassToCss,
      scripts,
      cssLibs,
      img,
      move
  )


//включаем watch 
function watchFiles(){
  watch('./sass/**/*.scss', sassToCss).on('change', browserSync.reload)
  watch('./index.html').on('change', browserSync.reload)
  watch('./js/*.js').on('change', browserSync.reload)
}

// live reload в рабочей папке
exports.dev = parallel(
    browser_Sync,
    watchFiles
  )

