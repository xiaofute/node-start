const jwt = require('jsonwebtoken');

const secret = 'abc';
const Plat = 'WEB';

const createToken = (username, expires, strTimer) => {
  const token = jwt.sign({
    User: username,
    Plat
  }, secret, {
    expiresIn: expires + ' ' + strTimer
  });
  return token;
};
// let serverToken = createToken("admin", "WEB", "7", "days");
// let localToken = createToken("admin", "WEB", "2", "hours");
// console.log(serverToken);
// console.log(localToken);

const verifyToken = (_token) => {
  const verify = jwt.verify(_token, secret, (error, decoded) => {
    if (error) {
      return 'Token Invalid';
    }
    return decoded;
  });
  return verify;
};

module.exports  = {createToken,verifyToken};