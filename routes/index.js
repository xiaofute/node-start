var express = require('express');
var router = express.Router();
const Result = require('./result/index');
/**
 * @swagger
 * /search:
 *   get:
 *     tags:
 *       - test
 *     description: poi search
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         description: KYC Info key code
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: An array of users
 */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
/**
 * @swagger
 * /res:
 *   get:
 *     tags:
 *       - test
 *     description: result demo
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 */
router.get('/res', function(req, res, next) {
    const result = new Result('ACK',{id:1},'success');
    res.send(result);
});
module.exports = router;
