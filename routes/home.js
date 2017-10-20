var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Express' });
});

router.get('/collages', function(req, res, next) {
    res.render('collages', { title: 'Express' });
});

router.get('/projects', function(req, res, next) {
    res.render('projects', { title: 'Express' });
});

router.get('/events.ejs', function(req, res, next) {
    res.render('events', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
    res.render('users', { title: 'Express' });
});

router.get('/settings', function(req, res, next) {
    res.render('settings', { title: 'Express' });
});

module.exports = router;