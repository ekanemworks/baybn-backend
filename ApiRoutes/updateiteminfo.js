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


const sql_update_profile_info = "UPDATE products SET productcategory=?, \
                                                     productname=?, \
                                                     productdescription=?, \
                                                     productprice=?, \
                                                     productpriceDisplay=?, \
                                                     city=? WHERE id=?"




router.post('/', (req,res) => {

    var itempriceDisplay = req.body.itemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


    var escape_update_ITEM_input = [req.body.itemcategory,
                                       req.body.itemname,
                                       req.body.itemdescription,
                                       req.body.itemprice,
                                       itempriceDisplay,
                                       req.body.city,
                                       req.body.id]

        try {
            
            mysqlConnectionfidsbay.query(sql_update_profile_info,escape_update_ITEM_input,function (err,rows,fields) {
            
                res.send({status: 'OK'});

            });
        } catch (error) {
            
        }


});

module.exports = router;