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
const { response } = require('express');


// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fidsbay@gmail.com',
        pass: 'fidsbay2021?DESTINY'
    }
});





// SQL_STATEMENTS
const sql_check_username = "SELECT * FROM members WHERE username=?";
const sql_get_new_user = "SELECT * FROM members WHERE session = ?";



   
router.post('/', (req,res) => {

    var datetime = new Date();
    var registrationdate = date.format(datetime, 'ddd, MMM DD YYYY');
    var newsession_variable1 = uuidv4();
    var newsession = newsession_variable1;


    // CHECK USERNAME COUNT QUERY
    // CHECK USERNAME COUNT QUERY
    try {
        mysqlConnectionfidsbay.query(sql_check_username,[req.body.username],function (err,result,fields) {
            
            var username_count = result.length;

            if (username_count !=0 ) {
                // this means it exist
                MyResponse = {
                    status: 'exist'
                }
                res.send(JSON.stringify(MyResponse));

            }else{
                // this means it is new

                var escape_signup_input = [
                                            newsession,
                                            req.body.fullname,
                                            req.body.username,
                                            '',
                                            '',
                                            md5(req.body.password),
                                            'customer',
                                            req.body.accountclass,
                                            'Nigeria',
                                            req.body.city,
                                            '',
                                            registrationdate,
                                            '',
                                            '',
                                            'Hello, this is my Fidsbay bio',
                                            'newuser',
                                            1,
                                            0,
                                            '',
                                            '',
                                            '',
                                            0,
                                            0,
                                            0.00,
                                            0,
                                            '',
                                            '',
                                            'active',
                                            '']


                // CREATE USER ACCOUNT QUERY
                // CREATE USER ACCOUNT QUERY
                try {
                    
                    const sql_create_new_user = "INSERT INTO members VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    mysqlConnectionfidsbay.query(sql_create_new_user,escape_signup_input ,function (err,rows,fields) {
                        

                        // GET ALL USER ACCOUNT QUERY
                        // GET ALL USER ACCOUNT QUERY
                        try {
                           
                            mysqlConnectionfidsbay.query(sql_get_new_user,[newsession] ,function (err,rows,fields) {
                                if (!err) {
                                    
                                    // wallet inputs array
                                    // wallet inputs array
                                    var escape_new_wallet_input = [
                                        rows[0].id,
                                        0,
                                        0,
                                        0,
                                        'Naira',
                                        'notactive',
                                        'notactive']

                                    // To create a new wallet
                                    // To create a new wallet

                                    // Wallet statements ALWAYS CROSSCHECK THE NUMBER OF INSERT ? AND THE COLUMN IN THE DATABASE
                                    const sql_create_new_user_wallet = "INSERT INTO fidsbay_wallet VALUES (NULL,?,?,?,?,?,?,?)";

                                    mysqlConnectionfidsbay.query(sql_create_new_user_wallet,escape_new_wallet_input,function (err,rows2,fields) {

                                        res.send({status: 'OK', body: rows[0]});

                    
                                    });

                                }else{                                    
                                    console.log(err);

                                }

                            }); 
                        } catch (error) {
                            console.log(error);
                        }

                    });
                } catch (error) {
                    
                }


            } // End of else username count check

            
        }); //QUERY TO CHECK IF username IS IN USE


    } catch (error) {
        
    }
    
});
















router.get('/updateprofile', (req,res) => {
    var escape_update_profile_input = [req.body.email,
                                       req.body.phoneno,
                                       req.body.bio,
                                       req.body.fullname,
                                       req.body.username,
                                       req.body.session]



                                       
    mysqlConnectionfidsbay.query(sql_update_check_email,[req.body.email,req.body.session],function (err,result,fields) {

        if (result.length!=0) {
                // means it exists
                res.send(JSON.stringify('invalid email'));
        }else{
                // means email is fresh and new
                mysqlConnectionfidsbay.query(sql_update_check_username,[req.body.username,req.body.session],function (err,rows,fields) {

                    if (rows.length!=0) {
                    // means username exist
                res.send(JSON.stringify('invalid username'));
                    
                    }else{
                    // means username is new
 

                    // TO CHECK IF THERE IS SPACE IN THE USERNAME STRING
                    // TO CHECK IF THERE IS SPACE IN THE USERNAME STRING
                    var space_check = req.body.username.indexOf(' ');
                    if (space_check == -1) {
                        
                        mysqlConnectionfidsbay.query(sql_update_profile_info,escape_update_profile_input,function (err,rows,fields) {
        
                                    
        
                        });
        
                    }else{
                        res.send(JSON.stringify('space'));
                    }
                    // END OF SPACE CHECK


                    }
        
                });

        }

    });


});










module.exports = router;