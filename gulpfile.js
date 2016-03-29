/*
    Gulp Box | https://github.com/andreystarkov/gulp-box
*/

var gulp = require('gulp'),
    gutil = require('gulp-util');
    plugins = require('gulp-load-plugins')();

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence').use(gulp);

var secrets = require('./secrets.json');

gulp.task('default', ['scripts', 'styles', 'js', 'watch']);

var theES6 = [
    'app/scripts/es6/shop.jsx',
    'app/scripts/es6/profile.jsx',
    'app/scripts/es6/reservation.jsx',
    'app/scripts/es6/checkout.jsx',
    'app/scripts/es6/screens.jsx',
    'app/scripts/es6/react/companyDetails.react.jsx',
    'app/scripts/es6/react/ordersHistory.react.jsx',
    'app/scripts/es6/react/reservationHistory.react.jsx',
    'app/scripts/es6/react/menuItems.react.jsx',
    'app/scripts/es6/react/profileEditor.react.jsx',
    'app/scripts/es6/react/companyList.react.jsx',
    'app/scripts/es6/react/mainPage.react.jsx'
];

var theLibs = [
    'app/libs/jquery/dist/jquery.min.js',

    'app/libs/react/react.js',
    'app/libs/react/react-dom.js',
    'app/libs/reflux/dist/reflux.js',

    'app/libs/underscore/underscore-min.js',
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
    'app/libs/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
    'app/libs/jquery-bar-rating/dist/jquery.barrating.min.js',
    'app/scripts/etc/jquery.nouislider.min.js',

    'app/libs/sweetalert2/src/sweetalert2.js',
    'app/libs/toastr/toastr.min.js',

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

function compile(watch) {
    var bundler = watchify(browserify(theES6, {
        debug: true
    }).transform(babel, {
        presets: ["es2015", "react"]
    }));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('es6.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./app/app/build'));
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

gulp.task('scripts-es6', function() {
    return compile();
});

gulp.task('scripts', function() {
    return gulp.src(theLibs)
        .pipe(plugins.concat('libs.js'))
        .pipe(gulp.dest('app/app/build'));
});

gulp.task('scripts-concat', function(){
    return gulp.src(['app/app/build/libs.js', 'app/app/build/es6.js'])
        .pipe(plugins.concat('scripts.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('app/app'));
});

gulp.task('js', function(callback) {
    runSequence(
        'scripts',
        'scripts-es6',
      //  'scripts-concat',
        callback)
});

gulp.task('styles', function() {
    return gulp.src(['app/styles/styles.less'])
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
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
        }))
        .pipe(gulp.dest('app/app')).on('error', gutil.log);
});

// production builds

gulp.task('production-scripts', function(){
    return gulp.src(['app/app/build/libs.js', 'app/app/build/es6.js'])
        .pipe(plugins.concat('scripts.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('build/app'));
});

gulp.task('production-styles', function(){
    return gulp.src(['app/app/styles.css'])
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build/app'));
});

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var gifsicle = require('imagemin-gifsicle');

gulp.task('production-images', function() {
    return gulp.src(['app/images/**/*.jpg', 'app/images/**/*.png'])
        .pipe(plugins.imagemin({
            progressive: false,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant(), jpegtran(), gifsicle()]
        }))
        .pipe(gulp.dest('build/images'));
});

gulp.task('production-copy-fonts', function() {
    return gulp.src(['app/fonts/**/*'])
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('production-copy-html', function() {
    return gulp.src(['app/*.html'])
        .pipe(gulp.dest('build'))
});


var scpClient = require('scp2');

gulp.task('deploy', [], function (cb) {
    scpClient.scp('./build/', {
        "host": secrets.host,
        "port": secrets.port,
        "username": secrets.username,
        "password": secrets.password,
        "path": secrets.path
    }, cb)
});

gulp.task('production', function(callback) {
    runSequence(
        'js',
        'styles',
        'production-scripts',
        'production-styles',
        'production-images',
        'production-copy-fonts',
        'production-copy-html',
        'deploy',
        callback)
});


gulp.task('watch', function() {
    //  watch();
    gulp.watch('app/libs/**/*.js', {
        interval: 800
    }, ['js']);
    gulp.watch('app/libs/**/*.less', {
        interval: 800
    }, ['styles']);
    gulp.watch('app/scripts/**/*.jsx', {
        interval: 800
    }, ['js']);
    gulp.watch('app/scripts/**/*.js', {
        interval: 800
    }, ['js']);
    gulp.watch('app/styles/**/*.less', {
        interval: 800
    }, ['styles']);
});
