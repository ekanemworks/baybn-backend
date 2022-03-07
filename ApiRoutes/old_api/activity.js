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


// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);








// GET ALL THE LIKEEEEE PROFILE ACTIVITY NUMBER AND THE ARRAY
// GET ALL THE LIKEEEEE PROFILE ACTIVITY NUMBER AND THE ARRAY
router.get('/activityLikeProfileArray/:id', (req,res) => {
  
    const sqlconst = "SELECT activity.id, activity.activity_for_id, \
    activity.activity_by_id, activity.activity_type, activity.activity_state, members.username, members.profilephoto, members.points,\
    members.phoneno FROM activity INNER JOIN members ON activity.activity_by_id = members.id WHERE activity.activity_for_id = ? AND activity.activity_type = 'like' AND activity.activity_state = 0 ORDER BY activity.id";
 
            
            try {
                mysqlConnectionfidsbay.query(sqlconst,[req.params.id],function (err,result2,fields) {
          
                    res.send(result2)
                });
            } catch (error) {
                
            }
            


});





// GET ALL THE LIKEEEEE PRODUCT ACTIVITY NUMBER AND THE ARRAY
// GET ALL THE LIKEEEEE PRODUCT ACTIVITY NUMBER AND THE ARRAY
router.get('/activityLikeProductArray/:id', (req,res) => {
  
    const sqlconst = "SELECT activity.id, activity.activity_for_id, \
    activity.activity_by_id, activity.activity_type, activity.activity_state, members.username, members.profilephoto, members.points,\
    members.phoneno FROM activity INNER JOIN members ON activity.activity_by_id = members.id WHERE activity.activity_for_id = ? AND activity.activity_type = 'likeproduct' AND activity.activity_state = 0 ORDER BY activity.id";
 
              
            mysqlConnectionfidsbay.query(sqlconst,[req.params.id],function (err,result2,fields) {
                res.send(result2)
            });


});











// GET ALL THE ACTIVITY NUMBER AND THE ARRAY
router.get('/activityAllArray/:id', (req,res) => {
  
    const sqlconst = "SELECT activity.id, activity.activity_for_id, \
    activity.activity_by_id, activity.activity_type, activity.activity_state, members.username, members.profilephoto, members.points,\
    members.phoneno FROM activity INNER JOIN members ON activity.activity_by_id = members.id WHERE activity.activity_for_id = ?  AND activity.activity_state = 0 ORDER BY activity.id";
 
              
            mysqlConnectionfidsbay.query(sqlconst,[req.params.id],function (err,result2,fields) {
                res.send(result2)
            });


});



// UPDATE THE ACTIVITY WHEN VISITED
router.get('/updateActivity/:id', (req,res) => {
  
    const sqlconst_update_activity_table = "UPDATE activity SET activity_state = 1 WHERE activity_for_id = ?";
 
              
            mysqlConnectionfidsbay.query(sqlconst_update_activity_table,[req.params.id],function (err,result2,fields) {

                if (err) {
                    res.send(err)
                }else{
                    res.send(JSON.stringify('ok'))
                }

            });


});







module.exports = router;