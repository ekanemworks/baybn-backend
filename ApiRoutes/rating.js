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
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


// SQL_STATEMENTS FOR THE ACCOUNT THAT IS BEING LIKED
// SQL_STATEMENTS FOR THE ACCOUNT THAT IS BEING LIKED
const get_profile_like_information_sql = "SELECT likes,liked_by_array FROM members WHERE id = ?";
const update_profile_like_information_sql = "UPDATE members SET likes=?, liked_by_array=? WHERE id = ?";

const delete_activity_table = "DELETE FROM activity WHERE activity_for_id = ? AND activity_by_id = ?";


   


router.post('/', (req,res) => {
    
});





module.exports = router;