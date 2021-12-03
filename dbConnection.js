const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');

router.use(cors()); 

var mysqlConnectionfidsbay = mysql.createConnection({
    host: 'localhost', //WEbsite can be inserted here
    user: 'root',
    password: '',
    database: 'fidsoqgv_fidsbay.sql',
    multipleStatements: true
});

// var mysqlConnectionfidsbay = mysql.createConnection({
//     host: 'localhost', //WEbsite can be inserted here
//        user: 'fidsoqgv_admin',
//        password: 'lordkanem766IMORTAL??@',
//        database: 'fidsoqgv_fidsbay',
//        multipleStatements: true
//    });


module.exports = mysqlConnectionfidsbay;