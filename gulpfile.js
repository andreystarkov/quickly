/*
    Gulp Box
*/

var gulp = require('gulp'),
    gutil = require('gulp-util');

var fs = require('fs');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');

var babel = require('babelify');
var uglify = require('gulp-uglify');
var sftp = require('gulp-sftp');
var reactify = require('reactify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence').use(gulp);

var theLibs = require('./config.libs.js');
var theEngine = require('./config.engine.js');

var config = {
    dist: './build',
    src: './app',
    build: './app/build'
}

var secrets = {
    host: 'quickly.su',
    user: 'landing',
    pass: 'enot46Krot',
    remotePath: '/home/app/quickly-landing'
};

gulp.task('default', ['gulp-box']);

gulp.task('gulp-box', function(){
    return console.log('Gulp Box: gulp dist | gulp watch | gulp engine | gulp scripts');
});


gulp.task('deploy', function() {
  return gulp.src(config.dist+'/build/**/*')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sftp({
        host: secrets.host,
        user: secrets.user,
        pass: secrets.pass,
        remotePath: secrets.remotePath+'/build/'
      }));
});

gulp.task('deploy-everything', function() {
  return gulp.src(config.dist+'/**/*')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sftp({
        host: secrets.host,
        user: secrets.user,
        pass: secrets.pass,
        remotePath: secrets.remotePath
      }));
});

gulp.task('scripts-es6', function() {
    return runSequence(
        'engine',
        callback)
});

gulp.task('engine', function(callback) {
    return watchify(browserify(theEngine, {
        debug: true,
        insertGlobals: true,
        cache: {}, packageCache: {},
        fullPaths: true,
    }).transform(babel, {
        presets: ["es2015", "react" ]
    })).bundle().pipe(source('es6.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist+'/build'))
    .pipe(notify('Browserify done'));
});


gulp.task('scripts', function() {
    var concat = require('gulp-concat');
    return gulp.src(theLibs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(config.dist+'/build'))
        .pipe(notify('Libs done'));
});

gulp.task('scripts-concat', function(){
    return gulp.src([config.dist+'/build/libs.js', config.dist+'/build/es6.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(config.dist+'/build'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(config.dist+'/build'))
        .pipe(notify('Scripts merged'));
});

gulp.task('styles', function() {
    return gulp.src(['app/styles/styles.less'])
        .pipe(plumber())
        .pipe(less())
        .on('error', function(err) {
            console.error(err);
            notify.onError(err);
            this.emit('end');
        })
        .pipe(autoprefixer({
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
        .pipe(gulp.dest(config.dist+'/build')).on('error', gutil.log)
        .pipe(notify('Styles compiled'));
});

gulp.task('dist-clean', function() {
    return del(config.dist+'/build/*');
});

gulp.task('dist-styles', function(){
    return gulp.src([config.build+'styles.css'])
        .pipe(cssmin())
        .pipe(rename('styles.min.js'))
        .pipe(gulp.dest(config.dist+'/build'))
        .pipe(notify('Styles minifed'));
});

gulp.task('dist-scripts', function(){
    return gulp.src([config.dist+'/libs.js', config.dist+'/es6.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(config.dist+'/build'))
       // .pipe(uglify().on('error', gutil.log))
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(config.dist+'/build'))
        .pipe(notify('Scripts merged  & minifed'));
});

gulp.task('dist-images', function() {
    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');
    var jpegtran = require('imagemin-jpegtran');
    var gifsicle = require('imagemin-gifsicle');
    return gulp.src(['app/images/**/*.jpg', 'app/images/**/*.png'])
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant(), jpegtran(), gifsicle()]
        })).pipe(gulp.dest(config.dist+'/images'));
});

/*
gulp.task('fonts-min', function() {
    var fontmin = require('gulp-fontmin');
    return gulp.src([config.src.fonts])
        .pipe(fontmin());
});

*/
gulp.task('dist-fonts', function() {
    return gulp.src([config.src.fonts+'/**/*'])
        .pipe(gulp.dest(config.dist+'/fonts'))
});

gulp.task('dist-html', function() {
    var htmlmin = require('gulp-htmlmin');
    return gulp.src(['app/*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.dist+'/'))
        .pipe(notify('HTML minifed & copied'))
});


gulp.task('dist', function(callback) {
    runSequence(
        'engine',
        'scripts',
        'styles',
        'dist-styles',
        'dist-scripts',
        'dist-html',
        callback)
});

gulp.task('dist-deploy', function(callback) {
    runSequence(
        'dist',
        'deploy',
        callback)
});

gulp.task('watch-live', function() {
    gulp.watch('app/libs/**/*.less', {
        interval: 800
    }, ['dist-deploy']);
    gulp.watch(['app/scripts/**/*.jsx'], {
        interval: 800
    }, ['dist-deploy']);
    gulp.watch(['app/scripts/**/*.js'], {
        interval: 800
    }, ['dist-deploy']);
    gulp.watch('app/styles/**/*.less', {
        interval: 800
    }, ['dist-deploy']);
});

gulp.task('watch', function() {
    gulp.watch(['app/libs/**/*.js', '!**/node_modules/**'], {
        interval: 800
    }, ['scripts', 'scripts-es6']);
    gulp.watch('app/libs/**/*.less', {
        interval: 800
    }, ['styles']);
    gulp.watch(['app/scripts/**/*.jsx','!**/node_modules/**'], {
        interval: 800
    }, ['scripts', 'scripts-es6']);
    gulp.watch(['app/scripts/**/*.js','!**/node_modules/**'], {
        interval: 800
    }, ['scripts', 'scripts-es6']);
    gulp.watch('app/styles/**/*.less', {
        interval: 800
    }, ['styles']);
});
