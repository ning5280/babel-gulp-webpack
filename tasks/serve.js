import gulp from 'gulp';
import browserSync from 'browser-sync';
import proxyMiddleware from 'http-proxy-middleware';
import args from './util/args';
var browser = browserSync.create();

var jsonPlaceholderProxy = proxyMiddleware('/api', {
    target: 'http://www.fwyun.com',
    changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
            '^/api' : '',     // rewrite path
    },
});


// 静态服务器
gulp.task('serve', ()=>{
    browser.init({
        server: {
            baseDir: "./",
           middleware: [jsonPlaceholderProxy],
        },
         startPath: '/dist'
    });
    if(!args.watch) return false;
    // gulp.watch('app/**/*.js',['scripts'],browserSync.reload);
    // gulp.watch('app/**/*.css',['css'],browserSync.reload);
});

gulp.task('reload-js',['scripts'],browser.reload);
gulp.task('reload-css',['css'],browser.reload);

gulp.task('browser',(cb)=>{
  if(!args.watch) return cb();
  gulp.watch('app/**/*.js',['reload-js']);
  gulp.watch('app/**/*.css',['reload-css']);
});
