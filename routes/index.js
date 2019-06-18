var express = require('express');
var router = express.Router();
const Result = require('./result/index');
/* 
 const { verifyToken } = require('../utils/jwt');

 const whiteList = ['/api/user/login', '/api/user/logout', '/api/userInfo']; // white list

// 设置跨域访问
router.all('/api/*', function(req, res, next) {
  // req.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , Authorization-Token');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (whiteList.indexOf(req.path) === -1 && req.path.indexOf('logout') === -1 && req.method !== 'OPTIONS') {
    const token = req.headers['authorization-token'];
    const result = verifyToken(token);
    if (result !== 'Token Invalid') {
      next();
    } else {
      const result = new Result(403,'','Login has expired. Please login again');
      res.send(result);
    }
  } else {
    next();
  }
}); */
  
router.use('/api/', require('./user'));   
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
