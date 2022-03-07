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
const nodemailer = require('nodemailer');


// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection');
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);

router.use(cors()); 

 
        
        




    router.post('/authenticateUser', (req,res) => {
  
        // SQL_STATEMENTS
        const sql_authentication = "SELECT * FROM members WHERE (email=? AND password=?)";

        var emailorphone = req.body.emailorphone;
        var password_encrypted = md5(req.body.password);

        var escape_signup_array = [
            emailorphone,
            password_encrypted
        ]

            try {
                mysqlConnectionfidsbay.query(sql_authentication,escape_signup_array,function (err,result1,fields) {
                    if (result1.length == 1) {

                        bodyResponse = {
                            status: 'ok',
                            body: result1[0],
                            direction: 'setup',
                            message: 'signup successful'
                        }
                        res.send(bodyResponse)

                    }else{
                        bodyResponse = {
                            status: 'error',
                            message: 'Wrong email, phone no or password'
                        }
                        // console.log(bodyResponse);

                        res.send(bodyResponse)
                    }
                  
                });

            } catch (error) {
                console.log(error);   
            }

        
        
        });   

    
        


     



module.exports = router;