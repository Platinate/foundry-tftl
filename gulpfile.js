var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(cb) {
  gulp
    .src('sass/tftl.scss')
    .pipe(sass())
    .pipe(
      gulp.dest("./")
    );
  cb();
});

gulp.task(
  'default',
  gulp.series('sass', function(cb) {
    gulp.watch('sass/*.scss', gulp.series('sass'));
    cb();
  })
);