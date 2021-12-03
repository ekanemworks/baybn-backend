const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');

router.use(cors()); 
router.use(bodyparser.json());
const date = require('date-and-time');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
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


// GET GROCERY CATEGORY OPTION: 
// GET GROCERY CATEGORY OPTION: 
// GET GROCERY CATEGORY OPTION:  
router.post('/transfer', (req,res) => {


    
        var walletFromId        = req.body.walletFromId;
        var sourceusername      = req.body.sourceusername;
        var senderemail         = req.body.senderemail;
        var ToSendUsername      = req.body.ToSendUsername; // use the username to get id for wallet
        var ToSendAmount        = req.body.ToSendAmount;
        var Commission          = req.body.Commission;
        var cashbalance         = req.body.cashbalance;
        var totalbalance        = req.body.totalbalance;

        var new_totalbalance    = totalbalance - ToSendAmount;
        var new_cashbalance     = cashbalance - ToSendAmount;
        
        var ToSendUsernameLength = ToSendUsername.length;
        ToSendUsername = ToSendUsername.substring(1,ToSendUsernameLength);


        const referenceCODE = uuidv4();
        const random = Math.random().toString(36).substring(2,7);
        var reference_number = referenceCODE.substring(0,4) + random;
        
        const dateTime = new Date();
        var date_requested            = date.format(dateTime, 'ddd, MMM DD YYYY');

        const newTime = new Date();
        var time_requested            = date.format(newTime, 'hh:mm A [GMT]Z'); 
        
        var update_sender_wallet =   [
            new_totalbalance,
            new_cashbalance,
            walletFromId
            ]

      

    try {
        // find destination user id
        // find destination user id
        // find destination user id
        const sql_find_DESINATION_USERID_FROM_MEMBERS = "SELECT * FROM members WHERE username=?";
        mysqlConnectionfidsbay.query(sql_find_DESINATION_USERID_FROM_MEMBERS,ToSendUsername,function (err,result,fields) {
            if (!err) {

                if (result.length == 1) {
                    var destinationId = result[0].id;
                    


                    try {
                        // update sender's wallet
                        // update sender's wallet
                        const sql_UPDATE_SENDER_WALLET = "UPDATE fidsbay_wallet SET totalbalance = ?, cashbalance = ? WHERE userid=?";
                        mysqlConnectionfidsbay.query(sql_UPDATE_SENDER_WALLET,update_sender_wallet,function (err,result,fields) {
                            if (!err) {
                



                                    try {
                                        // Get destination/recievers wallet information
                                        // Get destination/recievers wallet information
                                        // Get destination/recievers wallet information
                                        const sql_GET_DESINATION_WALLET_INFO = "SELECT * FROM fidsbay_wallet WHERE userid=?";
                                        mysqlConnectionfidsbay.query(sql_GET_DESINATION_WALLET_INFO,[destinationId],function (err,result,fields) {
                                            if (!err) {
                                
                                                var destination_totalbalance    = parseInt(result[0].totalbalance, 10);
                                                var destination_cashbalance     = parseInt(result[0].cashbalance, 10);



                                                var new_destination_totalbalance    = destination_totalbalance + ToSendAmount;
                                                var new_destination_cashbalance     = destination_cashbalance + ToSendAmount;



                                                var update_destination_wallet =   [
                                                    new_destination_totalbalance,
                                                    new_destination_cashbalance,
                                                    destinationId
                                                    ]
                                        


                                                try {
                                                    // update Destination's wallet
                                                    // update Destination's wallet
                                                    // update Destination's wallet
                                                    const sql_UPDATE_DESTINATION_WALLET = "UPDATE fidsbay_wallet SET totalbalance = ?, cashbalance = ? WHERE userid=?";
                                                    mysqlConnectionfidsbay.query(sql_UPDATE_DESTINATION_WALLET,update_destination_wallet,function (err,result,fields) {
                                                        if (!err) {
                                            
                                                            
            
            
            
            
            
            
                            

                                                                    var escape_new_transaction_FOR_TRANSFER =   [
                                                                                                                'Transfer',
                                                                                                                walletFromId,
                                                                                                                destinationId,
                                                                                                                reference_number,
                                                                                                                'Money was transfered from user @'+sourceusername+' to the wallet of user @'+ToSendUsername,
                                                                                                                ToSendAmount,
                                                                                                                'Successful',
                                                                                                                date_requested,
                                                                                                                time_requested
                                                                                                                ]
                

                                                                try {
                                                                    // Generate transaction for wallet transaction
                                                                    // Generate transaction for wallet transaction
                                                                    const sql_new_transaction_FOR_TRANSFER  = "INSERT INTO fidsbay_wallet_transactions VALUES (NULL,?,?,?,?,?,?,?,?,?)";
                                                                    mysqlConnectionfidsbay.query(sql_new_transaction_FOR_TRANSFER,escape_new_transaction_FOR_TRANSFER,function (err,result,fields) {
                                                                        if (!err) {
                                                            
                                                                            
                            
                                                                            res.send({status:'OK',body: {reference: reference_number, cashbalance: new_cashbalance}});
                            
                        
                                                            
                                                                            
                                                                        }else{ res.send({status:'BAD2',body: 'transaction info not generated'}); console.log(err); }
                                                                    }); 
                                                                    //QUERY TO GET DESTINATION USER INFO
                                                            
                                                                } catch (error) { console.log(error); }
                                                                // END: GENERATE TRANSACTION FOR WALLET TRANSACTIONS
                                                                // END: GENERATE TRANSACTION FOR WALLET TRANSACTIONS
                                                                // END: GENERATE TRANSACTION FOR WALLET TRANSACTIONS

                                                            
            










            
            
            
            
                                                            
            
            
            
            
                                            
                                                          
                                                        }else{ res.send({status:'BAD',body: 'destination wallet not updated'}); console.log(err); }
                                                    }); 
                                                    //QUERY TO GET DESTINATION USER INFO
                                            
                                                } catch (error) { console.log(error); }
                                                // END: UPDATE DESTINATION/ SENDER WALLET
                                                // END: UPDATE DESTINATION/ SENDER WALLET
                                                // END: UPDATE DESTINATION/ SENDER WALLET













                                
                                              
                                            }else{ res.send({status:'BAD',body: 'destination wallet not gotten'}); console.log(err); }
                                        }); 
                                        //QUERY TO GET DESTINATION USER INFO
                                
                                    } catch (error) { console.log(error); }
                                    // END: GET DESTINATION/ SENDER WALLET
                                    // END: GET DESTINATION/ SENDER WALLET
                                    // END: GET DESTINATION/ SENDER WALLET


                                    
                
                
                
                
                                // res.send({status:'OK', body: result});
                              
                            }else{ res.send({status:'BAD',body: 'wallet not updated'}); console.log(err);  }
                        }); 
                        //QUERY TO GET DESTINATION USER INFO
                
                    } catch (error) { console.log(error); }
                    // END: UPDATE SENDER WALLET
                    // END: UPDATE SENDER WALLET
                    // END: UPDATE SENDER WALLET












                }else{
                
                    res.send({status:'BAD1', body: 'user with @'+ToSendUsername+' username does not exist'});

                }

              
            }else{
                res.send({status:'BAD',body: ''});
                console.log(err);
            }
            
        }); 
        // QUERY FOR DESTINATION USER
        // QUERY FOR DESTINATION USER

    } catch (error) {
        console.log(error);
    }
    // End of Find DEstination account

});

























