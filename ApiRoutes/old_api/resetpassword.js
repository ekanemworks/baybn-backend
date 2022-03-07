const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var multer = require('multer');

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
        pass: 'fidsbay2021'
    }
});



   




router.post('/', (req,res) => {


    var reset_variable1 = uuidv4();
    reset_variable1 = reset_variable1.substring(0,9)

    mysqlConnectionfidsbay.query("UPDATE members SET reset_password_variable = ? WHERE email=?",[reset_variable1,req.body.emailAdress],function (err,result,fields) {


        var mailOptions = {
            from: 'no-reply@fidsbay.com',
            to: req.body.emailAdress,
            subject: 'Fidsbay Password Reset',
            html:  `<h1>Password Reset</h1> \
                    <div style="font-size:16px">\
                    \
                    <div>Hi ${req.body.emailAdress},</div>    \
                    <div>Our system recieved a request for a password reset on your account. </div><br>\
                    <div>If this is true, kindly use the link below to reset your password. </div><br> \
                    <div style="margin-top:10px;">\
                    Click the button to enter new password \
                    <a href="https://www.fidsbay.com/createnewpassword/${reset_variable1}" style="padding:6px; text-decoration:none; background: #098223; color:#fff">New Password<a>\
                    </div>\
                    \
                    </div>\
                    `
            // text: ``
            
        }


        transporter.sendMail(mailOptions, function(error,info){
            if (error) {
                console.log(error);
                res.send(JSON.stringify('error'))
            }else{
                // console.log('Email sent:' + info.response);
                res.send(JSON.stringify('ok'))
            }
        });



    });



});






router.post('/createNewpassword', (req,res) => {


    var reset_variable1 = req.body.resetVariable;


    var password = md5(req.body.password)

    mysqlConnectionfidsbay.query("UPDATE members SET password = ? WHERE reset_password_variable = ?",[password, reset_variable1],function (err,result,fields) {


        if (err) {
            console.log(err)
        }else{
            mysqlConnectionfidsbay.query("UPDATE members SET reset_password_variable = ? WHERE reset_password_variable = ?",['', reset_variable1],function (err,result,fields) {

                res.send(JSON.stringify('ok'))

            });
        }



    });



});

module.exports = router;