const express = require('express');
const router = express.Router();
const userDAO = require('../dao/userDAO');
const result = require('../model/result');
var log4js = require('log4js');
log4js.configure('./conf/log4js.json');
var log = log4js.getLogger("dev");

/* list users */
router.get('/', function(req, res) {
    log.info('list users called');
    userDAO.list(function (users) {
        res.json(result.createResult(true, users));
    });
});

router.post('/login', function(req, res) {
    log.info('/login called');
    log.info('req.body:',JSON.stringify(req.body))
    userDAO.getByUserName(req.body.username, function (user) {
        if ( !user ) {
            log.info(result.format(3400, 'No such user', null));
            res.json(result.format(3400, 'No such user', null));
        }else if ( user.password === req.body.password ) {
            log.info(result.format(3301, 'Login successfully', user));
            res.json(result.format(3301, 'Login successfully', user));
        }else {
            log.info(result.format(3401, 'Wrong password', null));
            res.json(result.format(3401, 'Wrong password', null));
        }
    });
});

/* get user */
router.get('/:id', function(req, res) {
    let id = req.params.id;
    log.info('get user called, id:', id);
    userDAO.getById(id, function (user) {
        res.json(result.createResult(true, user));
    });
});

/* delete user */
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    log.info('delete user called, id=' + id);
    userDAO.deleteById(id, function (success) {
        res.json(result.createResult(success, null));
    });
});

/* add users */
router.post('/', function (req, res) {
    log.debug('post users called');
    let user = req.body;
    log.info(user);
    userDAO.add(user, function (success) {
        let r =  result.createResult(success, null);
        res.json(r);
    });
});

/* update users */
router.put('/:id', function (req, res) {
    log.info('update users called');
    let user = req.body;
    user.id = req.params.id;
    log.info(user);
    userDAO.update(user, function (success) {
        let r =  result.createResult(success, null);
        res.json(r);
    });
});

/* patch users */
router.patch('/:id', function (req, res) {
    log.info('patch users called');
    userDAO.getById(req.params.id, function (user) {
        let username = req.body.username;
        if(username) {
            user.username = username;
        }
        let password = req.body.password;
        if(password) {
            user.password = password;
        }
        log.info(user);
        userDAO.update(user, function (success) {
            let r =  result.createResult(success, null);
            res.json(r);
        });
    });
});

module.exports = router;
