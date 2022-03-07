const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'image/' })

router.use(cors()); 
router.use(bodyparser.json());
const date = require('date-and-time');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');


// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);

router.use(cors()); 






router.post('/', (req,res) => {

    try {
        const sqlconst = "SELECT * FROM AppBase WHERE app_version=? ";
        mysqlConnectionfidsbay.query(sqlconst,[req.body.version],function (err,rows,fields) {
            
            res.send(rows);
        }); //End of product mysql statement
        
    } catch (error) {
        
    }


    
    });





        



module.exports = router;