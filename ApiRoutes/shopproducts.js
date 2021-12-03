const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');

router.use(cors()); 
router.use(bodyparser.json());
const date = require('date-and-time');


// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


// SQL_STATEMENTS
const sql_get_a_member_products = "SELECT * FROM products WHERE ownerid=?  order by id DESC";


   

router.post('/', (req,res) => {


    try {
        
        mysqlConnectionfidsbay.query(sql_get_a_member_products,[req.body.userid],function (err,result,fields) {
            
            res.send(result);

        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});


router.get('/visitorFor/:ownerId', (req,res) => {

    const sqlconst = "SELECT products.id, products.productcategory, \
    products.producttype, products.productname, products.productdescription, \
    products.productphoto1, products.productphoto2, products.productphoto3, \
    products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
    products.dateadded, products.productlikes, products.liked_by_array, members.username, \
    members.profilephoto, members.userstatus, members.points  FROM products INNER JOIN members ON products.ownerid=members.id WHERE ownerid=? ORDER BY products.id";
   
    try {
       
        mysqlConnectionfidsbay.query(sqlconst,[req.params.ownerId],function (err,result,fields) {
            
            res.send(result);
    
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});








module.exports = router;