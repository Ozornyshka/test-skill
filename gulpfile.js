var gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'), 
	del          = require('del'), 
	autoprefixer = require('gulp-autoprefixer')
 
gulp.task('sass', function() { 
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('app/css')) 
		.pipe(browserSync.reload({stream: true})) 
});
 
gulp.task('browser-sync', function() { 
	browserSync({
		server: {
			baseDir: 'app' 
		},
		notify: false 
	});
});
 
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('clean', async function() {
	return del.sync('dist'); 
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') 
		.pipe(gulp.dest('dist/img')); 
});
 
gulp.task('prebuild', async function() {
 
	var buildCss = gulp.src([ 
		'app/css/main.css'
		])
	.pipe(gulp.dest('dist/css'))
 
	var buildFonts = gulp.src('app/fonts/**/*') 
	.pipe(gulp.dest('dist/fonts'))
 
	var buildJs = gulp.src('app/js/**/*') 
	.pipe(gulp.dest('dist/js'))
 
	var buildHtml = gulp.src('app/*.html') 
	.pipe(gulp.dest('dist'));
 
});
 
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); 
	gulp.watch('app/*.html', gulp.parallel('code')); 
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass'));