const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');

router.use(cors()); 
router.use(bodyparser.json());
const date = require('date-and-time');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');



// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


// SQL_STATEMENTS
const sql_login_query = "SELECT * FROM members WHERE (username=? AND password=?) OR (email=? AND password=?) ";



router.post('/', (req,res) => {

    var password_encrypted = md5(req.body.password)
    try {
        mysqlConnectionfidsbay.query(sql_login_query,[req.body.usernameOrEmail,password_encrypted,req.body.usernameOrEmail,password_encrypted],function (err,result,fields) {

            if (!err) {
                
                if (result.length==1) {
                    res.send({status: 'OK', body: result[0]});

                }else{

                    res.send({status: 'invalid', body: result[0]});
                    
                }
            }else{
                console.log(err);
            }
            
    
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }


});








module.exports = router;