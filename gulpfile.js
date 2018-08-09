'use strict'

const gulp = require('gulp')
const newer = require('gulp-newer')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConf = require('./webpack.config')

const browserSync = require('browser-sync').create()

const sass = require('gulp-sass')

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
  gulp.watch('src/*.html', ['html'])
  gulp.watch('src/sass/*.scss', ['sass'])
  gulp.watch('src/sass/**/*.scss', ['sass'])
  gulp.watch('src/**/**/*.js', ['js'])
  gulp.watch('src/img/**/*', ['images'])
  gulp.watch('src/models/*', ['models'])
})

gulp.task('js', () => {
  gulp.src('./src/js/index.js')
    .pipe(webpackStream(webpackConf), webpack)
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream())
})

gulp.task('models', () => {
  gulp.src('./src/models/*.json')
    .pipe(gulp.dest('./public/models'))
    .pipe(browserSync.stream())
})

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})

gulp.task('images', function () {
  return gulp.src('./src/img/*.*')
    .pipe(newer('./public/img'))
    .pipe(gulp.dest('./public/img'))
    .pipe(browserSync.stream())
})

gulp.task(
  'default',
  ['browserSync',
    'images',
    'html',
    'js',
    'sass',
    'models'
  ]
)