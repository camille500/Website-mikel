/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

/* TASK FOR COMPILING SASS TO CSS
----------------------------------------- */
gulp.task('sass', function() {
  return gulp.src('src/style/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/dist/style'))
});

/* GULP TASK FOR OPTIMIZING IMAGES
----------------------------------------- */
gulp.task('images', function(){
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('public/dist/images'))
});

/* WATCH SCSS FILES
----------------------------------------- */
gulp.task('watch', function(){
  gulp.watch('src/style/**/*.scss', ['sass']);
});
