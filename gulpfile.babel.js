import babel from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import exit from 'gulp-exit';
import gulp from 'gulp';
import mochaPhantomJS from 'gulp-mocha-phantomjs';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import stylelint from 'gulp-stylelint';
import watchify from 'watchify';
import ghPages from 'gulp-gh-pages';

const processors = [
  require('postcss-import'),
  require('postcss-url'),
  require('postcss-custom-properties'),
  require('postcss-calc'),
  require('postcss-color-function'),
  require('postcss-custom-media'),
  require('postcss-pseudoelements'),
  require('autoprefixer'),
];

gulp.task('build:css', () => {
  gulp.src('lib/index.css')
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

function compileJS(flag) {
  const bundler = watchify(browserify('./lib/index.js', { debug: true }).transform(babel));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', (err) => {
        console.error(err);
        this.emit('end');
      })
      .pipe(plumber())
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
      // .pipe(exit()); // REVIEW
  }

  if (flag) {
    bundler.on('update', (ids) => {
      console.log(`-> bundling... ${ids}`);
      rebundle();
    });

    rebundle();
  } else {
    rebundle().pipe(exit()); // REVIEW
  }
}

gulp.task('build:js', () => compileJS());

gulp.task('lint:css', () => gulp.src('lib/index.css')
  .pipe(plumber())
  .pipe(stylelint(
    {
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    }
  )
));

gulp.task('lint:js', () => gulp.src(['lib/index.js', 'gulpfile.js'])
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('server', () => {
  connect.server({
    root: 'build',
    livereload: true,
  });
});

gulp.task('test:browser', () =>
  gulp.src('test/behavior/behavior.html')
    .pipe(mochaPhantomJS())
);

gulp.task('build:test', () => {
  gulp.src('test/visual/visual.html')
    .pipe(plumber())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());

  gulp.src('test/visual/visual.css')
    .pipe(plumber())
    .pipe(rename('test.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('watch:css', () => {
  gulp.watch([
    'lib/**/*.css',
  ], ['build:css']);
});

gulp.task('watch:js', () => compileJS(true));

gulp.task('watch:test', () => {
  gulp.watch([
    'test/visual/**/*.*',
  ], ['build:test']);
});

gulp.task('default', [
  'watch:css',
  'watch:js',
  'watch:test',
  'server',
]);

gulp.task('deploy', () => {
  gulp.src('build/**/*')
    .pipe(ghPages());
});
