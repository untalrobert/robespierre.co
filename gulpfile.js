const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const htmlreplace = require('gulp-html-replace');
const cleanCSS = require('gulp-clean-css');


// Tarea para compilar Sass
gulp.task('sass', () => {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});


gulp.task('css', () => {
    return gulp.src('src/css/main.css') // Ruta al archivo CSS
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Tarea para minificar el archivo JS y agregar un sufijo ".min" al nombre
gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});



// Tarea para reemplazar bloques HTML en tus archivos HTML
gulp.task('replaceHtml', function () {
    return gulp.src('src/*.html') // Ruta de tus archivos HTML de origen
      .pipe(htmlreplace({
        'js': 'js/main.min.js', // Reemplaza 'js' por la ruta de tu archivo JS minificado
        'audio': 'js/audio.min.js', // Reemplaza 'js' por la ruta de tu archivo JS minificado
        'css': 'css/main.min.css' // Reemplaza 'css' por la ruta de tu archivo CSS minificado
      })) // Define los reemplazos que deseas realizar
      .pipe(gulp.dest('dist/')) // Ruta de destino de los archivos HTML modificados
      .pipe(browserSync.stream()); // Recarga el navegador usando BrowserSync
  });

  // Tarea para copiar archivos HTML
gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Tarea para realizar el reemplazo de URL en los archivos HTML
gulp.task('replace-url', () => {
    return gulp.src('dist/*.html')
        .pipe(replace('src/js/main.js', 'dist/js/main.min.js'))
        .pipe(replace('src/scss/main.scss', 'dist/css/main.css'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});



// Inicializa BrowserSync
gulp.task('serve', () => {
    browserSync.init({
        server: './dist',
    });

    gulp.watch('src/scss/*.scss', gulp.series('sass'));
    gulp.watch('src/css/*.css', gulp.series('css'));
    gulp.watch('src/js/app.js', gulp.series('js'));
    gulp.watch('src/*.html', gulp.series('replaceHtml'));
});




// Tarea predeterminada
gulp.task('dev', gulp.series('replaceHtml', 'js')); //ejecute esta tarea indpendiente para reemplazar las urls y js.
gulp.task('default', gulp.series('sass', "css", 'js','html','replaceHtml', 'serve'));
