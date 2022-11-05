/// <binding Clean='clean, clean:css, clean:js, min, min:css, min:js' />
//"use strict";
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css"
};

var webpackages = {
    "requirejs": { "bin/*": "bin/" },
    "jquery": { "dist/*": "dist/" },
    "bootstrap": { "dist/*": "dist/" },
    "babel": { "dist/*": "dist/" },
}

gulp.task("dist_lib", async function () {
    var streams = [];
    console.log('1')
    for (var package in webpackages) {
        console.log(package)
        for (var item in webpackages[package]) {
            console.log(item)
            streams.push(gulp.src("node_modules/" + package + "/" + item)
                .pipe(gulp.dest(webroot + "nlib/" + package + "/" + webpackages[package][item])));
        }
    }
})


var destPath = './wwwroot/lib/min';
gulp.task('minify-js', function () {
    return gulp.src([
        'node_modules/Jquery/**/jquery.js',
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(destPath))
        .pipe(uglify())
        .pipe(gulp.dest(destPath));
});

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", gulp.series("clean:js", "clean:css"));

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", gulp.series("min:js", "min:css"));