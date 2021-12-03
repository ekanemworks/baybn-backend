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


const sql_update_profile_info = "UPDATE members SET email=?,phoneno=?,bio=?,fullname=?,username=? WHERE session=?"

const sql_update_check_email = "SELECT * FROM members WHERE email=? AND session!=?";

const sql_update_check_username = "SELECT * FROM members WHERE username=? AND session!=?";



router.post('/', (req,res) => {
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
                    res.send({status: 'invalid email', body: ''});

            }else{
                    // means email is fresh and new
                    try {
                        
                        mysqlConnectionfidsbay.query(sql_update_check_username,[req.body.username,req.body.session],function (err,rows,fields) {

                            if (rows.length!=0) {
                            // means username exist
                            res.send({status: 'invalid username', body: ''});
                            
                            }else{
                            // means username is new
        

                                // TO CHECK IF THERE IS SPACE IN THE USERNAME STRING
                                // TO CHECK IF THERE IS SPACE IN THE USERNAME STRING
                                var space_check = req.body.username.indexOf(' ');
                                if (space_check == -1) {
                                    try {
                                        mysqlConnectionfidsbay.query(sql_update_profile_info,escape_update_profile_input,function (err,rows,fields) {
                        

                                            // To send back to update localstorage
                                            const sql_get_user_info = "SELECT * FROM members WHERE session=?";
                                            mysqlConnectionfidsbay.query(sql_get_user_info,[req.body.session],function (err,rows,fields) {
                        
                                                res.send({status: 'OK', body: rows[0]});
                                            
                                            });

                                        });
                                    } catch (error) {
                                        
                                    }
                                }else{
                                    res.send({status: 'space', body: ''});

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





router.post('/updateMemberStatus', (req,res) => {


    const sqlconst = 'UPDATE members SET userstatus = ? WHERE id = ?';

              
            mysqlConnectionfidsbay.query(sqlconst,['member',req.body.userid],function (err,result2,fields) {

            });

});



module.exports = router;