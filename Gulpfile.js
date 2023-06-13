const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss') // パスを修正
    .pipe(sass())
    .pipe(gulp.dest('./css')) // パスを修正
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./**/*.css').on('change', browserSync.reload);
  gulp.watch('./**/*.js').on('change', browserSync.reload);

  gulp.watch('./assets/sass/*.scss', gulp.series('sass')); // パスを修正
});

gulp.task('default', gulp.series('sass', 'serve'));
