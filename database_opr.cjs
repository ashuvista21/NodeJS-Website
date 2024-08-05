function dbParams(mariadb, ip, username, passkey, schema) {
  const pool = mariadb.createPool(
  {
    host: ip, 
    user:username, 
    password: passkey,
    database: schema,
    connectionLimit: 5
  }) ;
  return pool ;
}

async function selectQuery (pool, column_names, scheme_name, where_clause, placeholder_array) {
  let sql = "select " + column_names + " from " + scheme_name ;
  if (typeof where_clause !== 'undefined')
    sql += (' where ' + where_clause) ;
  let conn, rows, jsons ;
    try {
      conn = await pool.getConnection() ;
      if (typeof placeholder_array === 'undefined')
        rows = await conn.query(sql) ;
      else
        rows = await conn.query(sql, placeholder_array) ;
    } catch (err) {
        console.log(err.message) ;
    } finally 
    {
      if (conn)
        conn.end() ;
    }
    return rows ;
}

async function insertQuery (pool, column_names, scheme_name, values, placeholder_array) {
  //insert into login_credentials (username, password) values (?, ?)
  let sql = 'insert into ' + scheme_name ;
  if (typeof column_names !== 'undefined')
    sql += (' (' + column_names + ')') ;
  sql += (' values ' + values) ;
  let conn, rows ;
  try {
    conn = await pool.getConnection() ;
    if (typeof placeholder_array === 'undefined')
      rows = await conn.query(sql) ;
    else
      rows = await conn.query(sql, placeholder_array) ;
  } catch (err) {
      console.log(err.message) ;
  } finally 
  {
    if (conn)
      conn.end() ;
  }
  return rows ;
}

module.exports = {selectQuery, dbParams, insertQuery} ;