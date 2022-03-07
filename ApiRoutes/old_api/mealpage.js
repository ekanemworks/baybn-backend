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

router.use(cors()); 






router.post('/recommended', (req,res) => {


    try {
        const sql_Algorithm_pattern = "SELECT * FROM AppBase WHERE id=1";
        mysqlConnectionfidsbay.query(sql_Algorithm_pattern,function (err,result_1,fields) {
            
            // res.send(result_1);
            // console.log(result_1[0].recommended_algorithm_pattern);
            // console.log(result_1[0].recommended_algorithm_pattern_order);

            if ((result_1[0].recommended_algorithm_pattern=='products.id') && (result_1[0].recommended_algorithm_pattern_order=='DESC')) {
                // CASE 1
                // Products.id DESCENDING 
                // Products.id DESCENDING
                try {
                    const sqlconst = "SELECT products.id, products.productcategory, \
                    products.producttype, products.productname, products.productdescription, \
                    products.productphoto1, products.productphoto2, products.productphoto3, \
                    products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto,\
                    members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' ORDER BY products.id DESC";
                    mysqlConnectionfidsbay.query(sqlconst,[req.body.class],function (err,rows,fields) {
                        res.send(rows);
                    }); //End of product mysql statement
                    
                } catch (error) {
                    
                }
                
            }else if ((result_1[0].recommended_algorithm_pattern=='products.id') && (result_1[0].recommended_algorithm_pattern_order=='ASC')) {
                //  CASE 2
                // Products.id ASCENDING
                // Products.id ASCENDING
                try {
                    const sqlconst = "SELECT products.id, products.productcategory, \
                    products.producttype, products.productname, products.productdescription, \
                    products.productphoto1, products.productphoto2, products.productphoto3, \
                    products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto,\
                    members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' ORDER BY products.id ASC";
                    mysqlConnectionfidsbay.query(sqlconst,[req.body.class],function (err,rows,fields) {
                        res.send(rows);
                    }); //End of product mysql statement
                    
                } catch (error) {
                    
                }

            }else if (result_1[0].recommended_algorithm_pattern=='products.productlikes') {
                // CASE 3
                // Product LIKES DESCENDING
                // Product LIKES DESCENDING
                try {
                    const sqlconst = "SELECT products.id, products.productcategory, \
                    products.producttype, products.productname, products.productdescription, \
                    products.productphoto1, products.productphoto2, products.productphoto3, \
                    products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto,\
                    members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' ORDER BY products.productlikes DESC";
                    mysqlConnectionfidsbay.query(sqlconst,[req.body.class],function (err,rows,fields) {
                        res.send(rows);
                    }); //End of product mysql statement
                    
                } catch (error) {
                    
                }

            }else if ((result_1[0].recommended_algorithm_pattern=='products.ownerid') && (result_1[0].recommended_algorithm_pattern_order=='ASC')) {
                // CASE 4
                // Product OWNER ID ASCENDING
                // Product OWNER ID ASCENDING
                try {
                    const sqlconst = "SELECT products.id, products.productcategory, \
                    products.producttype, products.productname, products.productdescription, \
                    products.productphoto1, products.productphoto2, products.productphoto3, \
                    products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto,\
                    members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' ORDER BY products.ownerid ASC";
                    mysqlConnectionfidsbay.query(sqlconst,[req.body.class],function (err,rows,fields) {
                        res.send(rows);
                    }); //End of product mysql statement
                    
                } catch (error) {
                    
                }

            }else if ((result_1[0].recommended_algorithm_pattern=='products.ownerid') && (result_1[0].recommended_algorithm_pattern_order=='DESC')) {
                // CASE 5
                // Product OWNER ID DESCENDING
                // Product OWNER ID DESCENDING
                try {
                    const sqlconst = "SELECT products.id, products.productcategory, \
                    products.producttype, products.productname, products.productdescription, \
                    products.productphoto1, products.productphoto2, products.productphoto3, \
                    products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto,\
                    members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' ORDER BY products.ownerid DESC";
                    mysqlConnectionfidsbay.query(sqlconst,[req.body.class],function (err,rows,fields) {
                        res.send(rows);
                    }); //End of product mysql statement
                    
                } catch (error) {
                    
                }

            }else if (result_1[0].recommended_algorithm_pattern=='products.productprice' && (result_1[0].recommended_algorithm_pattern_order=='ASC')) {
                // CASE 6
                // Product OWNER ID ASCENDING
                // Product OWNER ID ASCENDING
                try {
                    const sqlconst = "SELECT products.id, products.productcategory, \
                    products.producttype, products.productname, products.productdescription, \
                    products.productphoto1, products.productphoto2, products.productphoto3, \
                    products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto,\
                    members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' ORDER BY products.productprice ASC";
                    mysqlConnectionfidsbay.query(sqlconst,[req.body.class],function (err,rows,fields) {
                        res.send(rows);
                    }); //End of product mysql statement
                    
                } catch (error) {
                    
                }
            }else if ((result_1[0].recommended_algorithm_pattern=='products.productprice') && (result_1[0].recommended_algorithm_pattern_order=='DESC')) {
                // CASE 7   
                // Product OWNER ID DESCENDING
                // Product OWNER ID DESCENDING
                try {
                    const sqlconst = "SELECT products.id, products.productcategory, \
                    products.producttype, products.productname, products.productdescription, \
                    products.productphoto1, products.productphoto2, products.productphoto3, \
                    products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto,\
                    members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' ORDER BY products.productprice DESC";
                    mysqlConnectionfidsbay.query(sqlconst,[req.body.class],function (err,rows,fields) {
                        res.send(rows);
                    }); //End of product mysql statement
                    
                } catch (error) {
                    
                }
            }






        }); 
        
    } catch (error) {
        
    }



    
});







    // get suggested chefs for meal
    // get suggested chefs for meal
    // get suggested chefs for meal
    // get suggested chefs for meal
    router.post('/suggestedchef', (req,res) => {


        try {
            const sql_suggested = "SELECT accountclass, business_category, city, username, userstatus, profilephoto, onlinestatus, fullname FROM members WHERE accounttype='business' AND productnumber!=0 AND accountclass=? AND business_category='Catering' ORDER BY points DESC ";
            mysqlConnectionfidsbay.query(sql_suggested, [req.body.vendorclass], function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }




        
    
        
    });


        



module.exports = router;