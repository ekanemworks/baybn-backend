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



        router.get('/signupCriteria', (req,res) => {
  
            const sqlconst = "SELECT * FROM signup_criteria WHERE id=1";
         
                    try {
                        mysqlConnectionfidsbay.query(sqlconst,function (err,result2,fields) {
                                           

                            // console.log(JSON.parse(result2[0].countries));
                            // res.send(JSON.parse(result2[0].countries))

                            // console.log(result2[0]);
                            res.send(result2[0]);
                  
                        });
                    } catch (error) {
                        
                    }
                    
        
        
        });   
        
        




    router.post('/addMember', (req,res) => {
  
        // SQL_STATEMENTS
        const sql_check_email = "SELECT * FROM members WHERE email = ?";

            try {
                mysqlConnectionfidsbay.query(sql_check_email,[req.body.email],function (err,result1,fields) {
                  
                    if (result1.length == 0) {
                        // NEW VALUES
                        var newsession = uuidv4()+'baybn';
                        var datetime = new Date();
                        var dateregistered = date.format(datetime, 'ddd, MMM DD YYYY');
                        var currentdate = date.format(datetime, 'YYYY');
                        currentdate = parseInt(currentdate);
                        var yearofbirth = parseInt(req.body.yearofbirth);
                        var encryptedpass = md5(req.body.password);
                        var username = req.body.fullname.split(" ");
                        username = username[0];
                        username = 'username'+username+newsession.substr(0,3);

                        var friends_add_request = [];
                        var friends_with_array = [];

                        friends_add_request_from = JSON.stringify(friends_add_request);
                        friends_add_request_to = JSON.stringify(friends_add_request);
                        friends_with_array = JSON.stringify(friends_with_array);

                        var verificationCode = uuidv4().substr(0,4);


                        var escape_signup_array = [
                                newsession,
                                req.body.fullname,
                                username, //username
                                req.body.email,
                                0, //phone number
                                encryptedpass, //password
                                'Hi there, this is my bio', //BIO
                                yearofbirth, // year of birth
                                (currentdate - yearofbirth), //age
                                req.body.gender, //age
                                '', //profilephoto
                                '', //country_code
                                req.body.country, //country_name
                                dateregistered, //dateregistered
                                friends_add_request_from, //interest
                                friends_add_request_from, //friend add request from (ARRAY OF OBJECTS)
                                friends_add_request_to, //friend add request from (ARRAY OF OBJECTS)
                                friends_with_array, //friends with
                                friends_with_array, //Rejected My Request
                                friends_with_array, //Block this account
                                friends_with_array, //status post array
                                0, //status post count
                                '', //status post last time
                                '', //status post last date
                                '', //profession
                                '', //companyname
                                req.body.university, //university
                                'newmember', //platformstatus: newmember, member, verified
                                'online', //onlinestatus
                                'active', //accountstatus: active, suspended
                                '',//relationshipstatus: single, in-relationship, custom
                                0,//visits
                                'false', // popular status
                                'off', // hide status
                                '' ,// reset code
                                '',// verify email code
                                ''] // Profile Type
                            console.log(req.body.university);
                        const sql_create_new_user = "INSERT INTO members VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                        try {
                            mysqlConnectionfidsbay.query(sql_create_new_user,escape_signup_array,function (err,result2,fields) {
                                
                                if (!err) {

                                    const sql_get_new_user = "SELECT * FROM members WHERE session = ?";
                                    mysqlConnectionfidsbay.query(sql_get_new_user,[newsession],function (err,result3,fields) {

                                        if (!err) {
                                                    
                                            var mailOptions = {
                                                from: 'no-reply@fidsbay.com',
                                                to: req.body.email,
                                                subject: 'Your New Baybn Account',
                                                html:  '<h1>Welcome to Baybn</h1> \
                                                        <div style="font-size:16px">\
                                                        \
                                                        <div>Hi '+req.body.fullname+',</div>    \
                                                        <div>Your Baybn signup was successful. </div><br>\
                                                        <div>. </div><br> \
                                                        <div>Thanks for signing up,<br> The Fidsbay Team</div>\
                                                        <div style="margin-top:10px;">\
                                                        Confirm your email here \
                                                        <a href="https://www.baybn.com/verifyemail/'+verificationCode+'" style="padding:5px; text-decoration:none; background: #098223; color:#fff">CONFIRM<a>\
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
                                                
                                                res.send({status: 'error'});
                                            }
                                            
                                        }else{
                                            console.log(err);
                                        }


                                    });


                                }else{
                                    console.log(err);
                                }
                    
                            });
                        } catch (error) {
                            console.log(error);
                        }

                    }else{

                        bodyResponse = {
                            status: 'ok',
                            session: '',
                            direction: '',
                            message: 'Email already used'
                        }
                        // console.log(bodyResponse);

                        res.send(bodyResponse)
                    }
                  
                });

            } catch (error) {
                console.log(error);   
            }

        
        
        });   

    
        

        router.get('/setupInterests', (req,res) => {
           
            const sqlconst = "SELECT * FROM signup_interest";
         
            try {
                mysqlConnectionfidsbay.query(sqlconst,function (err,result1,fields) {
                    res.send(result1);
                });

            } catch (error) {
                
            }
  
        
        
        });  


    
        

        router.post('/addInterests', (req,res) => {
           
            const sql_interests = "UPDATE members SET interests = ? WHERE session = ? ";
            var myinterest =  req.body.myinterest;
            var session = req.body.session;

            myinterest = JSON.stringify(myinterest);
        

            try {
                mysqlConnectionfidsbay.query(sql_interests,[myinterest,session],function (err,result1,fields) {

                    if (!err) {
                        res.send({status: 'ok', message: 'success'});
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



module.exports = router;