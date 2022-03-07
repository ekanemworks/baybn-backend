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
            

    router.post('/getContacts', (req,res) => {


        const sqlconst = `SELECT * FROM members WHERE members.friends_with_array LIKE ? OR  members.friends_with_array LIKE ?`;

        var myId = parseInt(req.body.myId);
                try {
                    mysqlConnectionfidsbay.query(sqlconst,['%"p'+myId+'",%','%"p'+myId+'"]%'],function (err,result1,fields) {

                        if (!err) {            
                    
                            // var friend_requests = result1[0].friends_add_request;
                            // friend_requests = JSON.parse(friend_requests);

                            res.send({status: 'ok', message: 'success', body: result1});
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