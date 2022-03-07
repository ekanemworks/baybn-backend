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





    router.get('/categories', (req,res) => {

        try {
            const sql_suggested = "SELECT * FROM food_categories";
            mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }

    
    });


    router.get('/getcategories', (req,res) => {

        try {
            const sql_suggested = "SELECT * FROM meal_category_items";
            mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }

    
    });



    router.post('/feed', (req,res) => {

        try {

            if (req.body.algorithm == 'class1') {

                const sql_suggested = "SELECT * FROM products ORDER BY products.id ASC";
                mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
                    res.send(rows);
                }); //End of product mysql statement
                

            }else if (req.body.algorithm == 'class2') {


                const sql_suggested = "SELECT * FROM products ORDER BY products.productlikes DESC";
                mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
                    res.send(rows);
                }); 
                //End of product query
                
                
            }else if (req.body.algorithm == 'class3') {
                const sql_suggested = "SELECT * FROM products ORDER BY productprice";
                mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
                    res.send(rows);
                }); 
                //End of product query
                
                
            }

        } catch (error) {
            
        }

        
    });




router.get('/categoryResult/:category', (req,res) => {

    // const sql_suggested = "SELECT * FROM products WHERE productcategory Like ?";



    const sql_suggested = "SELECT products.id, products.productcategory, \
    products.producttype, products.productname, products.productdescription, \
    products.productphoto1, products.productphoto2, products.productphoto3, \
    products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno   FROM products INNER JOIN members ON products.ownerid=members.id WHERE productcategory Like ? ORDER BY products.id";
    
    try {
        mysqlConnectionfidsbay.query(sql_suggested,['%'+req.params.category+'%'],function (err,rows,fields) {
        
            res.send(rows);
        }); //End of product mysql statement
    
    } catch (error) {
        
    }

    
    
    });


    router.get('/searchResult/:searchKey', (req,res) => {

        // const sql_suggested = "SELECT * FROM products WHERE productcategory Like ?";
    
    
    
        const sql_suggested = "SELECT products.id, products.productcategory, \
        products.producttype, products.productname, products.productdescription, \
        products.productphoto1, products.productphoto2, products.productphoto3, \
        products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
        products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno   FROM products INNER JOIN members ON products.ownerid=members.id WHERE productcategory Like ? ORDER BY products.id";
        
        try {
            mysqlConnectionfidsbay.query(sql_suggested,['%'+req.params.searchKey+'%'],function (err,rows,fields) {
            
                res.send(rows);
            }); //End of product mysql statement
        
        } catch (error) {
            
        }

        
        
        });

    

    router.post('/filterResult', (req,res) => {
        var escape_setup_input_type1 = [  req.body.category,
                                    req.body.city,
                                    req.body.location
                                ]   


        var escape_setup_input_type2 = [  req.body.category,
            req.body.city,
            req.body.location,
            req.body.price
        ]   

        // IF THE USER DIDN'T ENTER A PRICE
        if (req.body.price==''|| req.body.price==null) {
            


            const sql_filter_all = "SELECT products.id, products.productcategory, \
            products.producttype, products.productname, products.productdescription, \
            products.productphoto1, products.productphoto2, products.productphoto3, \
            products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
            products.productcategory = ? && products.city = ? && products.location = ?   ORDER BY products.productlikes DESC";
            
            try {
                
                mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type1,function (err,rowsSpecific,fields) {
    
    
    
                        const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                        products.producttype, products.productname, products.productdescription, \
                        products.productphoto1, products.productphoto2, products.productphoto3, \
                        products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
                        products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                        FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                        products.productcategory = ? && products.city = ? && products.location != ?  ORDER BY products.productlikes DESC";
                            
                        try {
                            
                            mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type1,function (err,rowsGeneral,fields) {
    
                                let results = {
                                    specific: rowsSpecific,
                                    all: rowsGeneral
                                }
                    
                                res.send(results);
                                // console.log('first');
                            });
                        } catch (error) {
                            
                        }
    
                    
                });
            } catch (error) {
                
            }
             //End of product mysql statement
        





            
        }else{
            // IF A PRICE WAS ENTERED



            const sql_filter_all = "SELECT products.id, products.productcategory, \
            products.producttype, products.productname, products.productdescription, \
            products.productphoto1, products.productphoto2, products.productphoto3, \
            products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
            products.productcategory = ? && products.city = ? && products.location = ? && productprice < ?   ORDER BY products.productlikes DESC";
            
            try {
                
                mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type2,function (err,rowsSpecific,fields) {
    
    
    
                        const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                        products.producttype, products.productname, products.productdescription, \
                        products.productphoto1, products.productphoto2, products.productphoto3, \
                        products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
                        products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                        FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                        products.productcategory = ? && products.city = ? && products.location != ? && productprice < ?   ORDER BY products.productlikes DESC";
                            
                        try {
                            
                            mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type2,function (err,rowsGeneral,fields) {
    
                                let results = {
                                    specific: rowsSpecific,
                                    all: rowsGeneral
                                }
                    
                                res.send(results);
                                // console.log('sec');
                            });
                        } catch (error) {
                            
                        }
    
                    
                });
            } catch (error) {
                
            }
             //End of product mysql statement
        

        }
        // END: OF IF THE USER DIDN'T ENTER A PRICE


        
        });
        






module.exports = router;