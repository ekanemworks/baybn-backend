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
        

        router.post('/profileData', (req,res) => {
            
            var fullname =  req.body.fullname;
            var username =  req.body.username;
            var bio =  req.body.bio;
            var session = req.body.session;
            var relationshipStatus = req.body.relationshipStatus;


            var escape_edit_array = [
                fullname,
                username,
                bio,
                relationshipStatus,
                session,
                
            ]
            console.log(req.body.relationshipStatus);
            console.log(escape_edit_array);

            const sql_interests = "UPDATE members SET fullname = ?, username = ?, bio = ?, relationship_status = ? WHERE session = ? ";

            // myinterest = JSON.stringify(myinterest);

            try {
                mysqlConnectionfidsbay.query(sql_interests,escape_edit_array,function (err,result1,fields) {

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