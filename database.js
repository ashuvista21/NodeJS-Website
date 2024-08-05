import * as mariadb from 'mariadb' ;
import express from 'express' ;
import bodyParser from 'body-parser' ;
import multer from 'multer' ;
import * as fs from 'fs' ;
import * as url from 'url' ;
import * as db from './database_opr.cjs' ;

let upload = multer();

const app = express() ;
app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;
app.use(upload.array()) ;

const pool = db.dbParams(mariadb, 'localhost', 'root', '123456', 'customers_info') ;

//login get api
app.get('/login', (req, res) => {
  try {
    var parseURL = url.parse(req.url, true);
    var filename = "." + parseURL.pathname + '.html' ;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }) ;
  } catch (err) {
      console.log(err.message) ;
  }
}) ;

//login post api
app.post('/login', async(req, res) => {
  try {
    const credentials = {
      username : req.body.username,
      password : req.body.password
    } ;
    let data = db.selectQuery(pool, '*', 'login_credentials', 'username = ?', [credentials.username]) ;
    data.then( (result) => {
      if (typeof result[0] === 'undefined') 
        res.send('Invalid user') ;
      else if (credentials.password == result[0].password) {
        res.redirect('http://localhost:8080/home?username='+credentials.username+'&sessionid=1234') ;
      }
      else
        res.send('Wrong password') ; 
    } ) ;
  } catch (err) {
      console.log(err.message) ;
  }
}) ;

app.get('/login/data', async(req, res) => {
  try {
    const sent_data = {
      info : '',
      error : '',
      flag : false
    } ;
    let api_data = url.parse(req.url, true).query ;
    let password_data = db.selectQuery(pool, 'password', 'login_credentials', 'username = ?', [api_data.username]) ;
    password_data.then( (result) => {
      if (typeof result[0] === 'undefined') 
        sent_data.error = 'Invalid username' ;
      else if (api_data.password == result[0].password) {
        sent_data.info = 'User validated' ; 
        sent_data.flag = true ;
      }
      else
        sent_data.info = 'Wrong Password' ;
      res.send(sent_data) ;
    } ) ;
  } catch (err) {
      console.log(err.message) ;
  }
}) ;

//signup get api
app.get('/signup', (req, res) => {
  try {
    var parseURL = url.parse(req.url, true);
    var filename = "." + parseURL.pathname + '.html' ;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }) ;
  } catch (err) {
      console.log(err.message) ;
  }
}) ;

//signup post api
app.post('/signup', async(req, res) => {
  try {
    const user_details = {
      firstname : req.body.firstname,
      middlename : req.body.middlename,
      lastname : req.body.lastname,
      username : req.body.username,
      email : req.body.email,
      phone : req.body.phone,
      password : req.body.psw
    } ;
    let data = db.insertQuery(pool, 'username, password', 'login_credentials', '(?, ?)', [user_details.username, user_details.password]) ;
    data.then( (result_of_insert_login) => {
      let tmp = result_of_insert_login ;
      if (tmp.affectedRows == 1) {
        let cust_id_data = db.selectQuery(pool, 'customer_id', 'login_credentials', 'username = ?', [user_details.username]) ;
        cust_id_data.then ( (result_of_select_login) => {
          if (typeof result_of_select_login[0] == 'undefined')
            res.send('Not able to fetch customer_id') ;
          else {
            let cus_id = result_of_select_login[0].customer_id ;
            let col_name = 'customer_id, first_name, email_id, contact_no' ;
            let val = '(?, ?, ?, ?' ;
            let val_arr = [cus_id, user_details.firstname, user_details.email, user_details.phone] ;
            if (typeof user_details.middlename !== 'undefined' && user_details.middlename !== '') {
              col_name += ', middle_name' ;
              val += ', ?' ;
              val_arr.push(user_details.middlename) ;
            }
            if (typeof user_details.lastname !== 'undefined' && user_details.lastname !== '') {
              col_name += ', last_name' ;
              val += ', ?' ;
              val_arr.push(user_details.lastname) ;
            }
            val += ')' ;
            let cus_det = db.insertQuery(pool, col_name, 'customers_details', val, val_arr) ;
            cus_det.then( (result_of_insert_customer) => {
              let cus_data = result_of_insert_login ;
              if (cus_data.affectedRows == 1)
                res.send('Gotcha') ;
              else
                res.send('Failed at customer creation') ;
            }) ;
          }
        }) ;
      }
      else
        res.send("Failed at login creation") ; 
    } ) ;
  } catch (err) {
      console.log(err.message) ;
  }
}) ;

//api to import javascript files from html pages
app.get(/.js$/, (req, res) => {
  try {
    var parseURL = url.parse(req.url, true) ;
    var filename = "." + parseURL.pathname ;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      return res.end();
    }) ;
  } catch (err) {
      console.log(err.message) ;
  }
}) ;

//home get api
app.get('/home', (req, res) => {
  try {
    var parseURL = url.parse(req.url, true);
    var filename = "." + parseURL.pathname + '.html' ;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'}) ;
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'}) ;
      res.write(data) ;
      return res.end();
    }) ;
  } catch (err) {
      console.log(err.message) ;
  }
}) ;

//data get api
app.get('/data', (req, res) => {
  try {
    const sent_data = {
      name : '',
      error : ''
    } ;
    let api_data = url.parse(req.url, true).query ;
    let cust_id_data = db.selectQuery(pool, 'customer_id', 'login_credentials', 'username = ?', [api_data.username]) ;
    cust_id_data.then( (result_of_select_login) => {
      if (typeof result_of_select_login[0] === 'undefined') {
        sent_data.error = 'Not able to fetch customer_id' ;
        res.send(sent_data) ;
      }
      else {
        let cus_id = result_of_select_login[0].customer_id ;
        let firstname_data = db.selectQuery(pool, 'first_name', 'customers_details', 'customer_id = ?', [cus_id]) ;
        firstname_data.then( (result_of_select_customer_firstname) => {
          if (typeof result_of_select_customer_firstname[0] == 'undefined')
            sent_data.error = 'Not able to fetch firstname' ;
          else
            sent_data.name = result_of_select_customer_firstname[0].first_name ;
          res.send(sent_data) ;
        }) ;
      }
    }) ;
  } catch (err) {
      console.log(err.message) ;
  }
}) ;

app.listen(8080, () => {
  console.log('Express server running on port 8080');
  });