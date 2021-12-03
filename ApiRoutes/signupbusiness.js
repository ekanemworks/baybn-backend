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
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fidsbay@gmail.com',
        pass: 'fidsbay2021?DESTINY'
    }
});





// SQL_STATEMENTS ALWAYS CROSSCHECK THE NUMBER OF INSERT ? AND THE COLUMN IN THE DATABASE
const sql_check_email = "SELECT * FROM members WHERE email=?";
const sql_create_new_user = "INSERT INTO members VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

// Wallet statements ALWAYS CROSSCHECK THE NUMBER OF INSERT ? AND THE COLUMN IN THE DATABASE
const sql_create_new_user_wallet = "INSERT INTO fidsbay_wallet VALUES (NULL,?,?,?,?,?,?,?)";

// transaction statements
// const sql_insert_transaction = "INSERT INTO fidsbay_wallet VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";


const sql_check_username = "SELECT * FROM members WHERE username=? AND session!=?";
const sql_update_account_details = "UPDATE members SET username=?,business_verification=?,business_rno=?,phoneno=? WHERE session=?";
const sql_get_details = "SELECT * FROM members WHERE session = ?";


   

router.post('/', (req,res) => {

    var datetime = new Date();
    var registrationdate = date.format(datetime, 'ddd, MMM DD YYYY');
    var newsession_variable1 = uuidv4();
    var newsession_variable2 = md5(req.body.email);
    var newsession = newsession_variable1+newsession_variable2;

    try {
            console.log('hits');
        mysqlConnectionfidsbay.query(sql_check_email,[req.body.email],function (err,result,fields) {
            
            var email_count = result.length;

            if (email_count !=0 ) {
                // this means it exist
                res.send(JSON.stringify('exist')); 

            }else{
                // this means it is new

                var escape_signup_input = [newsession,
                    req.body.businessname,
                    '',
                    req.body.email,
                    '',
                    md5(req.body.password),
                    req.body.accounttype,  
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
                    req.body.businesscategory,
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
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_create_new_user,escape_signup_input ,function (err,rows,fields) {
                        
                        if (err) {
                            res.send({status: 'error'})
                        }else{


        



                            try {
                                
                                mysqlConnectionfidsbay.query(sql_get_details,[newsession],function (err,rows,fields) {
                                

                                // wallet inputs array
                                // wallet inputs array
                                var escape_new_wallet_input = 
                                    [rows[0].id,
                                    0,
                                    0,
                                    0,
                                    'Naira',
                                    'notactive',
                                    'notactive']

                                    // To create a new wallet
                                    // To create a new wallet
                                    mysqlConnectionfidsbay.query(sql_create_new_user_wallet,escape_new_wallet_input,function (err,rows2,fields) {

                                        var mailOptions = {
                                            from: 'no-reply@fidsbay.com',
                                            to: req.body.email,
                                            subject: 'Your New Fidsbay Registration',
                                            html:  '<h1>Welcome to Fidsbay</h1> \
                                                    <div style="font-size:16px">\
                                                    \
                                                    <div>Hi '+req.body.businessname+',</div>    \
                                                    <div>Your fidsbay signup was successful, you`re now a member of the Fidsbay Food Community and e-commerce platform. </div><br>\
                                                    <div>At Fidsbay we honor great chef and great restaurants. We believe in passionate expression through cooking. We appreciate you membership to the platform. </div><br> \
                                                    <div>Thanks for signing up,<br> The Fidsbay Team</div>\
                                                    <div style="margin-top:10px;">\
                                                    Confirm your email here \
                                                    <a href="https://www.fidsbay.com" style="padding:5px; text-decoration:none; background: #098223; color:#fff">CONFIRM<a>\
                                                    </div>\
                                                    \
                                                    </div>\
                                                    '
                                            // text: ``
                                            
                                        }
                                        
                                        try {
                                            
                                            transporter.sendMail(mailOptions, function(error,info){
                                            
                                                res.send({status: 'OK', body: rows[0]});

                                            });
                                        } catch (error) {
                                            
                                            res.send({status: 'error'});
                                        }
                    
                                    });

                            
                
                                });
                            } catch (error) {
                                
                            }

                        }


                    });
                } catch (error) {
                    
                }


            } // End of else email count check

            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }
    

});







router.post('/setupaccount', (req,res) => {

    try {
        
        mysqlConnectionfidsbay.query(sql_check_username,[req.body.username,req.body.session],function (err,result,fields) {

            if (result.length != 0) {
                // this means it exist
                console.log('exist')
                res.send({status: 'exist', body: ''});

            }else if (result.length == 0) {

                // THIS IS TO CHECK FOR SPACE IN USERNAME
                var space_check = req.body.username.indexOf(' ');
                if (space_check == -1) {
                var escape_setup_input = [req.body.username,
                                        req.body.businessStatus,
                                        req.body.rc_number,
                                        req.body.phone,
                                        req.body.session]   
                                        
                    try {
                            
                        mysqlConnectionfidsbay.query(sql_update_account_details,escape_setup_input,function (err,rows,fields) {
                        
                            if (err) {
                                console.log(err);
                            }else{

                                try {
                                        
                                    mysqlConnectionfidsbay.query(sql_get_details,[req.body.session],function (err,rows,fields) {
                                
                                        if (err) {
                                            console.log(err);
                                        }else{


                                            res.send({status: 'OK', body: rows[0]});

                                            // res.send(rows[0]);
                                        }
                
                
                                    });
                                } catch (error) {
                                    
                                }
                            }
                        
                        });
                    } catch (error) {
                        
                    }

                }else{
                    res.send({status: 'space', body: ''});
                }
        

            }
        });
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



    try {
                                           
        mysqlConnectionfidsbay.query(sql_update_check_email,[req.body.email,req.body.session],function (err,result,fields) {

            if (result.length!=0) {
                    // means it exists
                    res.send(JSON.stringify('invalid email'));
            }else{
                    // means email is fresh and new
                    try {
                        
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
                                
                                try {
                                        
                                    mysqlConnectionfidsbay.query(sql_update_profile_info,escape_update_profile_input,function (err,rows,fields) {
                    
                                    });
                                } catch (error) {
                                    
                                }
                
                            }else{
                                res.send(JSON.stringify('space'));
                            }
                            // END OF SPACE CHECK


                            }
                
                        });
                    } catch (error) {
                        
                    }

            }

        });
    } catch (error) {
        
    }


});













//  GET SPECIAL CODE FOR LUXURY SIGN UP
//  GET SPECIAL CODE FOR LUXURY SIGN UP
//  GET SPECIAL CODE FOR LUXURY SIGN UP
router.get('/getSpecialCode', (req,res) => {

    const get_special_code = "SELECT special_code FROM AppBase ";


    try {
                                           
        mysqlConnectionfidsbay.query(get_special_code,function (err,result,fields) {

            res.send(result[0]);

        });
    } catch (error) {
        
    }


});










router.post('/filter', (req,res) => {

    res.send(JSON.stringify(req.body.foodcategory))

});




module.exports = router;