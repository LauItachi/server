const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
var log4js = require('log4js');
log4js.configure('./conf/log4js.json');
var log = log4js.getLogger("dev");

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    let html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8');
    res.send(html);
});

router.prepareSocketIO = function(server){
    const io_server = require('socket.io')(server);

    io_server.on('connection', function(socket) {
        let msg = 'Socket.id: '+socket.id+' connected!';
        socket.emit('CONNECTED', msg); // emit an event to the socket
        log.info('IO_User: '+socket.id+' connect!');
        // log.info('IO_User: '+socket.id+' connect!');
        
        socket.on('SEND_MESSAGE', function(data) {
            log.info('Receive msg: '+JSON.stringify(data))
            // log.info('Receive msg: '+JSON.stringify(data));
        });
        
        // socket.broadcast.emit()
    });
    
};

module.exports = router;
