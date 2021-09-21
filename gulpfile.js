const {src, dest, parallel, series, watch} = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");


function browsersync() {
	browserSync.init({
		server: {baseDir: "app/"},
		notify: false,
		online: true
	})
}


function styles() {
	return src("app/less/main.less")
		.pipe(less())
		.pipe(concat("app.min.css"))
		.pipe(autoprefixer({overrideBrowserslist: ["last 10 versions"], grid: true}))
		.pipe(cleancss({level: {1: {specialComments: 0}}/* , format: 'beautify' */}))
		.pipe(dest("app/css/"))
		.pipe(browserSync.stream())
}

function images() {
	return src("app/images/src/**/*")
		.pipe(newer("app/images/dist/"))
		.pipe(imagemin()) //
		.pipe(dest("app/images/dist/"))
}


function cleanimg() {
	return del("app/images/dist/**/*", {force: true})
}


function buildcopy() {
	return src([
		"app/css/**/*.min.css",
		"app/js/**/*.min.js",
		"app/images/dist/**/*",
		"app/**/*.html",
		"app/fonts/*"
	], {base: "app"})
		.pipe(dest("dist"))
}


function cleandist() {
	return del("dist/**/*", {force: true})
}


function startwatch() {
	watch("app/**/less/**/*", styles);
	watch("app/**/*.html").on("change", browserSync.reload);
	watch("app/images/src/**/*", images);
}


exports.browsersync = browsersync;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, cleanimg, styles, images, buildcopy);
exports.default = parallel(cleanimg, styles, images, browsersync, startwatch);
