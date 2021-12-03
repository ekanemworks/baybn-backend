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



    // get ADVERT PLAN 
    // get ADVERT PLAN 
    // get ADVERT PLAN 
    router.get('/getAdPlan', (req,res) => {


        try {
            const sql_adsplan = "SELECT * FROM ads_plans";
            mysqlConnectionfidsbay.query(sql_adsplan, function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }


    });



    //  UPLOAD ADVERT
    //  UPLOAD ADVERT
    //  UPLOAD ADVERT
    router.post('/uploadAd', (req,res) => {

        var POSTbusinessactivity    = req.body.POSTbusinessactivity;
        var POSTheader              = req.body.POSTheader;
        var POSTlink                = req.body.POSTlink;
        var POSTphone               = req.body.POSTphone;
        var POSTig                  = req.body.POSTig;
        var POSTtwitter             = req.body.POSTtwitter;
        var POSTfacebook            = req.body.POSTfacebook;
        var POSTfidsbay             = req.body.POSTfidsbay;
        var POSTbyfullname          = req.body.POSTbyfullname;
        var POSTbycontact           = req.body.POSTbycontact;
        var POSTimageurl            = req.body.POSTimageurl;
        var POSTdescription            = req.body.POSTdescription;

        var uniqueLink = uuidv4();
        uniqueLink = uniqueLink.substring(0,6);


        var escape_ads_input = [
            POSTbusinessactivity,
            '',
            0,
            POSTimageurl,
            POSTdescription,
            0,
            0,
            '',
            '',
            '',
            'visitor',
            0,
            POSTbycontact,
            0,
            uniqueLink,
            POSTheader,
            POSTlink,
            POSTphone,
            POSTig,
            POSTtwitter,
            POSTfacebook,
            POSTfidsbay,
            POSTbyfullname,
            'inactive',
            ]

        try {
            const sql_create_new_AD_POST = "INSERT INTO ads_post VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            mysqlConnectionfidsbay.query(sql_create_new_AD_POST, escape_ads_input, function (err,rows,fields) {
                
                res.send({status: 'OK', uniqueLink: uniqueLink });
            }); //End of product mysql statement
            
        } catch (error) {
            
        }


    });







    /****  GETTTING THE ADS TO DISPLAY  ***//****  GETTTING THE ADS TO DISPLAY  ***//****  GETTTING THE ADS TO DISPLAY  ***/
    /****  GETTTING THE ADS TO DISPLAY  ***//****  GETTTING THE ADS TO DISPLAY  ***//****  GETTTING THE ADS TO DISPLAY  ***/
    /****  GETTTING THE ADS TO DISPLAY  ***//****  GETTTING THE ADS TO DISPLAY  ***//****  GETTTING THE ADS TO DISPLAY  ***/
    /****  GETTTING THE ADS TO DISPLAY  ***//****  GETTTING THE ADS TO DISPLAY  ***//****  GETTTING THE ADS TO DISPLAY  ***/
    


    // get AD SPONSORSHIP : LOCATION HOME
    // get AD SPONSORSHIP : LOCATION HOME
    // get AD SPONSORSHIP : LOCATION HOME
    router.post('/getcampaignpost', (req,res) => {

        var location =  req.body.location;



        if (location == 'home') {
            // ADS FOR HOME PAGE
            // ADS FOR HOME PAGE
            // ADS FOR HOME PAGE
            // ADS FOR HOME PAGE
            
            try {
                const sql_adsplan = "SELECT * FROM ads_post WHERE ad_position = ? AND active_status='active' LIMIT 6";
                mysqlConnectionfidsbay.query(sql_adsplan,location, function (err,rows,fields) {
                    
                    res.send(rows);
                }); //End of product mysql statement
                
            } catch (error) {
                console.log(error);
            }








        }else if (location == 'meals') {
            // ADS FOR MEAL PAGE
            // ADS FOR MEAL PAGE
            // ADS FOR MEAL PAGE





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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.id DESC LIMIT 6";
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.id ASC LIMIT 6";
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.productlikes DESC LIMIT 6";
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.ownerid ASC LIMIT 6";
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.ownerid DESC LIMIT 6";
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.productprice ASC LIMIT 6";
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE productclass=? AND producttype='meal' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.productprice DESC LIMIT 6";
                            mysqlConnectionfidsbay.query(sqlconst,[req.body.class],function (err,rows,fields) {
                                res.send(rows);
                            }); //End of product mysql statement
                            
                        } catch (error) {
                            
                        }
                    }
        
        
        
        
        
        
                }); 
                
            } catch (error) {
                
            }
        
        

            










        }else if (location == 'groceries') {
            // ADS FOR GROCERY PAGE
            // ADS FOR GROCERY PAGE
            // ADS FOR GROCERY PAGE



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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE producttype='grocery' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.id DESC LIMIT 6";
                            mysqlConnectionfidsbay.query(sqlconst,function (err,rows,fields) {
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE producttype='grocery' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.id ASC LIMIT 6";
                            mysqlConnectionfidsbay.query(sqlconst,function (err,rows,fields) {
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE producttype='grocery' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.productlikes DESC LIMIT 6";
                            mysqlConnectionfidsbay.query(sqlconst,function (err,rows,fields) {
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE producttype='grocery' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.ownerid ASC LIMIT 6";
                            mysqlConnectionfidsbay.query(sqlconst,function (err,rows,fields) {
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE producttype='grocery' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.ownerid DESC LIMIT 6";
                            mysqlConnectionfidsbay.query(sqlconst,function (err,rows,fields) {
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE producttype='grocery' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.productprice ASC LIMIT 6";
                            mysqlConnectionfidsbay.query(sqlconst,function (err,rows,fields) {
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
                            members.userstatus, members.likes, members.phoneno  FROM products INNER JOIN members ON products.ownerid=members.id WHERE producttype='grocery' AND boosted_status='boosted' AND boosted_active_now='true' ORDER BY products.productprice DESC LIMIT 6";
                            mysqlConnectionfidsbay.query(sqlconst,function (err,rows,fields) {
                                res.send(rows);
                            }); //End of product mysql statement
                            
                        } catch (error) {
                            
                        }
                    }
        
        
        
        
        
        
                }); 
                
            } catch (error) {
                
            }
        
        
        





            
        }else if (location == 'exploreopen') {
            
            try {
                const sql_adsplan = "SELECT * FROM ads_post WHERE ad_position = ? AND active_status='active' LIMIT 6";
                mysqlConnectionfidsbay.query(sql_adsplan,location, function (err,rows,fields) {
                    
                    res.send(rows);
                }); //End of product mysql statement
                
            } catch (error) {
                console.log(error);
            }

        }




    });







    // get AD SPONSORSHIP : LOCATION HOME
    // get AD SPONSORSHIP : LOCATION HOME
    // get AD SPONSORSHIP : LOCATION HOME
    router.get('/getSponsoredHome', (req,res) => {


        try {
            const sql_adsplan = "SELECT * FROM ads_sponsorship WHERE ad_position = 'home' LIMIT 6";
            mysqlConnectionfidsbay.query(sql_adsplan, function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }



    });




    // get AD SPONSORSHIP : LOCATION GROCERIES
    // get AD SPONSORSHIP : LOCATION GROCERIES
    // get AD SPONSORSHIP : LOCATION GROCERIES
    router.get('/getSponsoredGroceries', (req,res) => {


        try {
            const sql_adsplan = "SELECT * FROM ads_sponsorship WHERE ad_position = 'groceries' LIMIT 6";
            mysqlConnectionfidsbay.query(sql_adsplan, function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }



    });




    // get AD SPONSORSHIP : LOCATION MEALS
    // get AD SPONSORSHIP : LOCATION MEALS
    // get AD SPONSORSHIP : LOCATION MEALS
    router.get('/getSponsoredMeals', (req,res) => {


        try {
            const sql_adsplan = "SELECT * FROM ads_sponsorship WHERE ad_position = 'meals' LIMIT 6";
            mysqlConnectionfidsbay.query(sql_adsplan, function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }



    });














    // get AD SPONSORSHIP : LOCATION FILTER MEALS
    // get AD SPONSORSHIP : LOCATION FILTER MEALS
    // get AD SPONSORSHIP : LOCATION FILTER MEALS
    router.get('/getSponsoredFilterMeals', (req,res) => {


        try {
            const sql_adsplan = "SELECT * FROM ads_sponsorship WHERE ad_position = 'filteredmeal' LIMIT 5";
            mysqlConnectionfidsbay.query(sql_adsplan, function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }



    });




    // get AD SPONSORSHIP : LOCATION FILTER GROCERIES
    // get AD SPONSORSHIP : LOCATION FILTER GROCERIES
    // get AD SPONSORSHIP : LOCATION FILTER GROCERIES
    router.get('/getSponsoredFilterGroceries', (req,res) => {


        try {
            const sql_adsplan = "SELECT * FROM ads_sponsorship WHERE ad_position = 'filteredgroceries' LIMIT 5";
            mysqlConnectionfidsbay.query(sql_adsplan, function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
        } catch (error) {
            
        }
        

    });

    
        



module.exports = router;