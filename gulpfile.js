'use strict';

// include gulp
var gulp = require('gulp');
var pkg = require('./package.json');
// include plug-ins
var concat  = require('gulp-concat');
var rename = require('gulp-rename');
var sass    = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');

var minifyHTML = require('gulp-minify-html');
var jshint = require('gulp-jshint');

var stripDebug = require('gulp-strip-debug');

var clean = require('gulp-clean');
var minifyCSS = require('gulp-minify-css');




var jade = require('gulp-jade');

var version     = pkg.version;
var name        = pkg.name;
var browsers    = pkg.browsers;

//src file
var source_images   = './src/images/**/*';
var source_js       = './src/scripts/*.js';
var source_sass     = './src/sass/styles.scss';
//var htmlSrc = './src/html/*.html';
//var srcjade        ='./src/jade/*.jade';


//custom destination
var destination         = '../catalog/view/theme/' + name + '/assets/';
var destination_css     = '../catalog/view/theme/' + name + '/assets/css/';
var destination_js      = '../catalog/view/theme/' + name + '/assets/scripts/';
var destination_fonts   = '../catalog/view/theme/' + name + '/assets/fonts/';
var destination_image   = '../catalog/view/theme/' + name + '/assets/css/img';

// tasks copy font-awesome 
gulp.task('copyfont', function() {
    gulp.src('./bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest(fontsTarget+'font-awesome'));
});
//clean task
gulp.task('clean', function() {
   return gulp.src(destination,{
            read:false
        })
        .pipe(clean({force: true}));
});

//sass task
gulp.task('sass', function() {
    gulp.src(source_sass)
        .pipe(sourcemaps.init())

        .pipe(sass({
           errLogToConsole: true
        }))
        .pipe(autoprefix(
            'Android >= ' + browsers.android,
            'Chrome >= ' + browsers.chrome,
            'Firefox >= ' + browsers.firefox,
            'Explorer >= ' + browsers.ie,
            'iOS >= ' + browsers.ios,
            'Opera >= ' + browsers.opera,
            'Safari >= ' + browsers.safari
        ))
        .pipe(rename(name+'.css'))
        .pipe(gulp.dest(destination_css))
        .pipe(minifyCSS())
        .pipe(rename(name+'.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destination_css));
});

// JS hint task
gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// minify new images
gulp.task('imagemin', function() {
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});
// minify new or changed HTML pages
gulp.task('htmlpage', function() {
    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src(sourcesjs)
        .pipe(concat('script.js'))
        .pipe(stripDebug())
        .pipe(uglify())

    .pipe(gulp.dest(pathjstarget));
});






//jade task
gulp.task('jade', function() {
    gulp.src([srcjade])
        .pipe(jade())
        .pipe(gulp.dest(jadetarget))

});
// default gulp task
gulp.task('default', ['imagemin', 'scripts', 'sass', 'jade'], function() {
    // watch for JS changes
    gulp.watch('./src/scripts/*.js', function() {
        gulp.run('jshint', 'scripts');
    });

    
    gulp.watch('./src/sass/{,*/}*.{scss,sass}', function() {
        gulp.run('sass');
    });
    gulp.watch('./src/images/**/*', function() {
        gulp.run('imagemin');
    });

    gulp.task('./src/jade/**/*', function() {
        gulp.run('jade');
    });

});
