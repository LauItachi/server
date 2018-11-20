const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
/**
 * 日志处理-log4js-V3.x
 * 配置-https://www.npmjs.com/package/log4js
 */
const log4js = require('log4js');
log4js.configure('./conf/log4js.json');
const log = log4js.getLogger('dev');
/************************Logger***********************/

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(log4js.connectLogger(log4js.getLogger("dev"), { level: 'auto', format: ':remote-addr :method :url :status'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// For Socket.io
app.prepareSocketIO = function(server){
    indexRouter.prepareSocketIO(server);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
