const userSqlMap = {
    add: 'insert into user(username, password) values(?, ?)',
    deleteById: 'delete from user where id = ?',
    update: 'update user set username=?, password=? where id=?',
    list: 'select * from user',
    getById: 'select * from user where id = ?',
    getByUserName: 'select * from user where username = ?'
};

module.exports = userSqlMap;
