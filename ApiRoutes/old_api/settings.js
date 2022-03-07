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



const sql_check_password = "SELECT * FROM members WHERE password=? AND session=?";
const sql_UPDATE_passsword = "UPDATE members SET password=? WHERE session=?";
const sql_UPDATE_general1 = "UPDATE members  SET twitter = ?, instagram = ?, city = ? WHERE session = ?";
const sql_UPDATE_general2 = "UPDATE members  SET twitter = ?, instagram = ? WHERE session = ?";


// To send back to update localstorage
// To send back to update localstorage
const sql_get_user_info = "SELECT * FROM members WHERE session=?";

   


router.post('/password', (req,res) => {

    var currentpw =  req.body.currentpw;
    var newpw =  req.body.newpw;
    var session = req.body.session;

    currentpw = md5(currentpw);
    newpw = md5(newpw);


    // CHECK TO SEE IF PASSWORD IS CORRECT
    // CHECK TO SEE IF PASSWORD IS CORRECT
    // CHECK TO SEE IF PASSWORD IS CORRECT
    try {
            
        mysqlConnectionfidsbay.query(sql_check_password,[currentpw,session],function (err,result,fields) {


            // Condition to check result of query
            if (result.length==1) {


                // TO UPDATE THE PASSWORD
                // TO UPDATE THE PASSWORD
                try {
                    mysqlConnectionfidsbay.query(sql_UPDATE_passsword,[newpw,session],function (err,result,fields) {

                        // Get all user Data to upload local Storage userpayload
                        // Get all user Data to upload local Storage userpayload
                        mysqlConnectionfidsbay.query(sql_get_user_info,[req.body.session],function (err,rows,fields) {
                            res.send({status: 'OK', body: rows[0]});
                        });
                        
                    });
                } catch (error) {
                    
                }


            }else{
                res.send({status: 'invalid', body: ''});
            }
            // End of condition check
            
        });

    } catch (error) {
        
    }


});









router.post('/general', (req,res) => {

    var instagram =  req.body.instagram;
    var twitter =  req.body.twitter;
    var city =  req.body.city;
    var session =  req.body.session;


    if (city === '') {

        try {
                
            mysqlConnectionfidsbay.query(sql_UPDATE_general2,[twitter,instagram,session],function (err,result,fields) {


                        // Get all user Data to upload local Storage userpayload
                        // Get all user Data to upload local Storage userpayload
                        mysqlConnectionfidsbay.query(sql_get_user_info,[req.body.session],function (err,rows,fields) {
                            res.send({status: 'OK', body: rows[0]});
                        });
                        

            });
        } catch (error) {
            
        }
      
    }else{

        try {
                
            mysqlConnectionfidsbay.query(sql_UPDATE_general1,[twitter,instagram,city,session],function (err,result,fields) {

                        // Get all user Data to upload local Storage userpayload
                        // Get all user Data to upload local Storage userpayload
                        mysqlConnectionfidsbay.query(sql_get_user_info,[req.body.session],function (err,rows,fields) {
                            res.send({status: 'OK', body: rows[0]});
                        });
                        

            });
        } catch (error) {
            
        }
    
    }




});

module.exports = router;