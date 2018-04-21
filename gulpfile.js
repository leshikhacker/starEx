var gulp = require('gulp');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var mqpacker = require('css-mqpacker');
var postcssImport  = require("postcss-import");


gulp.task('serve', ['css'], function() {

  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3010
  });

  gulp.watch("./css/postcss/*.pcss", ['css']);
  gulp.watch("./css/postcss/**/*.pcss", ['css']);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
  gulp.watch("./images/*").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('css', function () {
  return gulp.src('./css/postcss/main.pcss')
    .pipe(postcss([
      postcssImport(),
      precss,
      autoprefixer({browsers: ['last 2 versions']}),
      mqpacker
    ]))
    .pipe(rename({
      extname: ".css"
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);


