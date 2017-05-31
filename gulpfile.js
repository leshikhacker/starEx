var gulp = require('gulp');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssImport  = require("postcss-import");
var cssvariables = require('postcss-css-variables');

gulp.task('serve', [], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  
  gulp.watch("./css/postcss/*.pcss", ['css']);
  gulp.watch("./css/postcss/**/*.pcss", ['css']);

  gulp.watch("./js/*.js").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('css', function () {
  return gulp.src('./css/postcss/main.pcss')
    .pipe(postcss([
      postcssImport(),
      autoprefixer({browsers: ['last 1 version']}),
      cssvariables
    ]))
    .pipe(rename({
      extname: ".css"
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