// PURCHASE ITEM:
// PURCHASE ITEM:
// PURCHASE ITEM: 
router.post('/purchase', (req,res) => {




    // getting values from body
    var walletFromId                = req.body.walletFromId;
    var package                     = req.body.package;
    var totalAmount                 = req.body.totalAmount;
    var itemAmount                  = req.body.itemAmount;
    var deliveryAmount              = req.body.deliveryAmount;



    var logisticswalletid   = 1;
    const referenceCODE = uuidv4();
    const random = Math.random().toString(36).substring(2,7);
    var reference_number = referenceCODE.substring(0,4) + random;


    const sql_fidsbay_source_Wallet         = "SELECT * FROM fidsbay_wallet WHERE userid=?";

    

    // insert to transaction table: With status pending
    const sql_new_transaction_Order_for_BUYER          = "INSERT INTO fidsbay_wallet_transactions VALUES (NULL,?,?,?,?,?,?,?,?,?)";
    const sql_new_transaction_Order_to_SELLER          = "INSERT INTO fidsbay_wallet_transactions VALUES (NULL,?,?,?,?,?,?,?,?,?)";
    const sql_new_transaction_Order_to_LOGISTICS       = "INSERT INTO fidsbay_wallet_transactions VALUES (NULL,?,?,?,?,?,?,?,?,?)";

    const dateTime = new Date();
    var date_requested            = date.format(dateTime, 'ddd, MMM DD YYYY');

    const newTime = new Date();
    var time_requested            = date.format(newTime, 'hh:mm A [GMT]Z'); 

    var escape_new_transaction_input_BUYER =   [
                                                'Order placed -purchase transfer',
                                                walletFromId,
                                                0,
                                                reference_number,
                                                'placed an order (+ delivery charge)',
                                                totalAmount,
                                                'pending - Item validation',
                                                date_requested,
                                                time_requested
                                                ]



    var escape_new_transaction_input_LOGISTICS =   [
                                                'New Order placed- ',
                                                walletFromId,
                                                logisticswalletid,
                                                reference_number,
                                                'order (delivery charge)',
                                                deliveryAmount,
                                                'pending - Item validation',
                                                date_requested,
                                                time_requested
                                                ]






    try {
        mysqlConnectionfidsbay.query(sql_fidsbay_source_Wallet,walletFromId,function (err,result,fields) {
            if (!err) {

                // GET BUYERS ACCOUNT BALANCES TO UPDATE: DEDUCT AMOUNT
                // GET BUYERS ACCOUNT BALANCES TO UPDATE: DEDUCT AMOUNT
                var current_cashbalance     =  result[0].cashbalance;
                var current_totalbalance    =  result[0].totalbalance;

                var new_cashbalance         = current_cashbalance - totalAmount;
                var new_totalbalance        = current_totalbalance - totalAmount;


                // update source wallet: deduct money
                const sql_update_source_wallet  = "UPDATE fidsbay_wallet SET totalbalance = ?, cashbalance = ? WHERE userid=?";
                    try {
                        mysqlConnectionfidsbay.query(sql_update_source_wallet,[new_totalbalance, new_cashbalance, walletFromId],function (err,result,fields) {
                            if (!err) {

                            

                                // NEW TRANSACTION FOR BUYER
                                // NEW TRANSACTION FOR BUYER
                                // NEW TRANSACTION FOR BUYER
                                try {
                                    mysqlConnectionfidsbay.query(sql_new_transaction_Order_for_BUYER, escape_new_transaction_input_BUYER, function (err,result,fields) {
                                        if (!err) 
                                        {
                                            // console.log('a-buyer-t-ok');













                                                                
                                                        // console.log('b-seller-t-ok');   

                                                        // NEW TRANSACTION FOR LOGISTICS
                                                        // NEW TRANSACTION FOR LOGISTICS
                                                        // NEW TRANSACTION FOR LOGISTICS
                                                        try {
                                                            mysqlConnectionfidsbay.query(sql_new_transaction_Order_to_LOGISTICS, escape_new_transaction_input_LOGISTICS, function (err,result,fields) {
                                                                if (!err) 
                                                                {

                                                                        // console.log('c-logistic-t-ok');



                                                                        // Package is the array of items to find individual Seller and Amount
                                                                    package.forEach(element => {

                                                                            var walletSellerDestinationId   = element.shopSellerUserid;
                                                                            var itemAmount                  = element.price;
                                                                           
                                                                             var escape_new_transaction_input_SELLER =   [
                                                                                'New order - transfer',
                                                                                walletFromId,
                                                                                walletSellerDestinationId,
                                                                                reference_number,
                                                                                'order- (Payment pending: will be completed when buyer gets item)',
                                                                                itemAmount,
                                                                                'pending - Item validation',
                                                                                date_requested,
                                                                                time_requested
                                                                                ]


                                                                        // NEW TRANSACTION FOR SELLER
                                                                        // NEW TRANSACTION FOR SELLER
                                                                        // NEW TRANSACTION FOR SELLER
                                                                        try {

                                                                            mysqlConnectionfidsbay.query(sql_new_transaction_Order_to_SELLER, escape_new_transaction_input_SELLER, function (err,result,fields) {
                                                                                if (!err) 
                                                                                {









                                                                                }else{ console.log(err);}
                                                                            }); //END OF CONNECTION
                            
                            
                                                                            
                                                                        } // END OF TRY
                                                                        catch (error) {res.send({status:'BAD-wallet-newtransaction-2',body: ''}); console.log(error);}
                                                                        // End of NEW transaction for SELLER
                                                                        // End of NEW transaction for SELLER
                                                                        // End of NEW transaction for SELLER
                            


                                                                    });
                                                                    // End of For each loop
                                                                    // End of For each loop
                                                                    // End of For each loop
                                                                        
                                                                    res.send({status:'SUCCESS',body: ''});
                                                                           
                            
                            
                                                                        










                                                                        
                                                                }else{ res.send({status:'BAD-wallet-newtransaction-3',body: ''}); console.log(err);}
                                                            }); //END OF CONNECTION
                                                            
                                                        } // END OF TRY
                                                        catch (error) {res.send({status:'BAD-wallet-newtransaction-3',body: ''}); console.log(error);}
                                                        // End of NEW transaction for LOGISTICS
                                                        // End of NEW transaction for LOGISTICS
                                                        // End of NEW transaction for LOGISTICS

                                                        
                                                        











                                            











                                                
                                        }else{res.send({status:'BAD-wallet-newtransaction-1',body: ''}); console.log(err);}
                                    }); //END OF CONNECTION
                                    
                                } // END OF TRY
                                catch (error) {res.send({status:'BAD-wallet-newtransaction-1',body: ''}); console.log(error);}
                                // End of NEW transaction for BUYER
                                // End of NEW transaction for BUYER
                                // End of NEW transaction for BUYER





                            
                            }else{res.send({status:'BAD-walletupdate',body: ''});}
                            
                        }); //QUERY TO CHECK IF EMAIL IS IN USE

                    } catch (error) {res.send({status:'BAD-walletupdate',body: ''});}







              
            }else{
                res.send({status:'BAD-walletVeify',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        res.send({status:'BAD-walletVeify',body: ''});
    }

});








router.post('/withdrawRequest', (req,res) => {

    var walletFromId            = req.body.walletFromId;
    var ToWithdrawBankName      = req.body.ToWithdrawBankName;
    var ToWithdrawAccName       = req.body.ToWithdrawAccName;
    var ToWithdrawAccNumber     = req.body.ToWithdrawAccNumber;
    var ToWithdrawAmount        = req.body.ToWithdrawAmount;
    var Commission              = req.body.Commission;



    var Total_AMOUNT            = ToWithdrawAmount + Commission;
    var new_cashbalance         = req.body.cashbalance - Total_AMOUNT;
    var new_totalbalance        = req.body.totalbalance - Total_AMOUNT;

    const referenceCODE_WITHDRAWAL = uuidv4();
    const random = Math.random().toString(36).substring(2,7);
    var reference_number = referenceCODE_WITHDRAWAL.substring(0,4) + random;

    const dateTime = new Date();
    var date_requested            = date.format(dateTime, 'ddd, MMM DD YYYY');



    const newTime = new Date();
    var time_requested            = date.format(newTime, 'hh:mm A [GMT]Z'); 

      
    const sql_new_transaction_withdrawal = "INSERT INTO fidsbay_wallet_transactions VALUES (NULL,?,?,?,?,?,?,?,?,?)";

    var escape_new_transaction_withdrawal =         [
                                                    'Withdrawal',
                                                    walletFromId,
                                                    0,
                                                    reference_number,
                                                    'Withdrawal from Fidsbay Wallet: ',
                                                    Total_AMOUNT,
                                                    'pending - verification',
                                                    date_requested,
                                                    time_requested
                                                    ]

      
    const sql_new_withdrawal_REQUEST = "INSERT INTO withdrawal_request VALUES (NULL,?,?,?,?,?,?,?,?,?,?)";

    var escape_new_withdrawal_REQUEST_INPUT =       [
                                                    walletFromId,
                                                    ToWithdrawBankName,
                                                    ToWithdrawAccNumber,
                                                    ToWithdrawAccName,
                                                    ToWithdrawAmount,
                                                    Commission,
                                                    reference_number,
                                                    date_requested,
                                                    time_requested,
                                                    'pending - verification'
                                                    ]

    try {
      
        mysqlConnectionfidsbay.query(sql_new_transaction_withdrawal, escape_new_transaction_withdrawal, function (err,result,fields) {
            if (!err) 
            {
                

                try {
            
                    mysqlConnectionfidsbay.query(sql_new_withdrawal_REQUEST, escape_new_withdrawal_REQUEST_INPUT, function (err,result,fields) {
                        if (!err) 
                        {
                            


                            try {

                                // update source wallet: deduct money
                                const sql_update_source_wallet  = "UPDATE fidsbay_wallet SET totalbalance = ?, cashbalance = ? WHERE userid=?";
                                mysqlConnectionfidsbay.query(sql_update_source_wallet,[new_totalbalance, new_cashbalance, walletFromId], function (err,result,fields) {
                                    if (!err) 
                                    {
                                        

                                  
                                        var mailOptions = {
                                            from: 'no-reply@fidsbay.com',
                                            to: 'billing.fidsbay@gmail.com',
                                            subject: 'Withdrawal Request from Fidsbay: Amount '+ToWithdrawAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+ ' naira',
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
                        
                                    }
                                    else{ }
                                    
                                }); //QUERY TO CHECK IF EMAIL IS IN USE
                        
                            } catch (error) { console.log(error); }



                        }
                        else{ console.log(err); }
                        
                    }); //QUERY TO CHECK IF EMAIL IS IN USE
            
                } catch (error) { console.log(error); }


            }else{ console.log(err);}
            
        });
        // end of database connections


    } catch (error) { console.log(error); }

});



// GET TRANSACTIONS: 
// GET TRANSACTIONS: 
// GET TRANSACTIONS: 
router.post('/getmytransactions', (req,res) => {

    try {
        const sql_get_transactions = "SELECT * FROM fidsbay_wallet_transactions WHERE (source_wallet=? AND \
                                    transaction_description!='order- (Payment pending: will be completed when buyer gets item)' AND \
                                    transaction_description!='order (+ delivery charge)') OR \
                                    (destination_wallet=? AND transaction_description!='placed an order (+ delivery charge)')";
        mysqlConnectionfidsbay.query(sql_get_transactions,[req.body.userid,req.body.userid], function (err,result,fields) {
            if (!err) {

                res.send({status:'OK', body: result});
              
            }else{
                console.log(err);
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});




module.exports = router;