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



const sql_productInfo_specific = "SELECT products.id, products.productcategory, \
products.producttype, products.productname, products.productdescription, \
products.productphoto1, products.productphoto2, products.productphoto3, \
products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
products.dateadded, members.username, members.profilephoto, members.points   FROM products INNER JOIN members ON products.ownerid=members.id WHERE ownerid Like ? ORDER BY products.id";

// const sql_productInfo_specific = "SELECT * FROM products WHERE id=?"







router.get('/exploreresult/:productid', (req,res) => {

    // const sql_suggested = "SELECT * FROM products WHERE productcategory Like ?";



    const sql_suggested = "SELECT products.id, products.productcategory, \
    products.producttype, products.productname, products.productdescription, \
    products.productphoto1, products.productphoto2, products.productphoto3, \
    products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
    products.dateadded, products.productlikes, products.liked_by_array, members.username, members.profilephoto,\
    members.userstatus, members.points, members.likes, members.phoneno  \
    FROM products INNER JOIN members ON products.ownerid=members.id WHERE products.id = ? ORDER BY products.id";
   
    try {
        mysqlConnectionfidsbay.query(sql_suggested,[req.params.productid],function (err,rows,fields) {
        
            res.send(rows);
        }); //End of product mysql statement
        
    } catch (error) {
        
    }


    
    });






    // DASHBOARD VIEW ALL ITEMS
    // DASHBOARD VIEW ALL ITEMS
    router.post('/viewItemAll', (req,res) => {

        const sqlconst = "SELECT products.id, products.productcategory, \
        products.producttype, products.productname, products.productdescription, \
        products.productphoto1, products.productphoto2, products.productphoto3, \
        products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
        products.dateadded, products.productlikes, products.liked_by_array, members.username, \
        members.profilephoto, members.userstatus, members.points  \
        FROM products INNER JOIN members ON products.ownerid=members.id WHERE members.username=? AND products.id !=? ORDER BY products.id";
    
        try {
            mysqlConnectionfidsbay.query(sqlconst,[req.body.username,req.body.productID],function (err,result,fields) {
            
                res.send(result);
                
            }); //QUERY TO CHECK IF EMAIL IS IN USE
    
        } catch (error) {
            
        }

        
    });




    // DASHBOARD VIEW ALL ITEMS: CAMPAIGN
    // DASHBOARD VIEW ALL ITEMS: CAMPAIGN
    router.post('/viewItemAllCampaign', (req,res) => {

        const sqlconst = "SELECT products.id, products.productcategory, \
        products.producttype, products.productname, products.productdescription, \
        products.productphoto1, products.productphoto2, products.productphoto3, \
        products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
        products.dateadded, products.productlikes, products.liked_by_array, members.username, \
        members.profilephoto, members.userstatus, members.points  \
        FROM products INNER JOIN members ON products.ownerid=members.id WHERE members.username=? ORDER BY products.id";
    
        try {
            mysqlConnectionfidsbay.query(sqlconst,[req.body.username],function (err,result,fields) {
            
                res.send(result);
                
            }); //QUERY TO CHECK IF EMAIL IS IN USE
    
        } catch (error) {
            
        }

        
    });






    // DASHBOARD VIEW SPECIFIC ITEM : first item to display
    // DASHBOARD VIEW SPECIFIC ITEM : first item to display
    router.post('/viewItemSpecific', (req,res) => {

    const sqlconst = "SELECT products.id, products.productcategory, \
    products.producttype, products.productname, products.productdescription, \
    products.productphoto1, products.productphoto2, products.productphoto3, \
    products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
    products.dateadded, products.productlikes, products.liked_by_array, members.username, \
    members.profilephoto, members.userstatus, members.points  \
    FROM products INNER JOIN members ON products.ownerid=members.id WHERE members.username=? AND products.id =? ORDER BY products.id";

    try {
        mysqlConnectionfidsbay.query(sqlconst,[req.body.username,req.body.productID],function (err,result,fields) {
        
            res.send(result);
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

    
});






router.get('/ExploreViewAll/:category/:sourceProductId', (req,res) => {

    const sqlconst = "SELECT products.id, products.productcategory, \
    products.producttype, products.productname, products.productdescription, \
    products.productphoto1, products.productphoto2, products.productphoto3, \
    products.productprice, products.productpriceDisplay, products.city, products.country, products.ownerid,\
    products.dateadded, products.productlikes, products.liked_by_array, members.username, \
    members.profilephoto, members.userstatus, members.points  \
    FROM products INNER JOIN members ON products.ownerid=members.id WHERE products.productcategory=? AND products.id !=? ORDER BY products.id";

    mysqlConnectionfidsbay.query(sqlconst,[req.params.category,req.params.sourceProductId],function (err,result,fields) {
        
        res.send(result);

        
    }); //QUERY TO CHECK IF EMAIL IS IN USE

    
});



module.exports = router;