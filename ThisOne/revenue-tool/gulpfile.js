var gulp = require("gulp"),
	sass = require("gulp-sass"),
	concat = require("gulp-concat"),
	cssImport = require("gulp-cssimport"),
	autoprefixer = require("gulp-autoprefixer"),
	minify = require("gulp-minify");

gulp.task('sass-main', function() {
	return gulp.src([
			'./assets/scss/main.scss'
		])
		.pipe(cssImport({}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			browsers: ['last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
			cascade: false
		}))
		.pipe(concat('thisoneai_tool.css'))
		.pipe(gulp.dest('./'));
});
	 
gulp.task('js-main', function() {
	return gulp.src([
			'./assets/js/*.js'
		])
		.pipe(concat('thisoneai_tool.js'))
		.pipe(minify({
	        ext:{
	            src:'-debug.js',
	            min:'.js'
	        },
	        noSource: true,
//	        exclude: ['tasks'],
//	        ignoreFiles: ['.combo.js', '-min.js']
	    }))
		.pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
	gulp.watch([
		'./assets/scss/*.scss'
	], gulp.series('sass-main'));

	gulp.watch([
		'./assets/js/*.js'
	], gulp.series('js-main'));
});
	
gulp.task('default', gulp.series('sass-main', 'js-main', 'watch'));