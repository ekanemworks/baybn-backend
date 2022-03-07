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



    

    // START OF FILTER FOR MEAL
    // START OF FILTER FOR MEAL
    // START OF FILTER FOR MEAL
    router.post('/filterResult', (req,res) => {
       
            
            var escape_setup_input_type_ONE = [req.body.itemcategory,
                                            req.body.itemtag,
                                            req.body.city,
                                            req.body.location
                                            ]   


            var escape_setup_input_type_TWO = [req.body.itemcategory,
                                            req.body.itemtag,
                                            req.body.city,
                                            req.body.location,
                                            req.body.price
                                            ]   

        
            var escape_setup_input_type_THREE = [req.body.itemcategory,
                                            req.body.city,
                                            req.body.location
                                            ]   
    
    
            var escape_setup_input_type_FOUR = [req.body.itemcategory,
                                            req.body.city,
                                            req.body.location,
                                            req.body.price
                                            ]   



        // IF THE USER DIDN'T ENTER A PRICE
        if (req.body.price==''|| req.body.price==null|| req.body.price=='blank') {



            if (req.body.itemtag==''|| req.body.itemtag==null|| req.body.itemtag=='blank') {
                // if tag was not entered
                // if tag was not entered
                // if tag was not entered
                
            



                const sql_filter_all = "SELECT products.id, products.productcategory, \
                products.producttype, products.productname, products.productdescription, \
                products.productphoto1, products.productphoto2, products.productphoto3, \
                products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                products.productcategory = ? && products.city = ? && products.location = ?    ORDER BY products.productlikes DESC";
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type_THREE,function (err,rowsSpecific,fields) {
        
        
                            const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                            products.producttype, products.productname, products.productdescription, \
                            products.productphoto1, products.productphoto2, products.productphoto3, \
                            products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                            products.productcategory = ? && products.city = ? && products.location != ?  ORDER BY products.productlikes DESC";
                                
                            try {
                                
                                mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type_THREE,function (err,rowsGeneral,fields) {
        
                                    let results = {
                                        specific: rowsSpecific,
                                        all: rowsGeneral,
                                        suggestionType: 'Suggestions'
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
                // if item tag was ENtered
                // if tag was ENtered
                // if tag was ENtered



                const sql_filter_all = "SELECT products.id, products.productcategory, \
                products.producttype, products.productname, products.productdescription, \
                products.productphoto1, products.productphoto2, products.productphoto3, \
                products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                products.productcategory = ? && products.productTags = ? && products.city = ? && products.location = ?    ORDER BY products.productlikes DESC";
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type_ONE,function (err,rowsSpecific,fields) {
        
        
                            const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                            products.producttype, products.productname, products.productdescription, \
                            products.productphoto1, products.productphoto2, products.productphoto3, \
                            products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                            products.productcategory = ? && products.productTags = ? && products.city = ? && products.location != ?  ORDER BY products.productlikes DESC";
                                
                            try {
                                
                                mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type_ONE,function (err,rowsGeneral,fields) {
                                    
                                    if (req.body.location == 'blank') {
                                            
                                        let results = {
                                            specific: rowsSpecific,
                                            all: rowsGeneral,
                                            suggestionType: 'Suggestions for "'+req.body.city+'"',
                                        }
                                        res.send(results);
                                    }else{

                                        let results = {
                                            specific: rowsSpecific,
                                            all: rowsGeneral,
                                            suggestionType: 'Near by Suggestions outside "'+req.body.location+'"',
                                        }
                                        res.send(results);
                                    }


                                    // console.log('first');
                                });
                            } catch (error) {
                                
                            }
        
                        
                    });
                } catch (error) {
                    
                }
                 //End of product mysql statement
            

            }







            
        }else{
            // IF A PRICE WAS ENTERED
            // IF A PRICE WAS ENTERED
            // IF A PRICE WAS ENTERED


            if (req.body.itemtag==''|| req.body.itemtag==null|| req.body.itemtag=='blank') {
                // if item tag was NOT-ENtered
                // if item tag was NOT-ENtered
                // if item tag was NOT-ENtered



                const sql_filter_all = "SELECT products.id, products.productcategory, \
                products.producttype, products.productname, products.productdescription, \
                products.productphoto1, products.productphoto2, products.productphoto3, \
                products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                products.productcategory = ? && products.city = ? && products.location = ? && productprice < ?   ORDER BY products.productlikes DESC";
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type_FOUR,function (err,rowsSpecific,fields) {
        
        
        
                            const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                            products.producttype, products.productname, products.productdescription, \
                            products.productphoto1, products.productphoto2, products.productphoto3, \
                            products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                            products.productcategory = ? && products.city = ? && products.location != ? && productprice < ?   ORDER BY products.productlikes DESC";
                                
                            try {
                                
                                mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type_FOUR,function (err,rowsGeneral,fields) {
        
                                    let results = {
                                        specific: rowsSpecific,
                                        all: rowsGeneral,
                                        suggestionType: 'Other Suggestions You May Like'
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
                
            }else{
                // if tag was ENtered
                // if tag was ENtered
                // if tag was ENtered


                const sql_filter_all = "SELECT products.id, products.productcategory, \
                products.producttype, products.productname, products.productdescription, \
                products.productphoto1, products.productphoto2, products.productphoto3, \
                products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                products.productcategory = ? && products.productTags = ? && products.city = ? && products.location = ? && productprice < ?   ORDER BY products.productlikes DESC";
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type_TWO,function (err,rowsSpecific,fields) {
        
        
        
                            const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                            products.producttype, products.productname, products.productdescription, \
                            products.productphoto1, products.productphoto2, products.productphoto3, \
                            products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                            products.productcategory = ? && products.productTags = ? && products.city = ? && products.location != ?   ORDER BY products.productlikes DESC";
                                
                            try {
                                
                                mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type_TWO,function (err,rowsGeneral,fields) {
        
                                    let results = {
                                        specific: rowsSpecific,
                                        all: rowsGeneral,
                                        suggestionType: 'Other Suggestions You May Like'
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


        

        }
        // END: OF IF THE USER DIDN'T ENTER A PRICE

        
    });
    // END OF FILTER FOR MEAL
    // END OF FILTER FOR MEAL
    // END OF FILTER FOR MEAL
        















    // START OF FILTER FOR GROCERY
    // START OF FILTER FOR GROCERY
    // START OF FILTER FOR GROCERY
    router.post('/filterResultGrocery', (req,res) => {


            var escape_setup_input_type_ONE = [req.body.itemcategory,
                                            req.body.itemtag,
                                            req.body.city,
                                            req.body.location
                                            ]   


            var escape_setup_input_type_TWO = [req.body.itemcategory,
                                            req.body.itemtag,
                                            req.body.city,
                                            req.body.location,
                                            req.body.price
                                            ]   

        
            var escape_setup_input_type_THREE = [req.body.itemcategory,
                                            req.body.city,
                                            req.body.location
                                            ]   
    
    
            var escape_setup_input_type_FOUR = [req.body.itemcategory,
                                            req.body.city,
                                            req.body.location,
                                            req.body.price
                                            ]   



        // IF THE USER DIDN'T ENTER A PRICE
        if (req.body.price==''|| req.body.price==null|| req.body.price=='blank') {



            if (req.body.itemtag==''|| req.body.itemtag==null|| req.body.itemtag=='blank') {
                // if tag was not entered
                // if tag was not entered
                // if tag was not entered
                
            



                const sql_filter_all = "SELECT products.id, products.productcategory, \
                products.producttype, products.productname, products.productdescription, \
                products.productphoto1, products.productphoto2, products.productphoto3, \
                products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                products.productcategory = ? && products.city = ? && products.location = ?    ORDER BY products.productlikes DESC";
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type_THREE,function (err,rowsSpecific,fields) {
        
        
                            const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                            products.producttype, products.productname, products.productdescription, \
                            products.productphoto1, products.productphoto2, products.productphoto3, \
                            products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                            products.productcategory = ? && products.city = ? && products.location != ?  ORDER BY products.productlikes DESC";
                                
                            try {
                                
                                mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type_THREE,function (err,rowsGeneral,fields) {
        
                                    let results = {
                                        specific: rowsSpecific,
                                        all: rowsGeneral,
                                        suggestionType: 'Suggestions'
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
                // if item tag was ENtered
                // if tag was ENtered
                // if tag was ENtered



                const sql_filter_all = "SELECT products.id, products.productcategory, \
                products.producttype, products.productname, products.productdescription, \
                products.productphoto1, products.productphoto2, products.productphoto3, \
                products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                products.productcategory = ? && products.productTags = ? && products.city = ? && products.location = ?    ORDER BY products.productlikes DESC";
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type_ONE,function (err,rowsSpecific,fields) {
        
        
                            const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                            products.producttype, products.productname, products.productdescription, \
                            products.productphoto1, products.productphoto2, products.productphoto3, \
                            products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                            products.productcategory = ? && products.productTags = ? && products.city = ? && products.location != ?  ORDER BY products.productlikes DESC";
                                
                            try {
                                
                                mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type_ONE,function (err,rowsGeneral,fields) {
                                    
                                    if (req.body.location == 'blank') {
                                            
                                        let results = {
                                            specific: rowsSpecific,
                                            all: rowsGeneral,
                                            suggestionType: 'Suggestions for "'+req.body.city+'"',
                                        }
                                        res.send(results);
                                    }else{

                                        let results = {
                                            specific: rowsSpecific,
                                            all: rowsGeneral,
                                            suggestionType: 'Near by Suggestions outside "'+req.body.location+'"',
                                        }
                                        res.send(results);
                                    }


                                    // console.log('first');
                                });
                            } catch (error) {
                                
                            }
        
                        
                    });
                } catch (error) {
                    
                }
                 //End of product mysql statement
            

            }







            
        }else{
            // IF A PRICE WAS ENTERED
            // IF A PRICE WAS ENTERED
            // IF A PRICE WAS ENTERED


            if (req.body.itemtag==''|| req.body.itemtag==null|| req.body.itemtag=='blank') {
                // if item tag was NOT-ENtered
                // if item tag was NOT-ENtered
                // if item tag was NOT-ENtered



                const sql_filter_all = "SELECT products.id, products.productcategory, \
                products.producttype, products.productname, products.productdescription, \
                products.productphoto1, products.productphoto2, products.productphoto3, \
                products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                products.productcategory = ? && products.city = ? && products.location = ? && productprice < ?   ORDER BY products.productlikes DESC";
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type_FOUR,function (err,rowsSpecific,fields) {
        
        
        
                            const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                            products.producttype, products.productname, products.productdescription, \
                            products.productphoto1, products.productphoto2, products.productphoto3, \
                            products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                            products.productcategory = ? && products.city = ? && products.location != ? && productprice < ?   ORDER BY products.productlikes DESC";
                                
                            try {
                                
                                mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type_FOUR,function (err,rowsGeneral,fields) {
        
                                    let results = {
                                        specific: rowsSpecific,
                                        all: rowsGeneral,
                                        suggestionType: 'Other Suggestions You May Like'
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
                
            }else{
                // if tag was ENtered
                // if tag was ENtered
                // if tag was ENtered


                const sql_filter_all = "SELECT products.id, products.productcategory, \
                products.producttype, products.productname, products.productdescription, \
                products.productphoto1, products.productphoto2, products.productphoto3, \
                products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                products.productcategory = ? && products.productTags = ? && products.city = ? && products.location = ? && productprice < ?   ORDER BY products.productlikes DESC";
                
                try {
                    
                    mysqlConnectionfidsbay.query(sql_filter_all,escape_setup_input_type_TWO,function (err,rowsSpecific,fields) {
        
        
        
                            const sql_filter_city_only = "SELECT products.id, products.productcategory, \
                            products.producttype, products.productname, products.productdescription, \
                            products.productphoto1, products.productphoto2, products.productphoto3, \
                            products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
                            products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
                            FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
                            products.productcategory = ? && products.productTags = ? && products.city = ? && products.location != ?   ORDER BY products.productlikes DESC";
                                
                            try {
                                
                                mysqlConnectionfidsbay.query(sql_filter_city_only,escape_setup_input_type_TWO,function (err,rowsGeneral,fields) {
        
                                    let results = {
                                        specific: rowsSpecific,
                                        all: rowsGeneral,
                                        suggestionType: 'Other Suggestions You May Like'
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


        

        }
        // END: OF IF THE USER DIDN'T ENTER A PRICE

        
    });
    // END OF FILTER FOR GROCERY
    // END OF FILTER FOR GROCERY
    // END OF FILTER FOR GROCERY
        










    // START OF FILTER FOR GROCERY
    // START OF FILTER FOR GROCERY
    // START OF FILTER FOR GROCERY
    router.post('/filterCompensation', (req,res) => {
        const sql_filter_compensation = "SELECT products.id, products.productcategory, \
        products.producttype, products.productname, products.productdescription, \
        products.productphoto1, products.productphoto2, products.productphoto3, \
        products.productprice, products.productpriceDisplay, products.preparationtime, products.location, products.city, products.country, products.ownerid,\
        products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto, members.userstatus, members.points, members.likes, members.phoneno  \
        FROM products INNER JOIN members ON products.ownerid=members.id WHERE \
        products.producttype = ?  ORDER BY products.productlikes DESC";
        
        try {
            mysqlConnectionfidsbay.query(sql_filter_compensation,[req.body.producttype],function (err,result,fields) {

                if (req.body.producttype == 'meal') {
                    
                    let results = {
                        values: result,
                        suggestion: 'Other suggestions on '+req.body.producttype
                    }
                    res.send(results);
                    
                }else if (req.body.producttype == 'grocery') {
                    
                    let results = {
                        values: result,
                        suggestion: 'Other suggestions on '+req.body.producttype
                    }
                    res.send(results);

                }


            });

        } catch (error) {
            console.log(error);
        }

    });
    // END OF FILTER FOR GROCERY
    // END OF FILTER FOR GROCERY
    // END OF FILTER FOR GROCERY
        




module.exports = router;