var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' }, 
    /* {
      type: 'file', 
      filename: 'logs/access.log', 
      maxLogSize: 1024,
      backups:4,
      category: 'normal' 
    } */
  ],
  replaceConsole: true
});
app.use(
    log4js.connectLogger(
        this.logger('normal'), {
            level:'auto', 
            format:':method :url'
        }
    )
);
exports.logger=function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
}