const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');

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



// // SQL_STATEMENTS




router.post('/getmyplacedorders', (req,res) => {

    try {
        
        const get_placed_orders = "SELECT * FROM orders WHERE member_id = ? ";
        mysqlConnectionfidsbay.query(get_placed_orders,[req.body.userid],function (err,result,fields) {

           
            if (!err) {

                res.send({status: 'OK', body: result});

            }else{
                console.log(err);
            }
            
    
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});



















module.exports = router;