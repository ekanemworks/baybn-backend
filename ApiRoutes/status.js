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
        

        router.post('/sendStatusText', (req,res) => {
            var datetime = new Date();
            var upload_time = date.format(datetime, 'hh:mm');
            var upload_date = date.format(datetime, 'ddd, MMM DD YYYY');
            const update_status_post_array = "UPDATE members SET status_post_array=?, status_post_last_time=?, status_post_last_day=? WHERE session = ?";
            const get_status_post_array = "SELECT status_post_array FROM members WHERE session = ?";

            var minutesToAdd=30;
            var currentDate = new Date();
            var futureDate = new Date(currentDate.getTime() + 86400000);
            // console.log(currentDate);
            // console.log(futureDate);

            // if (currentDate > futureDate) {
            //     console.log('current is greater');
            // }else{
            //     console.log('future is greater');
            // }

            try {
                mysqlConnectionfidsbay.query(get_status_post_array,[req.body.session],function (err,result,fields) {

                    var status_post_array_result = result[0].status_post_array;
                    // console.log('server result');
                    // console.log(result);


                    // TO CHECK IF ARRAY IS EMPTY
                    // TO CHECK IF ARRAY IS EMPTY
                    if (status_post_array_result == '' || status_post_array_result == null) {
                        // like array is empty
                        // creating a new array and pushing the liker's Id
                        // creating a new array and pushing the liker's Id
                        var status_post_array = [];
                        // OBJECT OF NEW TEXT STATUS
                        var status_post = {
                            type: 'text',
                            colorTheme: req.body.colorTheme,
                            text: req.body.text,
                            time: upload_time,
                            date: upload_date,
                            currentDate: currentDate,
                            futureDate: futureDate
                        };
                        status_post_array.push(status_post);
                        // stringifying it so it can be an array in the database
                        // stringifying it so it can be an array in the database
                        status_post_array = JSON.stringify(status_post_array);

                        // console.log('status_post_array_result');
                        // console.log(status_post_array_result);
                        // console.log('status_post');
                        // console.log(status_post);
                        // console.log('status_post_array');
                        // console.log(status_post_array);

                        try {
                            mysqlConnectionfidsbay.query(update_status_post_array,[status_post_array,time,date,req.body.session],function (err,result,fields) {
        
                                // console.log(req.body);
                                var response = {
                                    status: 'ok', 
                                    message: 'successful update'
                                };
                                res.send(response);
                    
                      
                            });
                        } catch (error) {
                            
                        }
                    }else{

                        // converting json string in DB to array for use
                        var tmp_status_post_array = JSON.parse(status_post_array_result);

                        var status_post = {
                            type: 'text',
                            colorTheme: req.body.colorTheme,
                            text: req.body.text,
                            time: upload_time,
                            date: upload_date,
                            currentDate: currentDate,
                            futureDate: futureDate
                        };

                        tmp_status_post_array.push(status_post);
                        // stringifying it so it can be an array in the database
                        // stringifying it so it can be an array in the database
                        tmp_status_post_array = JSON.stringify(tmp_status_post_array);
                        try {
                            mysqlConnectionfidsbay.query(update_status_post_array,[tmp_status_post_array,time,date,req.body.session],function (err,result,fields) {
        
                                var response = {
                                    status: 'ok', 
                                    message: 'successful update'
                                };
                                res.send(response);
                    
                      
                            });
                        } catch (error) {
                            
                        }

                    }

                });

            } catch (error) {
                
            }

        
        
        });  



    router.post('/getFriendsMoments', (req,res) => {


        const sqlconst = `SELECT * FROM members WHERE (members.friends_with_array LIKE ? OR  members.friends_with_array LIKE ?) AND status_post_array!='' AND status_post_array!='[]' `;

        var myId = parseInt(req.body.myId);
                try {
                    mysqlConnectionfidsbay.query(sqlconst,['%"p'+myId+'",%','%"p'+myId+'"]%'],function (err,result1,fields) {

                        if (!err) {            
                    
                            // var friend_requests = result1[0].friends_add_request;
                            // friend_requests = JSON.parse(friend_requests);
                            var datetime = new Date();
                            var now_date = date.format(datetime, 'ddd, MMM DD YYYY');
                            res.send({status: 'ok', message: 'success', body: result1, nowDate: now_date});
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