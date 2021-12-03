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





router.get('/shopowner/:username', (req,res) => {

    // const sql_suggested = "SELECT * FROM products WHERE productcategory Like ?";



    const sql_suggested = "SELECT *  FROM members WHERE username = ? ";
    try {
        mysqlConnectionfidsbay.query(sql_suggested,[req.params.username],function (err,rows,fields) {
        
            res.send(rows);
        }); //End of product mysql statement
    
    } catch (error) {
        
    }

    
    
    });



    router.post('/memberstatus', (req,res) => {


        const sql_update_status = "UPDATE members SET userstatus = ? WHERE id = ? ";
        try {
            mysqlConnectionfidsbay.query(sql_update_status,['member',req.body.userid],function (err,rows,fields) {
            
                res.send(JSON.stringify('member'));
            }); //End of product mysql statement
          
        } catch (error) {
            
        }
    
        
        
        });




router.post('/getWallet', (req,res) => {

    console.log(req.headers.apikey);
    const sql_get_wallet_info = "SELECT * FROM fidsbay_wallet WHERE userid = ? ";
    try {
        mysqlConnectionfidsbay.query(sql_get_wallet_info,[req.body.userid],function (err,rows,fields) {
        
            res.send(rows);

        }); //End of product mysql statement
      
    } catch (error) {
        
    }

    
    
});

module.exports = router;