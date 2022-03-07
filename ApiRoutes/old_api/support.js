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




const sql_check_password = "SELECT * FROM members WHERE password=? AND session=?";



router.post('/report', (req,res) => {

    var productID =  req.body.productID;
    var message =  req.body.message;
    var reporter =  req.body.reporter;



                var mailOptions = {
                from: 'no-reply@fidsbay.com',
                to: 'callcare.fidsbay@gmail.com',
                subject: 'Report of Product on Fidsbay.com',
                html:  '<h1>A product has been reported on fidsbay</h1> \
                        <div style="font-size:16px">\
                        \
                        <div> Product id: '+productID+',</div>    \
                        <div> Message: '+message+',</div><br>    \
                        <div> Reporter: '+reporter+',</div><br>    \
                        Consult with upper authority\
                        \
                        </div>\
                        '
                // text: ``
                
            }

            try {
                
                transporter.sendMail(mailOptions, function(error,info){
                
                    res.send({status: 'OK'});

                });
            } catch (error) {
                
                res.send({status: 'error'});
            }



});








router.post('/userSuggestion', (req,res) => {

    var fullname =  req.body.fullname;
    var username =  req.body.username;
    var phoneno =  req.body.phoneno;
    var message =  req.body.message;



                var mailOptions = {
                from: 'no-reply@fidsbay.com',
                to: 'callcare.fidsbay@gmail.com',
                subject: 'Suggestions FROM users',
                html:  '<h1>Suggestion</h1> \
                        <div style="font-size:16px">\
                        \
                        <div> username: '+username+',</div>    \
                        <div> fullname: '+fullname+',</div>    \
                        <div> Message: '+message+',</div><br>    \
                        <div> user PhoneNo: '+phoneno+',</div><br>    \
                        Consult with upper authority\
                        \
                        </div>\
                        '
                // text: ``
                
            }

            try {
                
                transporter.sendMail(mailOptions, function(error,info){
                
                    res.send({status: 'OK'});
                    // console.log('cool');

                    // console.log(fullname+username+message+phoneno);

                });
            } catch (error) {
                
                res.send({status: 'error'});
            }



});

module.exports = router;