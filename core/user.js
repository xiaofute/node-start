const mysql = require('mysql');
const $mysqlConf = require('../config/config.db');
const $sql = require('./dataBase/userSql');
const Result = require('../routes/result');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const log = require('log-mini');
const { createToken } = require('../utils/jwt');

const pool = mysql.createPool($mysqlConf);

const user = {
  async add(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(async(err, connection) => {
        if (err) {
          reject(err);
        } else {
          const passwordHash = await bcrypt.hash(params.password, saltRounds);
          // 释放连接
          const args = [
            params.username,
            passwordHash,
            params.name,
            params.mobile,
            params.email,
            new Date(Date.now())
          ];
          connection.query($sql.insert, args, (err, result) => {
            if (result) {
              result = new Result(2000, result.insertId, 'add success');
            } else {
              result = new Result(9999, '', err.toString());
            }
            connection.release();
            resolve(result);
          });
        }
      });
    });
  },
  async query() {
    // 释放连接
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          // 释放连接
          connection.query($sql.queryAll, (err, result) => {
            if (result) {
              result = new Result(2000, result, 'query success');
            } else {
              result = new Result(9999, '', err.toString());
            }
            connection.release();
            resolve(result);
          });
        }
      });
    });
  },
  async queryById(id) {
    // 释放连接
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          // 释放连接
          connection.query($sql.queryById, id, (err, result) => {
            if (result) {
              result = new Result(2000, result, 'query by id success');
            } else {
              result = new Result(9999, '', err.toString());
            }
            connection.release();
            resolve(result);
          });
        }
      });
    });
  },
  async update(params) {
    // 释放连接
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          const args = [
            params.username,
            params.name,
            params.mobile,
            params.email,
            new Date(Date.now()),
            params.id
          ];
          log.info(args);
          connection.query($sql.update, args, (err, result) => {
            if (result) {
              result = new Result(2000, result, 'update success');
            } else {
              result = new Result(9999, '', err.toString());
            }
            connection.release();// 释放连接
            resolve(result);
          });
        }
      });
    });
  },
  async deleteById(id) {
    // 释放连接
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          // 释放连接
          connection.query($sql.delete, id, (err, result) => {
            if (result) {
              result = new Result(2000, result, 'delete success');
            } else {
              result = new Result(9999, '', err.toString());
            }
            connection.release();
            resolve(result);
          });
        }
      });
    });
  },
  async login(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          const username = params.username;
          console.log(username);
          connection.query($sql.queryByName, username, async(err, result) => {
            if (err) {
              reject(err);
            }
            if (result.length > 0) {
              const user = result[0];
              console.log(params.password, user.password);
              const passwordCheck = await bcrypt.compare(params.password, user.password);
              if (passwordCheck) {
                delete user.password;
                const token = createToken(username, '2', 'hours');
                user.token = token;
                await connection.query($sql.setToken, [token, user.id]);
                result = new Result(2000, user, 'login success');
              } else {
                result = new Result(9999, '', 'error password');
              }
            } else {
              result = new Result(9999, '', 'The user does not exist.');
            }
            connection.release();// 释放连接
            resolve(result);
          });
        }
      });
    });
  },
  logout(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          const args = [null, id];
          connection.query($sql.setToken, args, (err, result) => {
            if (result) {
              result = new Result(2000, result, 'logout success');
            } else {
              result = new Result(9999, '', err.toString());
            }
            connection.release();
            resolve(result);
          });
        }
      });
    });
  },
  queryByToken(token) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query($sql.queryByToken, token, (err, result) => {
            log.info(result);
            if (result.length > 0) {
              result = result[0];
              delete result.password;
              result = new Result(2000, result, 'query user info success');
            } else {
              result = new Result(403, {}, 'Login has expired. Please login again');
            }
            // 释放连接
            connection.release();
            resolve(result);
          });
        }
      });
    });
  },
  async  changePassword(params) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        } else {
          const { username, byAdmin, oldPassword, newPassword } = params;
          let result = {};
          connection.query($sql.queryByName, username, async(err, user) => {
            if (user.length > 0) {
              user = user[0];
              console.log(!byAdmin);
              if (!byAdmin) {
                const passwordCheck = await bcrypt.compare(oldPassword, user.password);
                log.info(oldPassword, user.password, passwordCheck);
                if (!passwordCheck) {
                  result = new Result(9999, '', 'bad old password');
                  resolve(result);
                  return;
                }
              }
              const passwordHash = await bcrypt.hash(newPassword, saltRounds);
              const args = [
                passwordHash,
                user.id
              ];
              connection.query($sql.updatePassword, args, (err, res) => {
                log.info(args, res, user);
                if (res) {
                  result = new Result(2000, res, 'change password success');
                } else {
                  log.error(err);
                  result = new Result(9999, '', err.toString());
                }
                resolve(result);
              });
            } else {
              result = new Result(9999, '', err.toString());
              resolve(result);
            }
            connection.release(); // 释放连接
          });
        }
      });
    });
  }

};
user.query();
module.exports = user;
