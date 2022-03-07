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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'baybn.app@gmail.com',
        pass: 'lordkanem766imortal'
    }
});

router.use(cors()); 
        

        router.post('/changePassword', (req,res) => {
            
            var currentpassword =  md5(req.body.currentpassword);
            var newpassword =  md5(req.body.newpassword);
            var session = req.body.session;



            const sql_get_current_password = "SELECT password FROM members WHERE session = ? ";
            try {
                mysqlConnectionfidsbay.query(sql_get_current_password,[session],function (err,result1,fields) {

                    if (!err) {
                        
                        if (result1[0].password == currentpassword) {
                            

                            const sql_set_new_password = "UPDATE members SET password = ? WHERE session = ? ";
                            try {
                                mysqlConnectionfidsbay.query(sql_set_new_password,[newpassword,session],function (err,result1,fields) {
                
                                    if (!err) {
                                        res.send({status: 'ok', message: 'successful update'});
                                    }else{
                                        console.log(err);
                                        res.send({status: 'error', message: 'database error'});
                
                                    }
                
                                });
                
                            } catch (error) {
                                console.log(error);
                                res.send({status: 'error', message: 'server error'});
                
                            }


                        }else{
                            res.send({status: 'ok', message: 'incorrect current password!'});
                        }





                    }else{
                        console.log(err);
                        res.send({status: 'error', message: 'database error'});

                    }

                });

            } catch (error) {
                console.log(error);
                res.send({status: 'error', message: 'server error'});

            }
  
        
        
        });  





        router.post('/sendVerificationCodeToEmail', (req,res) => {
            
            var email = req.body.email;
            var session = req.body.session;
            var verificationCode = uuidv4().substr(0,4);

            const sql_get_new_user = "UPDATE members SET email=?, verify_email_code = ? WHERE session = ?";
            mysqlConnectionfidsbay.query(sql_get_new_user,[email,verificationCode, session],function (err,result3,fields) {
                if (!err) {
                     // PERFORM EMAIL VERIFICATION MAGIC
                        var mailOptions = {
                            from: 'no-reply@fidsbay.com',
                            to: req.body.email,
                            subject: 'Baybn: Email Verification ',
                            html:  '<h1>Welcome to Baybn</h1> \
                                    <div style="font-size:16px">\
                                    \
                                    <div>Hi,</div>    \
                                    <div>Click the link below to verify your email address. </div><br>\
                                    <div>. </div><br> \
                                    <div style="margin-top:10px;">\
                                    Confirm your email here \
                                    <a href="https://www.baybn.com/verifyemail/'+verificationCode+'" style="padding:5px; text-decoration:none; background: #098223; color:#fff">Verify<a>\
                                    </div>\
                                    \
                                    </div>\
                                    '
                            // text: ``
                            
                        }

                        try {
                                                            
                            transporter.sendMail(mailOptions, function(error,info){
                                    
                                bodyResponse = {
                                    status: 'ok',
                                    body: {id: result3[0].id, session: newsession, username: result3[0].username},
                                    direction: 'setup',
                                    message: 'signup successful'
                                }
                                // console.log(bodyResponse);

                                res.send(bodyResponse);

                            }); 
                        } catch (error) {
                            console.log(error);
                            res.send({status: 'error'});
                        }
                }else{
                    console.log(err);
                    res.send({status: 'error', message: 'database error'});
                }
            });

           
        
        });  





        router.post('/changeHideStatus', (req,res) => {
            
            var hide_profile = req.body.hide_profile;
            var session = req.body.session;
            console.log(req.body);

            if (hide_profile == true) {
                hide_profile = 'on';
            }else{
                hide_profile = 'off';
            }



                            const sql_set_hide_profile = "UPDATE members SET hide_profile = ? WHERE session = ? ";
                            try {
                                mysqlConnectionfidsbay.query(sql_set_hide_profile,[hide_profile,session],function (err,result1,fields) {
                
                                    if (!err) {
                                        console.log('ok');
                                        res.send({status: 'ok', message: 'successful update'});
                                    }else{
                                        console.log(err);
                                        console.log('error');

                                        res.send({status: 'error', message: 'database error'});
                
                                    }
                
                                });
                
                            } catch (error) {
                                console.log(error);
                                res.send({status: 'error', message: 'server error'});
                
                            }
        
        
        });  

module.exports = router;