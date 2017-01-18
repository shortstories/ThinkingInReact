const gulp = require("gulp");
const concat = require("gulp-concat");
const livereload = require("gulp-livereload");
const path = require("path");
const sass = require("gulp-sass");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const babel = require("gulp-babel");
const gls = require("gulp-live-server");
const runSequence = require('run-sequence');

const SRC = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");

runSequence.use(gulp);

const srcPath = {
  views: path.join(SRC, "views"),
  static : {
    js: path.join(SRC, "static", "js"),
    scss: path.join(SRC, "static", "scss")
  }
}
const distPath = {
  views: path.join(DIST, "views"),
  static : {
    js: path.join(DIST, "static", "js"),
    css: path.join(DIST, "static", "css")
  }
}

gulp.task("babel", () => {
  return gulp.src(path.join(SRC, "**/*.js"))
    .pipe(babel())
    .pipe(gulp.dest(DIST));
});

gulp.task("combine-js", () => {
  return gulp.src(path.join(SRC, "entry.js"))
    .pipe(webpackStream({
      output: {
        filename: "bundle.js"
      },
      module: {
        loaders: [
          {
            test: SRC,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            query: {
              presets: ["es2015"]
            }
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false },
          mangle: true,
          sourcemap: false,
          beautify: false,
          dead_code: true
        })
      ]
    }))
    .pipe(gulp.dest(distPath.static.js));
});

gulp.task("compile-sass", () => {
  return gulp.src(path.join(srcPath.static.scss, "/*.scss"))
    .pipe(sass())
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest(distPath.static.css));
});

gulp.task("copy-another-files", () => {
  return gulp.src(path.join(srcPath.views, "/*"))
    .pipe(gulp.dest(distPath.views));
});

gulp.task("build", (callback) => {
  runSequence(
    ["combine-js", "compile-sass", "babel", "copy-another-files"],
    "watch",
    "webserver",
    callback
  );
})

gulp.task("webserver", () => {
  const server = gls.new(path.join(DIST, "server.js"));
  server.start();
})

gulp.task("watch", () => {
  livereload.listen();
  
  gulp.watch(path.join(SRC, "**/*.js"), ["babel"]);
  gulp.watch(path.join(SRC, "components", "*.js"), ["combine-js"]);
  gulp.watch(path.join(srcPath.static.js, "*.js"), ["combine-js"]);
  gulp.watch(path.join(srcPath.static.scss, "/*.scss"), ["compile-sass"]);
  gulp.watch(path.join(srcPath.views, "/*"), ["copy-another-files"]);

  gulp.watch(DIST + "/**").on("change", livereload.changed);
})

gulp.task("default", ["build"]);