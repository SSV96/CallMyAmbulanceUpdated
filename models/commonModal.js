const sqlConnection = require("../services/sqlConnection");

exports.loginCheck = (data, callback) => {
  let values = [data.email, data.phone];
  const table = data.table;
  console.log("from Login Check ", values);
  const sql = `select * from ${table} where email = ? or phone =?`;
  sqlConnection.executeQuery(sql, values, function (err, result) {
    callback(err, result);
  });
};
