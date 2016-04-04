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

var theLibs = require('./config.libs.js');
var theEngine = require('./config.engine.js');

var secrets = require('./secrets.json');

gulp.task('default', ['scripts', 'styles', 'js', 'watch']);

function compile(watch) {
    var bundler = watchify(browserify(theEngine, {
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
            .pipe(gulp.dest('./app/app/'));
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
        .pipe(gulp.dest('app/app/'));
});

gulp.task('scripts-concat', function(){
    return gulp.src(['app/app/libs.js', 'app/app/es6.js'])
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

var scp = require('gulp-scp2');

gulp.task('deploy', function() {
  return gulp.src('./app/app/**/*')
  .pipe(scp({
    host: secrets.host,
    username: secrets.username,
    password: secrets.password,
    dest: secrets.path+'app/'
  }))
  .on('error', function(err) {
    console.log('Deploy error: ',err);
  });
});

gulp.task('deploy-html', function() {
  return gulp.src('./app/index.html')
  .pipe(scp({
    host: secrets.host,
    username: secrets.username,
    password: secrets.password,
    dest: secrets.path
  }))
  .on('error', function(err) {
    console.log('Deploy error: ',err);
  });
});

gulp.task('deploy-fonts', function() {
  return gulp.src('./app/fonts/**/*')
  .pipe(scp({
    host: secrets.host,
    username: secrets.username,
    password: secrets.password,
    dest: secrets.path+'fonts/'
  }))
  .on('error', function(err) {
    console.log('Deploy error: ',err);
  });
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

gulp.task('scripts-deploy', function(callback) {
    runSequence(
        'js',
        'deploy',
        callback)
});

gulp.task('styles-deploy', function(callback) {
    runSequence(
        'styles',
        'deploy',
        callback)
});

gulp.task('watch-deploy', function(){
    gulp.watch('app/libs/**/*.js', {
        interval: 800
    }, ['scripts-deploy']);
    gulp.watch('app/libs/**/*.less', {
        interval: 800
    }, ['styles-deploy']);
    gulp.watch('app/scripts/**/*.jsx', {
        interval: 800
    }, ['scripts-deploy']);
    gulp.watch('app/scripts/**/*.js', {
        interval: 800
    }, ['js', 'deploy']);
    gulp.watch('app/styles/**/*.less', {
        interval: 800
    }, ['styles-deploy']);
    gulp.watch('app/*.html', {
        interval: 800
    }, ['html-deploy']);
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
