var express = require('express');
var router = express.Router();
var pg = require('pg');
const {Pool} = require("pg");
var url='postgres://fszzrarrjnfdql:9854ee3a622a74f5cc04459ea9af99c768ecc8dfe5916eafd8710294ce0a617e@ec2-18-211-86-133.compute-1.amazonaws.com:5432/d6h34f0ntnu06e';
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
