var express = require('express');
var router = express.Router();
var pg = require('pg');
const {Pool} = require("pg");
var url='postgresql://localhost:5432/local_db';
const pool = new Pool({
  connectionString: url,
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.route('/psqldb').get( function(req, res, next) {
  pool.connect( function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      console.log(result);
      done();
      if (err)
      { console.error(err); res.send("Error " + err); }
      else
      { res.render('pages/db', {results: result.rows} ); }
    });
  });
});
module.exports = router;
