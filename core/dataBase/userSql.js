var user = {
  insert: 'INSERT INTO user(username, password, name, mobile, email,modifyTime) VALUES(?,?,?,?,?,?)',
  update: 'update user set username=?, name=?, mobile=?, email=?,modifyTime=? where id=?',
  setToken: 'update user set token=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  updatePassword: 'update user set password=? where id=?',
  queryByToken: 'select * from user where token=?',
  queryByName: 'select * from user where username=?',
  queryAll: 'select * from user'
};

module.exports = user;
