/*
    Gulp Box | https://github.com/andreystarkov/gulp-box
*/

var gulp    = require('gulp'),
    gutil   = require('gulp-util');
    plugins = require('gulp-load-plugins')();

    gulp.task('default', ['scripts', 'styles', 'watch']);

    var theLibs = [
     'app/libs/jquery/dist/jquery.min.js',
   //  'app/libs/react/react.min.js',
  //   'app/libs/reflux/dist/reflux.min.js',
     'app/libs/bootstrap/dist/js/bootstrap.min.js',
     'app/libs/js-cookie/src/js.cookie.js',
   //  'app/libs/nouislider/distribute/nouislider.min.js',
     'app/libs/bootstrap-material-design/scripts/material.js',
     'app/libs/bootstrap-material-design/scripts/ripples.js',
     'app/libs/ZoomSlider/js/dynamics.min.js',
     'app/libs/ZoomSlider/js/classie.min.js',
     'app/libs/ZoomSlider/js/main.js',
     'app/libs/snabbt.js/snabbt.min.js',
     'app/libs/moment/min/moment-with-locales.min.js',
     'app/libs/jquery-bar-rating/dist/jquery.barrating.min.js',
     'app/scripts/etc/*.js',
     'app/scripts/*.js'
    ];

    gulp.task('scripts', function() {
      return gulp.src(theLibs)
     //   .pipe(plugins.uglify())
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest('app/app'));
    });

    gulp.task('styles', function() {
        return gulp.src(['app/styles/styles.less'])
            .pipe(plugins.plumber())
            .pipe(plugins.less())
            .on('error', function (err) {
                gutil.log(err);
                this.emit('end');
            })
        /*    .pipe(plugins.autoprefixer(
                {
                    browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
                    cascade: false
                }
            ))
            .pipe(plugins.cssmin()) */
            .pipe(gulp.dest('app/app')).on('error', gutil.log);
    });

    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');
    var jpegtran = require('imagemin-jpegtran');
    var gifsicle = require('imagemin-gifsicle');

    gulp.task('images', function () {
        return gulp.src(['app/images/**/*.jpg', 'app/images/**/*.png'])
            .pipe(plugins.imagemin({
                progressive: false,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant(), jpegtran(), gifsicle()]
            }))
            .pipe(gulp.dest('build/images'));
    });

    gulp.task('watch', function() {
        gulp.watch('app/libs/**/*.js', { interval: 800 }, ['scripts']);
        gulp.watch('app/libs/**/*.less', { interval: 800 }, ['styles']);
        gulp.watch('app/scripts/*.js', { interval: 800 }, ['scripts']);
        gulp.watch('app/styles/**/*.less', { interval: 800 }, ['styles']);
    });