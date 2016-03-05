/*
    Gulp Box | https://github.com/andreystarkov/gulp-box
*/

var gulp    = require('gulp'),
    gutil   = require('gulp-util');
    plugins = require('gulp-load-plugins')();

    gulp.task('default', ['scripts', 'styles', 'js', 'watch']);

    var theLibs = [
     'app/libs/jquery/dist/jquery.min.js',
     //'app/libs/react/react.min.js',
     //'app/libs/react/react-dom.min.js',
     //'app/libs/reflux/dist/reflux.min.js',
     'app/libs/bootstrap/dist/js/bootstrap.min.js',
     'app/libs/js-cookie/src/js.cookie.js',

     'app/scripts/_global.js',

     'app/libs/velocity/velocity.min.js',
     'app/libs/velocity/velocity.ui.min.js',
     'app/libs/bootstrap-material-design/scripts/material.js',
     'app/libs/bootstrap-material-design/scripts/ripples.js',
     'app/libs/ZoomSlider/js/dynamics.min.js',
     'app/libs/ZoomSlider/js/classie.js',
     'app/libs/ZoomSlider/js/main.js',
     'app/libs/moment/min/moment-with-locales.min.js',
     'app/libs/jquery-bar-rating/dist/jquery.barrating.min.js',
     'app/scripts/etc/datetimepicker.js',
     'app/scripts/etc/jquery.nouislider.min.js',

     'app/scripts/components/common.js',
     'app/scripts/components/auth.js',
     'app/scripts/components/checkout.js',
     'app/scripts/components/company.js',
     'app/scripts/components/controls.js',
     'app/scripts/components/profile.js',
     'app/scripts/components/shop.js',
     'app/scripts/components/tabs.js',
     'app/scripts/init.js'
    ];

    var theES6 = [
     'app/scripts/es6/_global.jsx',
     'app/scripts/es6/profile.jsx',
     'app/scripts/es6/engine.jsx',
     'app/scripts/es6/init.jsx'
    ]

    var sourcemaps = require('gulp-sourcemaps');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var browserify = require('browserify');
    var watchify = require('watchify');
    var babel = require('babelify');

    function compile(watch) {
      var bundler = watchify(browserify(theES6, { debug: true }).transform(babel));

      function rebundle() {
        bundler.bundle()
          .on('error', function(err) { console.error(err); this.emit('end'); })
          .pipe(source('engine.js'))
          .pipe(buffer())
      //    .pipe(sourcemaps.init({ loadMaps: true }))
      //    .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('./app/app'));
      }

      if (watch) {
        bundler.on('update', function() {
          console.log('-> bundling...');
          rebundle();
        });
      }

      rebundle();
    }

    function watch() {
      return compile(true);
    };

    gulp.task('js', function() {
        return compile();
    });

    gulp.task('scripts', function() {
      return gulp.src(theLibs)
    //    .pipe(plugins.uglify())
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
            .pipe(plugins.autoprefixer(
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
          //  .pipe(plugins.cssmin())
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
      //  watch();
        gulp.watch('app/libs/**/*.js', { interval: 800 }, ['scripts', 'js']);
        gulp.watch('app/libs/**/*.less', { interval: 800 }, ['styles']);
        gulp.watch('app/scripts/**/*.jsx', { interval: 800 }, ['js']);
        gulp.watch('app/scripts/**/*.js', { interval: 800 }, ['scripts', 'js']);
        gulp.watch('app/styles/**/*.less', { interval: 800 }, ['styles']);
    });