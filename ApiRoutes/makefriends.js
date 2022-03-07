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
        

        router.post('/defaultActiveMembersPopular', (req,res) => {

            const sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status  FROM members WHERE accountstatus = 'active' AND hide_profile='off' AND session!=? AND popular_status = 'yes' LIMIT 3";

            // myinterest = JSON.stringify(myinterest);

            try {
                mysqlConnectionfidsbay.query(sql_interests,[req.body.session],function (err,result1,fields) {

                    if (!err) {
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


        router.post('/defaultActiveMembersGeneral', (req,res) => {

            const sql_interests = "SELECT id, fullname, username, bio, interests, profilephoto, dateregistered, friends_add_request_from, friends_with_array, profession, companyname, university, platformstatus, relationship_status  FROM members WHERE accountstatus = 'active' AND hide_profile='off' AND session!=? ORDER BY visits DESC";

            // myinterest = JSON.stringify(myinterest);

            try {
                mysqlConnectionfidsbay.query(sql_interests,[req.body.session],function (err,result1,fields) {

                    if (!err) {
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


        
        // SEND ADD REQUEST
        // SEND ADD REQUEST
        // SEND ADD REQUEST
        router.post('/sendAddRequest', (req,res) => {

            const sql_getReceiver_friends_add_request_from = "SELECT friends_add_request_from FROM members WHERE id = ?";
            const sql_updateReceiver_friends_add_request_from = "UPDATE members SET friends_add_request_from = ? WHERE id = ?";

            const sql_getSender_friends_add_request_to = "SELECT friends_add_request_to FROM members WHERE id = ?";
            const sql_updateSender_friends_add_request_to = "UPDATE members SET friends_add_request_to = ? WHERE id = ?";

       

                    var sourceId = parseInt(req.body.userFromId);
                    var destinationId = parseInt(req.body.userToId);
                   

                    // START OF FOR RECIEVER
                    // START OF FOR RECIEVER
                    // START OF FOR RECIEVER
                    try {
                        mysqlConnectionfidsbay.query(sql_getReceiver_friends_add_request_from,[destinationId],function (err,result1,fields) {

                            if (!err) {
                                var friend_request_array_result = result1;
                               
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>

                                    // converting json string in DB to array for use
                                    var tmp_friend_request_array_result = JSON.parse(friend_request_array_result[0].friends_add_request_from);
                                    // Object created to resolve confusion
                                    var array_object_sourceId = "p"+sourceId;
                                    tmp_friend_request_array_result.push(array_object_sourceId);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    tmp_friend_request_array_result = JSON.stringify(tmp_friend_request_array_result);
                                    try {
                                        mysqlConnectionfidsbay.query(sql_updateReceiver_friends_add_request_from,[tmp_friend_request_array_result,destinationId],function (err,result2,fields) {
                    



                                            // START OF FOR SENDER
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER
                                            try {
                                                mysqlConnectionfidsbay.query(sql_getSender_friends_add_request_to,[sourceId],function (err,result3,fields) {
                        
                                                    if (!err) {
                                                        var friend_request_array_result = result3;
                                                       
                                                            // << IF ARRAY IS OCCUPIED >>
                                                            // << IF ARRAY IS OCCUPIED >>
                                                            // << IF ARRAY IS OCCUPIED >>
                        
                                                            // converting json string in DB to array for use
                                                            var tmp_friend_request_array_result = JSON.parse(friend_request_array_result[0].friends_add_request_to);
                                                            var array_object_destinationId = "p"+destinationId;
                                                            tmp_friend_request_array_result.push(array_object_destinationId);
                                                            // stringifying it so it can be an array in the database
                                                            // stringifying it so it can be an array in the database
                                                            tmp_friend_request_array_result = JSON.stringify(tmp_friend_request_array_result);
                                                            try {
                                                                mysqlConnectionfidsbay.query(sql_updateSender_friends_add_request_to,[tmp_friend_request_array_result,sourceId],function (err,result,fields) {
                                            
                        
                        
                        
                        
                        
                        
                                                                    if (!err) {
                                                                            
                                                                        var response = {
                                                                            status: 'ok', 
                                                                            message: 'successful update'
                                                                        };
                                                                        // console.log('it works');
                                                                        res.send(response);
                                                                    }else{
                        
                                                                        console.log(err);
                                                                        res.send({status: 'error', message: 'database error'});
                                                                    }
                        
                        
                        
                        
                        
                        
                        
                        
                                                        
                                                                });
                                                            } catch (error) {
                                                                console.log(error);
                                                                res.send({status: 'error', message: 'server error'});
                        
                                                            }
                        
                        
                                                    }else{
                                                        console.log(err);
                                                        res.send({status: 'error', message: 'database error'});
                        
                                                    }
                        
                                                });
                        
                                            } catch (error) {
                                                console.log(error);
                                                res.send({status: 'error', message: 'server error'});
                        
                                            }
                                            // END OF FOR SENDER
                                            // END OF FOR SENDER
                                            // END OF FOR SENDER









                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});

                                    }


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


        
        // REMOVE ADD REQUEST : needs work
        // REMOVE ADD REQUEST : needs work
        // REMOVE ADD REQUEST : needs work
        // REMOVE ADD REQUEST
        // REMOVE ADD REQUEST
        router.post('/removeAddRequest', (req,res) => {

            // get/update request array for reciever
            const sql_updateReceiver_friends_add_request_from = "UPDATE members SET friends_add_request_from = ? WHERE id = ?";

            // get/update request array for sender
            const sql_getSender_friends_add_request_to = "SELECT friends_add_request_to FROM members WHERE id = ?";
            const sql_updateSender_friends_add_request_to = "UPDATE members SET friends_add_request_to = ? WHERE id = ?";




       

                    var sourceId = parseInt(req.body.userFromId);
                    var destinationId = parseInt(req.body.userToId);
                    var recieverfriendsAddRequestFrom = (req.body.recieverfriendsAddRequestFrom)
                    recieverfriendsAddRequestFrom = JSON.parse(recieverfriendsAddRequestFrom);

                    // START OF FOR RECIEVER
                    // START OF FOR RECIEVER
                    // START OF FOR RECIEVER
       
                                    // get the index first before splice, because we are splicing the index away
                                    // get the index first before splice, because we are splicing the index away

                                    // Object created to resolve confusion
                                    var array_object_sourceId = "p"+sourceId;
                                    var index_of_sourceId_in_destination_array = recieverfriendsAddRequestFrom.indexOf(array_object_sourceId);

                                    recieverfriendsAddRequestFrom.splice(index_of_sourceId_in_destination_array, 1);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    recieverfriendsAddRequestFrom = JSON.stringify(recieverfriendsAddRequestFrom);

                                    try {
                                        mysqlConnectionfidsbay.query(sql_updateReceiver_friends_add_request_from,[recieverfriendsAddRequestFrom,destinationId],function (err,result2,fields) {
                    
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER

                                            try {
                                                mysqlConnectionfidsbay.query(sql_getSender_friends_add_request_to,[sourceId],function (err,result3,fields) {
                        
                                                    if (!err) {
                                                        var friend_request_to_array_result = result3;
                                                       
                                                            // << IF ARRAY IS OCCUPIED >>
                                                            // << IF ARRAY IS OCCUPIED >>
                                                            // << IF ARRAY IS OCCUPIED >>
                        
                                                            // converting json string in DB to array for use
                                                            var tmp_friend_request_to_array_result = JSON.parse(friend_request_to_array_result[0].friends_add_request_to);
                                                            // get the index of reciever in sender array first, before splice, because we are splicing the index away
                                                            // get the index of reciever in sender array first, before splice, because we are splicing the index away
                                  
                                                            // Object created to resolve confusion
                                                            var array_object_destinationId = "p"+destinationId;
                                                            var index_of_destinationId_in_source_array = tmp_friend_request_to_array_result.indexOf(array_object_destinationId);
                                                            tmp_friend_request_to_array_result.splice(index_of_destinationId_in_source_array, 1);
                                                            // stringifying it so it can be an array in the database
                                                            // stringifying it so it can be an array in the database
                                                            tmp_friend_request_to_array_result = JSON.stringify(tmp_friend_request_to_array_result);
                                                            try {
                                                                mysqlConnectionfidsbay.query(sql_updateSender_friends_add_request_to,[tmp_friend_request_to_array_result,sourceId],function (err,result,fields) {
                                            
                        
                        
                        
                        
                        
                        
                                                                    if (!err) {
                                                                            
                                                                        var response = {
                                                                            status: 'ok', 
                                                                            message: 'successful update'
                                                                        };
                                                                        // console.log('it works');
                                                                        res.send(response);
                                                                    }else{
                        
                                                                        console.log(err);
                                                                        res.send({status: 'error', message: 'database error'});
                                                                    }
                        
                        
                        
                        
                        
                        
                        
                        
                                                        
                                                                });
                                                            } catch (error) {
                                                                console.log(error);
                                                                res.send({status: 'error', message: 'server error'});
                        
                                                            }
                        
                        
                                                    }else{
                                                        console.log(err);
                                                        res.send({status: 'error', message: 'database error'});
                        
                                                    }
                        
                                                });
                        
                                            } catch (error) {
                                                console.log(error);
                                                res.send({status: 'error', message: 'server error'});
                        
                                            }
                                            // END OF FOR SENDER
                                            // END OF FOR SENDER
                                            // END OF FOR SENDER




                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});

                                    }


                       
        
        
        });


        
        // ACCEPT ADD REQUEST
        // ACCEPT ADD REQUEST
        // ACCEPT ADD REQUEST
        router.post('/acceptAddRequest', (req,res) => {

            // get/update request array for reciever
            const sql_getReceiver_friends_add_request_from = "SELECT friends_add_request_from FROM members WHERE id = ?";
            const sql_updateReceiver_friends_add_request_from = "UPDATE members SET friends_add_request_from = ? WHERE id = ?";

            // get/update request array for sender
            const sql_updateSender_friends_add_request_to = "UPDATE members SET friends_add_request_to = ? WHERE id = ?";

       

                    var sourceId = parseInt(req.body.userFromId);
                    var destinationId = parseInt(req.body.userToId);

                    var senderfriendsAddRequestTo = (req.body.senderfriendsAddRequestTo)
                    senderfriendsAddRequestTo = JSON.parse(senderfriendsAddRequestTo);

                    var senderfriendsWithArray = (req.body.senderfriendsWithArray)
                    senderfriendsWithArray = JSON.parse(senderfriendsWithArray);
                   
                    
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD

                    // START OF FOR RECIEVER
                    // START OF FOR RECIEVER
                    try {
                        mysqlConnectionfidsbay.query(sql_getReceiver_friends_add_request_from,[destinationId],function (err,result1,fields) {

                            if (!err) {
                                var friend_request_array_result = result1;
                               
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>

                                    // converting json string in DB to array for use
                                    var tmp_friend_request_array_result_for_destination = JSON.parse(friend_request_array_result[0].friends_add_request_from);
                                    // get the index first before splice, because we are splicing the index away
                                    // get the index first before splice, because we are splicing the index away

                                    // Object created to resolve confusion
                                    var array_object_sourceId = "p"+sourceId;
                                    var index_of_sourceId_in_destination_array = tmp_friend_request_array_result_for_destination.indexOf(array_object_sourceId);

                                    tmp_friend_request_array_result_for_destination.splice(index_of_sourceId_in_destination_array, 1);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    tmp_friend_request_array_result_for_destination = JSON.stringify(tmp_friend_request_array_result_for_destination);

                                    try {
                                        mysqlConnectionfidsbay.query(sql_updateReceiver_friends_add_request_from,[tmp_friend_request_array_result_for_destination,destinationId],function (err,result2,fields) {
                    
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER

                                            // get the index of reciever in sender array first, before splice, because we are splicing the index away
                                            // get the index of reciever in sender array first, before splice, because we are splicing the index away


                                            // Object created to resolve confusion
                                            var array_object_destinationId = "p"+destinationId;
                                            var index_of_destinationId_in_source_array = senderfriendsAddRequestTo.indexOf(array_object_destinationId);

                                            senderfriendsAddRequestTo.splice(index_of_destinationId_in_source_array, 1);
                                            // stringifying it so it can be an array in the database
                                            // stringifying it so it can be an array in the database
                                            senderfriendsAddRequestTo = JSON.stringify(senderfriendsAddRequestTo);

                                            try {
                                                mysqlConnectionfidsbay.query(sql_updateSender_friends_add_request_to,[senderfriendsAddRequestTo, sourceId],function (err,result3,fields) {
                        
                    

                                                });
                        
                                            } catch (error) {
                                                console.log(error);
                                                res.send({status: 'error', message: 'server error'});
                        
                                            }
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER

                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});

                                    }


                            }else{
                                console.log(err);
                                res.send({status: 'error', message: 'database error'});

                            }

                        });

                    } catch (error) {
                        console.log(error);
                        res.send({status: 'error', message: 'server error'});

                    }

  




                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD


                    // get/update friend array for reciever
                    const sql_getReceiver_friends_with_array = "SELECT friends_with_array FROM members WHERE id = ?";
                    const sql_updateReceiver_friends_with_array = "UPDATE members SET friends_with_array = ? WHERE id = ?";

                    // get/update friend array for sender
                    const sql_updateSender_friends_with_array = "UPDATE members SET friends_with_array = ? WHERE id = ?";


                    // START OF FOR RECIEVER
                    // START OF FOR RECIEVER
                    // START OF FOR RECIEVER
                    try {
                        mysqlConnectionfidsbay.query(sql_getReceiver_friends_with_array,[destinationId],function (err,result1,fields) {

                            if (!err) {
                                var friend_with_array_result = result1;
                               
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>

                                    // converting json string in DB to array for use
                                    var tmp_friends_with_array_result_for_destination = JSON.parse(friend_with_array_result[0].friends_with_array);
                                    // get the index first before splice, because we are splicing the index away
                                    // get the index first before splice, because we are splicing the index away


                                    // Object created to resolve confusion
                                    var array_object_sourceId = "p"+sourceId;
                                    tmp_friends_with_array_result_for_destination.push(array_object_sourceId);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    tmp_friends_with_array_result_for_destination = JSON.stringify(tmp_friends_with_array_result_for_destination);

                                    try {
                                        mysqlConnectionfidsbay.query(sql_updateReceiver_friends_with_array,[tmp_friends_with_array_result_for_destination,destinationId],function (err,result2,fields) {
                    
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER

                                            // Object created to resolve confusion
                                            var array_object_destinationId = "p"+destinationId;
                                            senderfriendsWithArray.push(array_object_destinationId);
                                            // stringifying it so it can be an array in the database
                                            // stringifying it so it can be an array in the database
                                            senderfriendsWithArray = JSON.stringify(senderfriendsWithArray);

                                            try {
                                                mysqlConnectionfidsbay.query(sql_updateSender_friends_with_array,[senderfriendsWithArray, sourceId],function (err,result3,fields) {
                        
                    

                                                });
                        
                                            } catch (error) {
                                                console.log(error);
                                                res.send({status: 'error', message: 'server error'});
                        
                                            }
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER

                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});

                                    }


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
        
        






        
    // REJECT ADD REQUEST
    // REJECT ADD REQUEST
    // REJECT ADD REQUEST
    router.post('/rejectAddRequest', (req,res) => {

            // get/update request array for reciever
            const sql_getReceiver_friends_add_request_from = "SELECT friends_add_request_from FROM members WHERE id = ?";
            const sql_updateReceiver_friends_add_request_from = "UPDATE members SET friends_add_request_from = ? WHERE id = ?";

            // get/update request array for sender
            const sql_updateSender_friends_add_request_to = "UPDATE members SET friends_add_request_to = ? WHERE id = ?";

       

                    var sourceId = parseInt(req.body.userFromId);
                    var destinationId = parseInt(req.body.userToId);

                    var senderfriendsAddRequestTo = (req.body.senderfriendsAddRequestTo)
                    senderfriendsAddRequestTo = JSON.parse(senderfriendsAddRequestTo);

                    var senderrejectedMyRequest = (req.body.senderrejectedMyRequest)
                    senderrejectedMyRequest = JSON.parse(senderrejectedMyRequest);
                   
                    
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD
                    // REMOVE FROM RECORD

                    // START OF FOR RECIEVER
                    // START OF FOR RECIEVER
                    try {
                        mysqlConnectionfidsbay.query(sql_getReceiver_friends_add_request_from,[destinationId],function (err,result1,fields) {

                            if (!err) {
                                var friend_request_array_result = result1;
                               
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>

                                    // converting json string in DB to array for use
                                    var tmp_friend_request_array_result_for_destination = JSON.parse(friend_request_array_result[0].friends_add_request_from);
                                    // get the index first before splice, because we are splicing the index away
                                    // get the index first before splice, because we are splicing the index away

                                    // Object created to resolve confusion
                                    var array_object_sourceId = "p"+sourceId;
                                    var index_of_sourceId_in_destination_array = tmp_friend_request_array_result_for_destination.indexOf(array_object_sourceId);

                                    tmp_friend_request_array_result_for_destination.splice(index_of_sourceId_in_destination_array, 1);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    tmp_friend_request_array_result_for_destination = JSON.stringify(tmp_friend_request_array_result_for_destination);

                                    try {
                                        mysqlConnectionfidsbay.query(sql_updateReceiver_friends_add_request_from,[tmp_friend_request_array_result_for_destination,destinationId],function (err,result2,fields) {
                    
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER

                                            // get the index of reciever in sender array first, before splice, because we are splicing the index away
                                            // get the index of reciever in sender array first, before splice, because we are splicing the index away


                                            // Object created to resolve confusion
                                            var array_object_destinationId = "p"+destinationId;
                                            var index_of_destinationId_in_source_array = senderfriendsAddRequestTo.indexOf(array_object_destinationId);

                                            senderfriendsAddRequestTo.splice(index_of_destinationId_in_source_array, 1);
                                            // stringifying it so it can be an array in the database
                                            // stringifying it so it can be an array in the database
                                            senderfriendsAddRequestTo = JSON.stringify(senderfriendsAddRequestTo);

                                            try {
                                                mysqlConnectionfidsbay.query(sql_updateSender_friends_add_request_to,[senderfriendsAddRequestTo, sourceId],function (err,result3,fields) {
                        
                    

                                                });
                        
                                            } catch (error) {
                                                console.log(error);
                                                res.send({status: 'error', message: 'server error'});
                        
                                            }
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER

                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});

                                    }


                            }else{
                                console.log(err);
                                res.send({status: 'error', message: 'database error'});

                            }

                        });

                    } catch (error) {
                        console.log(error);
                        res.send({status: 'error', message: 'server error'});

                    }

  




                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD
                    // ADD TO RECORD



                    // get/update friend array for sender
                    const sql_updateSender_rejected_my_request = "UPDATE members SET rejected_my_request = ? WHERE id = ?";

                                            // START OF FOR SENDER
                                            // START OF FOR SENDER
                                            // START OF FOR SENDER

                                            // Object created to resolve confusion
                                            var array_object_destinationId = "p"+destinationId;
                                            senderrejectedMyRequest.push(array_object_destinationId);
                                            // stringifying it so it can be an array in the database
                                            // stringifying it so it can be an array in the database
                                            senderrejectedMyRequest = JSON.stringify(senderrejectedMyRequest);

                                            try {
                                                mysqlConnectionfidsbay.query(sql_updateSender_rejected_my_request,[senderrejectedMyRequest, sourceId],function (err,result3,fields) {
                        
                    

                                                });
                        
                                            } catch (error) {
                                                console.log(error);
                                                res.send({status: 'error', message: 'server error'});
                        
                                            }
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER
                                            // END OF removing destination id from friends_add_request_to array OF SENDER

                                
                                 

        });






        
        // REMOVE/BLOCK FRIEND
        // REMOVE/BLOCK FRIEND
        // REMOVE/BLOCK FRIEND
        // REMOVE/BLOCK FRIEND
        router.post('/blockPerson', (req,res) => {

            const sql_select_sender_id = "SELECT id FROM members WHERE session = ?";
            const sql_get_reciever_friend_requests = "SELECT friends_add_request FROM members WHERE id = ?";
            const sql_update_reciever_records = "UPDATE members SET friends_add_request = ? WHERE id = ?";

       

            try {
                mysqlConnectionfidsbay.query(sql_select_sender_id,[req.body.session],function (err,result1,fields) {

                    var sourceId = parseInt(result1[0].id);
                   
                    try {
                        mysqlConnectionfidsbay.query(sql_get_reciever_friend_requests,[req.body.userToId],function (err,result2,fields) {

                            if (!err) {

                                var friend_request_array_result = result2[0].friends_add_request;



                                // TO CHECK IF ARRAY IS EMPTY
                                // TO CHECK IF ARRAY IS EMPTY
                                if (friend_request_array_result == '' || friend_request_array_result == null) {
                                    // << IF ARRAY IS EMPTY >>
                                    // << IF ARRAY IS EMPTY >>
                                    // << IF ARRAY IS EMPTY >>

                                    // creating a new array and pushing the liker's Id
                                    // creating a new array and pushing the liker's Id
                                    var friend_request_array = [];
                                   
                                    friend_request_array.push(sourceId);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    friend_request_array = JSON.stringify(friend_request_array);

                                   

                                    try {
                                        mysqlConnectionfidsbay.query(sql_update_reciever_records,[friend_request_array,req.body.userToId],function (err,result,fields) {
                                            
                                            if (!err) {
                                                    
                                                var response = {
                                                    status: 'ok', 
                                                    message: 'successful update'
                                                };
                                                res.send(response);
                                            }else{

                                                console.log(err);
                                                res.send({status: 'error', message: 'database error'});
                                            }
                                
                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});
                                    }

                                }else{
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>

                                    // converting json string in DB to array for use
                                    var tmp_friend_request_array_result = JSON.parse(friend_request_array_result);

                                  
                                    tmp_friend_request_array_result.push(sourceId);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    tmp_friend_request_array_result = JSON.stringify(tmp_friend_request_array_result);
                                    try {
                                        mysqlConnectionfidsbay.query(sql_update_reciever_records,[tmp_friend_request_array_result,req.body.userToId],function (err,result,fields) {
                    
                                            if (!err) {
                                                    
                                                var response = {
                                                    status: 'ok', 
                                                    message: 'successful update'
                                                };
                                                res.send(response);
                                            }else{

                                                console.log(err);
                                                res.send({status: 'error', message: 'database error'});
                                            }
                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});

                                    }

                                }
                                // <END OF ARRAY CHECK>

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

            } catch (error) {
                console.log(error);
                res.send({status: 'error', message: 'server error'});

            }
  
        
        
        });





                
        // BLOCK PERSON
        // BLOCK PERSON
        // BLOCK PERSON
        // BLOCK PERSON
        router.post('/removeFriend', (req,res) => {

            const sql_select_sender_id = "SELECT id FROM members WHERE session = ?";
            const sql_get_reciever_friend_requests = "SELECT friends_add_request FROM members WHERE id = ?";
            const sql_update_reciever_records = "UPDATE members SET friends_add_request = ? WHERE id = ?";

       

            try {
                mysqlConnectionfidsbay.query(sql_select_sender_id,[req.body.session],function (err,result1,fields) {

                    var sourceId = parseInt(result1[0].id);
                   
                    try {
                        mysqlConnectionfidsbay.query(sql_get_reciever_friend_requests,[req.body.userToId],function (err,result2,fields) {

                            if (!err) {

                                var friend_request_array_result = result2[0].friends_add_request;



                                // TO CHECK IF ARRAY IS EMPTY
                                // TO CHECK IF ARRAY IS EMPTY
                                if (friend_request_array_result == '' || friend_request_array_result == null) {
                                    // << IF ARRAY IS EMPTY >>
                                    // << IF ARRAY IS EMPTY >>
                                    // << IF ARRAY IS EMPTY >>

                                    // creating a new array and pushing the liker's Id
                                    // creating a new array and pushing the liker's Id
                                    var friend_request_array = [];
                                   
                                    friend_request_array.push(sourceId);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    friend_request_array = JSON.stringify(friend_request_array);

                                   

                                    try {
                                        mysqlConnectionfidsbay.query(sql_update_reciever_records,[friend_request_array,req.body.userToId],function (err,result,fields) {
                                            
                                            if (!err) {
                                                    
                                                var response = {
                                                    status: 'ok', 
                                                    message: 'successful update'
                                                };
                                                res.send(response);
                                            }else{

                                                console.log(err);
                                                res.send({status: 'error', message: 'database error'});
                                            }
                                
                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});
                                    }

                                }else{
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>
                                    // << IF ARRAY IS OCCUPIED >>

                                    // converting json string in DB to array for use
                                    var tmp_friend_request_array_result = JSON.parse(friend_request_array_result);

                                  
                                    tmp_friend_request_array_result.push(sourceId);
                                    // stringifying it so it can be an array in the database
                                    // stringifying it so it can be an array in the database
                                    tmp_friend_request_array_result = JSON.stringify(tmp_friend_request_array_result);
                                    try {
                                        mysqlConnectionfidsbay.query(sql_update_reciever_records,[tmp_friend_request_array_result,req.body.userToId],function (err,result,fields) {
                    
                                            if (!err) {
                                                    
                                                var response = {
                                                    status: 'ok', 
                                                    message: 'successful update'
                                                };
                                                res.send(response);
                                            }else{

                                                console.log(err);
                                                res.send({status: 'error', message: 'database error'});
                                            }
                                
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        res.send({status: 'error', message: 'server error'});

                                    }

                                }
                                // <END OF ARRAY CHECK>

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

            } catch (error) {
                console.log(error);
                res.send({status: 'error', message: 'server error'});

            }
  
        
        
        });







module.exports = router;