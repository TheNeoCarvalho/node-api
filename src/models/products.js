const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'carrinho'
});

let userModel = {};

userModel.getProducts = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM produtos ORDER BY id',
      (err, rows) => {
        if (err) {
          throw err
        }
        else {
          callback(null, rows);
        }
      }
    )
  }
};

userModel.insertUser = (  userData, callback) => {
  if (connection) {
    connection.query('INSERT INTO produtos SET ?', userData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {'insertId': result.insertId})
        }
      }
    )
  }
};

userModel.updateUser = (userData, callback) => {
  if (connection) {
    const sql = `
      UPDATE produtos SET
      nome = ${connection.escape(userData.nome)},
      preco = ${connection.escape(userData.preco)},
      imagem = ${connection.escape(userData.imagem)}
      WHERE id = ${userData.id}`;

    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        callback(null, {
          "msg": "Sucesso!"
        })
      }
    });
  }
};

userModel.deleteUser = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM produtos WHERE id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM produtos WHERE id=` + connection.escape(id);
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else{
            callback(null, {
              "msg": "Deletado!"
            });
          }
        });
      } else {
        callback(null, {
          "msg": "Não Existe!"
        });
      }
    });
  }
}

module.exports = userModel;
