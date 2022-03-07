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
                                                     city=? WHERE id=?"




router.post('/', (req,res) => {


    var productId = req.body.productid;
    var userid = req.body.userid;
    var productNumber = req.body.productNumber;

    newProductNumber = productNumber - 1;

    try {
        mysqlConnectionfidsbay.query("DELETE from products WHERE id = ?",[productId],function (err,rows,fields) {
        


            mysqlConnectionfidsbay.query("UPDATE members SET productnumber = ? WHERE id = ?",[newProductNumber,userid],function (err,rows,fields) {
            
                


                    // To send back to update localstorage
                    const sql_get_user_info = "SELECT * FROM members WHERE session=?";
                    mysqlConnectionfidsbay.query(sql_get_user_info,[req.body.session],function (err,rows,fields) {
                        
                        res.send({status: 'OK', body: rows[0]});
                                            
                    });

            });

            


        });

    } catch (error) {
        
    }
      

});

module.exports = router;