const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sassGlob = require('gulp-sass-glob');

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss') // パスを修正
    .pipe(plumber({errorHandler: notify.onError(
      "Error: <%= error.message %>"
    )}))
    .pipe(sassGlob()) // 追加: Sassファイルのglob importを有効にします
    .pipe(sass())
    .pipe(sass({outputStyle: 'expanded'})) // 追加: コンパイル後のCSSのスタイルを展開形式に指定します
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

  gulp.watch('./sass/*.scss', gulp.series('sass')); // パスを修正
});

gulp.task('default', gulp.series('sass', 'serve'));
