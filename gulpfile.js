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
var sftp = require('gulp-sftp');
var reactify = require('reactify');
var notify = require('gulp-notify');
var runSequence = require('run-sequence').use(gulp);

var theLibs = require('./config.libs.js');
var theEngine = require('./config.engine.js');

var secrets = require('./secrets.json');


gulp.task('default', ['scripts', 'styles', 'js', 'watch']);

function compile(watch) {
    var bundler = watchify(browserify(theEngine, {
        debug: true,
        insertGlobals: true,
        cache: {}, packageCache: {},
        fullPaths: true,
    }).transform(babel, {
        presets: ["es2015", "react"]
    }));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) {
                console.error(err);
                notify.onError(err);
                this.emit('end');
            })
            .pipe(source('es6.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./app/build/'));
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
        .pipe(gulp.dest('app/build/'));
});

gulp.task('scripts-concat', function(){
    return gulp.src(['app/build/libs.js', 'app/build/es6.js'])
        .pipe(plugins.concat('scripts.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('app/build'));
});

gulp.task('js', function(callback) {
    runSequence(
        'scripts',
        'scripts-es6',
        callback)
});

gulp.task('styles', function() {
    return gulp.src(['app/styles/styles.less'])
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function(err) {
            console.error(err);
            notify.onError(err);
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
        .pipe(gulp.dest('app/build')).on('error', gutil.log);
});

gulp.task('deploy-styles', function() {
  return gulp.src('./app/build/styles.css')
    .pipe(sftp({
        host: secrets.host,
        user: secrets.username,
        pass: secrets.password,
        remotePath: '/home/app/quickly-landing/app/build'
      }));
});

gulp.task('sftp-scripts', function() {
  return gulp.src('./app/build/*.js')
    .pipe(sftp({
        host: secrets.host,
        user: secrets.username,
        pass: secrets.password,
        remotePath: '/home/app/quickly-landing/app/build'
      }));
});

gulp.task('sftp-all', function() {
  return gulp.src('./app/scripts/**/*')
    .pipe(sftp({
        host: secrets.host,
        user: secrets.username,
        pass: secrets.password,
        remotePath: '/home/app/quickly-landing/app/scripts'
      }));
});

gulp.task('sftp-core', function() {
  return gulp.src('./app/build/*')
    .pipe(sftp({
        host: secrets.host,
        user: secrets.username,
        pass: secrets.password,
        remotePath: '/home/app/quickly-landing/app/build'
      }));
});

gulp.task('sftp-html', function() {
  return gulp.src('./app/index.html')
    .pipe(sftp({
        host: secrets.host,
        user: secrets.username,
        pass: secrets.password,
        remotePath: '/home/app/quickly-landing/app/'
      }));
});

gulp.task('sftp-fonts', function() {
  return gulp.src('./app/fonts/**/*')
    .pipe(sftp({
        host: secrets.host,
        user: secrets.username,
        pass: secrets.password,
        remotePath: '/home/app/quickly-landing/app/fonts/'
      }));
});

gulp.task('sftp-images', function() {
  return gulp.src('./app/images/**/*')
    .pipe(sftp({
        host: secrets.host,
        user: secrets.username,
        pass: secrets.password,
        remotePath: '/home/app/quickly-landing/app/images/'
      }));
});

gulp.task('deploy', function(callback) {
    runSequence(
        'styles',
        'scripts',
        'scripts-es6',
        'sftp-html',
        'sftp-core',
        callback)
});

gulp.task('deploy-styles', function(callback) {
    runSequence(
        'styles',
        'sftp-styles',
        callback)
});

gulp.task('deploy-scripts', function(callback) {
    runSequence(
        'scripts',
        'scripts-es6',
        'sftp-scripts',
        callback)
});

gulp.task('watch-deploy', function(){
    gulp.watch('app/libs/**/*.js', {
        interval: 800
    }, ['deploy-scripts']);
    gulp.watch('app/libs/**/*.less', {
        interval: 800
    }, ['deploy-styles']);
    gulp.watch('app/scripts/**/*.jsx', {
        interval: 800
    }, ['deploy-scripts']);
    gulp.watch('app/scripts/**/*.js', {
        interval: 800
    }, ['deploy-scripts']);
    gulp.watch('app/styles/**/*.less', {
        interval: 800
    }, ['deploy-styles']);
    gulp.watch('app/*.html', {
        interval: 800
    }, ['deploy-html']);
});


gulp.task('watch', function() {
    watch();
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
