/* gulp dependencies */
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var os = require('os');
var open = require('gulp-open');


/* path def */
var path = {
  HTML: [
  	'src/.htaccess',
  	'src/*.html',
    'src/app/**/*.html',
    'src/app/**/**/*.html',
    'src/app/**/**/**/*.html',
  	'src/favicon.ico'
  ],
  JS_HEAD: [
    'src/assets/lib/*.js',
    'src/assets/lib/**/*.js'
  ],
  JS_BODY: [
  	'src/assets/js/*.js',
    'src/assets/js/**/*.js',
    'src/app/*.js',
    'src/app/**/*.js',
    'src/app/**/**/*.js',
    'src/app/**/**/**/*.js'
  ],
  CSS: [
    'src/assets/lib/*.css',
    'src/assets/lib/**/*.css',
    'src/assets/css/*.css',
    'src/assets/css/**/*.css'
  ],
  SASS: [
    'src/assets/sass/*.scss',
    'src/assets/sass/**/*.scss'
  ], 
  IMG: [
  	'src/assets/images/**'
  ],
  BOWER_COMPONENTS: [
  	'bower_components/angular/angular.js', 
    'bower_components/angular-animate/angular-animate.js', 
    'bower_components/angular-aria/angular-aria.js', 
    'bower_components/angular-cookies/angular-cookies.js', 
    'bower_components/angular-loader/angular-loader.js', 
    'bower_components/angular-mocks/angular-mocks.js', 
    'bower_components/angular-resource/angular-resource.js', 
    'bower_components/angular-sanitize/angular-sanitize.js', 
    'bower_components/angular-touch/angular-touch.js',  
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/jquery/dist/jquery.js'
  ],
  SRC: './src',
  DEV: './dev',
  PROD: './prod'
};

/* Trying to find the default browser as per the operating system */
var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));



/**** Tasks for Development server ****/

/* clean up development dir */
gulp.task('clean', function() {
	return gulp.src(path.DEV + '/*', {force: true})
		.pipe(clean());
});


/* jslint for debugging */
gulp.task('lint', function() {
  return gulp.src(path.JS_BODY)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});


/* connect development server as soon as the server is ready*/
gulp.task('connect', ['linker','html','img'], function() {
	connect.server({
		root: './',
		port: 5040
  });
});


/* run development server in default browser*/
gulp.task('open', ['connect'], function() {
  gulp.src(path.DEV + '/index.html')
    .pipe(open({uri: 'http://localhost:5040/dev', app: browser}));
});


/* convert scss to css and then copy all css and js links in index.html */
gulp.task('linker', function(){
  return Promise.all([
    new Promise(function(resolve, reject) {
      gulp.src(path.SASS)
        .pipe(sass.sync().on('error', sass.logError))
        .on('error', reject)
        .pipe(gulp.dest(path.SRC + '/assets/css'))
        .on('end', resolve)
    }) 
  ]).then(function () {
      gulp.src(path.SRC + '/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest(path.DEV + '/'))
        .pipe(inject(gulp.src(path.JS_HEAD, {read: false}), {name: 'library', relative: true}))
        .pipe(gulp.dest(path.DEV + '/'))
        .pipe(inject(gulp.src(path.JS_BODY, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(path.CSS, {read: false}), {relative: true}))
        .pipe(gulp.dest(path.DEV + '/'));
      });    
});


/* copy over html files */
gulp.task('html', function(){
  gulp.src(path.HTML, {base: 'src'})
    .pipe(gulp.dest(path.DEV));
});


/* compress and move images to development server*/
gulp.task('img', function(){
  gulp.src(path.IMG)
    .pipe(imagemin())
    .pipe(gulp.dest(path.DEV + '/images'));
});


/* watch all changes */
gulp.task('watch', function () {
  var ALL_FILES = path.CSS.concat(path.SASS, path.BOWER_COMPONENTS, path.JS_HEAD, path.JS_BODY, path.HTML);
  gulp.watch(ALL_FILES, ['linker']);
  gulp.watch(path.JS_BODY, ['lint']);
  gulp.watch(path.HTML, ['html']);
  gulp.watch(path.IMG, ['img']);
});



/**** Tasks for Production server ****/
//To do



/* default */
gulp.task('default', ['lint','linker','img','html','connect','watch','open']);


/* production */
//gulp.task('prod', []);

