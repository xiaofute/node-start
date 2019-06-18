
const express = require('express');
const router = express.Router();
const User = require('../core/user');
/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     description: get all user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully query
 */
router.get('/user', async(req, res, next) => {
  const result = await User.query();
  res.json(result);
});
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: get user by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully query
 */
router.get('/user/:id', async(req, res, next) => {
  const result = await User.queryById(req.params.id);
  res.json(result);
});
/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     description: create a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: args
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully create
 */
router.post('/user', async(req, res, next) => {
  const result = await User.add(req.body);
  res.json(result);
});
/**
 * @swagger
 * /user:
 *   put:
 *     tags:
 *       - User
 *     description: update a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: args
 *         in: body
 *         required: true
 *         schema:
 *             properties:
 *               name:
 *                 type: string
 *               realName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully update
 */
router.put('/user', async(req, res, next) => {
  const result = await User.update(req.body);
  res.json(result);
});
/**
 * @swagger
 * /changePassword:
 *   put:
 *     tags:
 *       - User
 *     description: update a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: args
 *         in: body
 *         required: true
 *         schema:
 *             properties:
 *              username:
 *                type: string
 *              byAdmin:
 *                type: boolean
 *              oldPassword:
 *                type: string
 *              newPassword:
 *                type: string
 *     responses:
 *       200:
 *         description: Successfully update
 */
router.put('/changePassword', async(req, res, next) => {
  const result = await User.changePassword(req.body);
  res.json(result);
});
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     description: delete user by if
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully delete
 */
router.delete('/user/:id', async(req, res, next) => {
  const result = await User.deleteById(req.params.id);
  res.json(result);
});
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     description: user login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: args
 *         in: body
 *         required: true
 *         schema:
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully login
 */
router.post('/user/login', async(req, res, next) => {
  const result = await User.login(req.body);
  res.json(result);
});
/**
 * @swagger
 * /user/logout/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: user logout
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully logout
 */
router.get('/user/logout/:id', async(req, res, next) => {
  const result = await User.logout(req.params.id);
  res.json(result);
});
/**
 * @swagger
 * /userInfo:
 *   get:
 *     tags:
 *       - User
 *     description: user logout
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: user token
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully logout
 */
router.get('/userInfo', async(req, res, next) => {
  const result = await User.queryByToken(req.query.token);
  res.json(result);
});
module.exports = router;

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       name:
 *         type: string
 *       mobile:
 *         type: string
 *       email:
 *         type: string
 */