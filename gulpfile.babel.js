import babel from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import exit from 'gulp-exit';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import stylelint from 'gulp-stylelint';
import watchify from 'watchify';
import ghPages from 'gulp-gh-pages';
import jade from 'gulp-jade';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import moduleImporter from 'sass-module-importer';

const dirs = {
  src: 'source/',
  dest: 'build/'
};

const files = {
  css: 'index.scss',
  js: 'index.js',
  tpl: 'index.jade'
}

const globs = {
  css: [
    dirs.src + 'styles/**/*.scss',
    dirs.src + 'components/**/*.scss',
    dirs.src + files.css
  ],
  js: [
    dirs.src + 'scripts/**/*.js',
    dirs.src + 'components/**/*.js',
    dirs.src + files.js
  ],
  tpl: [
    dirs.src + 'templates/**/*.jade',
    dirs.src + 'components/**/*.jade',
    dirs.src + files.tpl
  ]
};

gulp.task('build:css', () => {
  gulp.src(dirs.src + files.css)
    .pipe(plumber())
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dirs.dest))
    .pipe(connect.reload());
});

function compileJS(flag) {
  const bundler = watchify(browserify(dirs.src + files.js, { debug: true }).transform(babel));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', (err) => {
        console.error(err);
        this.emit('end');
      })
      .pipe(plumber())
      .pipe(source(files.js))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dirs.dest));
  }

  if (flag) {
    bundler.on('update', (ids) => {
      console.log(`-> bundling... ${ids}`);
      rebundle();
    });

    rebundle();
  } else {
    rebundle().pipe(exit());
  }
}

gulp.task('build:js', () => compileJS());

gulp.task('build:tpl', () => {
  gulp.src(dirs.src + files.tpl)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(dirs.dest))
    .pipe(connect.reload());
});

gulp.task('lint:css', () => gulp.src(dirs.source + files.css)
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

gulp.task('lint:js', () => gulp.src([dirs.src + files.js, 'gulpfile.babel.js'])
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('watch:css', () => {
  gulp.watch(globs.css, ['build:css']);
});

gulp.task('watch:js', () => compileJS(true));

gulp.task('watch:tpl', () => {
  gulp.watch(globs.tpl, ['build:tpl']);
});

gulp.task('server', () => {
  connect.server({
    root: dirs.dest,
    livereload: true,
  });
});

gulp.task('deploy', () => {
  gulp.src(dirs.dest + '**/*')
    .pipe(ghPages());
});

gulp.task('default', [
  'watch:css',
  'watch:js',
  'watch:tpl',
  'server',
]);
