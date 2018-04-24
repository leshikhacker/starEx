const gulp = require('gulp');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const mqpacker = require('css-mqpacker');
const postcssImport  = require("postcss-import");
const imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');


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

gulp.task('sprite', function () {
  var spriteData = gulp.src('./fixtures/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('./images/sprites'));
});

gulp.task('image', ['sprite'], function () {
  gulp.src('./fixtures/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./images'));
});

gulp.task('default', ['serve']);


