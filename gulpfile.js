const gulp = require('gulp')
const sass = require('gulp-sass')


sass.compiler = require('node-sass')

function sass() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}
 
function watch() {
  gulp.watch('./sass/**/*.scss', sass());
}