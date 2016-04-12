
// production builds

gulp.task('production', function(callback) {
    runSequence(
        'js',
        'styles',
        'production-scripts',
        'production-styles',
        'production-images',
        'production-copy-fonts',
        'production-copy-html'
        callback)
});

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
