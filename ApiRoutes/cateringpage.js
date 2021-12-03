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




    // ALL CATERING
    // ALL CATERING
    router.get('/suggestedchefAll', (req,res) => {

        try {
            const sql_suggested = "SELECT * FROM members WHERE accounttype='business' AND business_category='Catering' ORDER BY points DESC ";
            mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }

    
    });



    // LAGOS CATERING SERVICES
    // LAGOS CATERING SERVICES
    router.get('/suggestedchefLagos', (req,res) => {

        try {
            const sql_suggested = "SELECT * FROM members WHERE accounttype='business' AND business_category='Catering' AND city='Lagos' ORDER BY points DESC ";
            mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }

    
    });



    // ABUJA CATERING SERVICES
    // ABUJA CATERING SERVICES
    router.get('/suggestedchefAbuja', (req,res) => {

        try {
            const sql_suggested = "SELECT * FROM members WHERE accounttype='business' AND business_category='Catering' AND city='Abuja' ORDER BY points DESC ";
            mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }

    
    });



module.exports = router;