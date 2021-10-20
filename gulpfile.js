/* ------ Gulp ------ */
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	gap = require('gulp-append-prepend'),
	gulp_watch = require('gulp-watch'),
	/* ------ Pug ------ */
	pug = require('gulp-pug'),
	/* ------ Server ------ */
	browserSync = require('browser-sync').create()

gulp.task('pug', function () {
	gulp
		.src(['!./src/mixin/**/*.pug', './src/*.pug'])
		.pipe(plumber())
		.pipe(gap.prependFile('./src/mixin/!init.pug'))
		.pipe(pug({ pretty: false }))
		.pipe(gulp.dest('./mail/'))
})

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: './mail/',
		},
	})
	gulp_watch(['./mail/*.html']).on('change', browserSync.reload)
})

gulp.task('watch', function () {
	gulp_watch('./src/**/*.pug', gulp.series('pug'))
})

gulp.task('default', gulp.series('server'))
