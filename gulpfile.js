var gulp = require('gulp')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('html', function() {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('css', function() {
  return gulp.src(['./src/css/*.css', './src/sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('images', function() {
  gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', ['browserSync', 'build'], function() {
  gulp.watch('./src/*.html', ['html'])
  gulp.watch(['./src/sass/**/*.scss','./src/css/*.css'], ['css'])
  gulp.watch('./src/img/*', ['images'])
})

gulp.task('build', ['html', 'css', 'images'])

gulp.task('default', ['watch'])