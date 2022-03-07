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
// const sql_fidsbay_accounts = "SELECT * FROM members";
const get_delivery_information = "SELECT delivery_statement, delivery_fee, delivery_company FROM AppBase ";


// const sql_fidsbay_user = "SELECT * FROM members WHERE username=? ";
// const sql_fidsbay_user_wallet = "SELECT * FROM fidsbay_wallet WHERE userid=? ";

// // SQL TO UPDATE MEMBERS
// const sql_fidsbay_updateuser = "UPDATE members SET account_status=?, userstatus=? WHERE username=? ";

// // SQL TO UPDATE WALLET
// const sql_fidsbay_updateuser_wallet = "UPDATE fidsbay_wallet SET deposit_status=?, ads_status=? WHERE userid=? ";





router.get('/getDeliveryInformation', (req,res) => {

    try {
            
        mysqlConnectionfidsbay.query(get_delivery_information,function (err,result,fields) {

            if (result.length==1) {
                res.send(result[0]);
            }else{
                res.send(JSON.stringify('invalid'));
            }
            
    
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});












router.post('/placeOrder', (req,res) => {


    const reference = uuidv4();
    const random = Math.random().toString(36).substring(2,7);

    const newTime = new Date();
    const dateTime = new Date();


    var customerInfo            = req.body.customerInfo;
    var package                 = req.body.package;
    var customer_name           = customerInfo.fullname;
    var customer_contact        = customerInfo.contact;
    var customer_address        = customerInfo.address;
    var customer_title          = customerInfo.title;
    var item_information_array  = JSON.stringify(package);
    var total_price             = req.body.totalPrice;
    var reference_number        = reference.substring(0,4) + random;
    var membershipstatus        = req.body.membershipstatus;
    var time_ordered            = date.format(newTime, 'hh:mm A [GMT]Z'); 
    var date_ordered            = date.format(dateTime, 'ddd, MMM DD YYYY');
    var status                  = 'new';
    var member_id               = req.body.memberid


            
    var escape_order_input = [
        customer_name,
        customer_contact,
        customer_address,
        customer_title,
        item_information_array,
        total_price,
        time_ordered,
        reference_number,
        membershipstatus,
        member_id,
        date_ordered,
        status]

    try {
        
        const sql_create_new_order = "INSERT INTO orders VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?)";

        mysqlConnectionfidsbay.query(sql_create_new_order, escape_order_input, function (err,result,fields) {

            if (!err) {

                var mailOptions = {
                    from: 'no-reply@fidsbay.com',
                    to: 'orders.fidsbay@gmail.com',
                    subject: package.length + ' Order(s) Alert from Fidsbay: Worth '+total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+ ' naira',
                    html:  '<h1>A new order on Fidsbay</h1> \
                            <div style="font-size:16px">\
                            <div style="margin-top:10px;">\
                            Access more details in Admin page \
                            <a href="https://fidsbay.com/watchtower" style="padding:5px; text-decoration:none; background: #098223; color:#fff"> Login to Admin <a>\
                            </div>\
                            \
                            </div>\
                            '
                    
                }

                transporter.sendMail(mailOptions, function(error,info){
                                            
                    res.send({status: 'OK', body: {reference_number: reference_number}});

                });


            }else{
                res.send({status: 'error', body: ''});

            }

        }); //QUERY TO CHECK IF EMAIL IS IN USE
 
    } catch (error) {
        
    }

});





// router.get('/getuser', (req,res) => {

//     try {
        
//         mysqlConnectionfidsbay.query(sql_fidsbay_user,[req.body.username],function (err,result,fields) {

//             if (!err) {
//                 res.send(result[0]);
//             }else{
//                 res.send(JSON.stringify('error'));
//             }
            
//         }); //QUERY TO CHECK IF EMAIL IS IN USE

//     } catch (error) {
        
//     }

// });



// router.post('/getuserWallet', (req,res) => {

//     try {
        
//         mysqlConnectionfidsbay.query(sql_fidsbay_user_wallet,[req.body.userid],function (err,result,fields) {
//             if (!err) {
//                 if (result.length > 0) {
//                     res.send(JSON.stringify({status:'OK',body: result[0]}));
//                 }else{
//                     res.send(JSON.stringify({status:'bad',body: result[0]}));
//                 }
//             }else{
//                 res.send(JSON.stringify('error'));
//             }
            
//         }); //QUERY TO CHECK IF EMAIL IS IN USE

//     } catch (error) {
        
//     }

// });



// router.post('/updateuser', (req,res) => {

//     try {
        
//         // update members table
//         // update members table
//         // update members table
//         mysqlConnectionfidsbay.query(sql_fidsbay_updateuser,[req.body.accountStatus, req.body.userStatus, req.body.username],function (err,result,fields) {
//             // console.log('sasa');

//             if (!err) {

//                     try {
                        
//                         // update members table
//                         mysqlConnectionfidsbay.query(sql_fidsbay_updateuser_wallet,[req.body.depositStatus, req.body.adsStatus, req.body.userid],function (err,result,fields) {
//                             // console.log('sasa');
                
//                             if (!err) {
//                                 res.send(JSON.stringify('OK'));
//                             }else{
//                                 res.send(JSON.stringify('error'));
//                                 console.log('step2err');
//                             }
                            
//                         }); //QUERY TO CHECK IF EMAIL IS IN USE
                
//                     } catch (error) {
                        
//                     }

//             }else{
//                 res.send(JSON.stringify('error'));
//                 console.log('step1err');
//             }
            
//         }); //QUERY TO CHECK IF EMAIL IS IN USE

//     } catch (error) {
        
//     }

// });











module.exports = router;