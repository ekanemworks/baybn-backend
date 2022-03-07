const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');

router.use(cors()); 
router.use(bodyparser.json());
const date = require('date-and-time');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');



// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);

// SQL_STATEMENTS
const sql_fidsbay_accounts = "SELECT * FROM members";
const sql_fidsbay_user = "SELECT * FROM members WHERE username=? ";
const sql_fidsbay_user_wallet = "SELECT * FROM fidsbay_wallet WHERE userid=? ";
const sql_fidsbay_products_number = "SELECT * FROM products";



// ORDERS 
// ORDERS 
// ORDERS 
const sql_fidsbay_all_new_orders = "SELECT * FROM orders WHERE status = 'new' ";
const sql_fidsbay_all_opened_orders = "SELECT * FROM orders WHERE status = 'opened' ";
const sql_fidsbay_all_closed_orders = "SELECT * FROM orders WHERE status = 'closed' ";
const sql_fidsbay_find_orderplaced_id = "SELECT * FROM orders WHERE id = ? ";
const sql_fidsbay_find_orderplaced_reference = "SELECT * FROM orders WHERE reference_number = ? ";



// Grocery CATEGORIES
const sql_fidsbay_get_grocery_options = "SELECT * FROM grocery_category_items";
const sql_fidsbay_get_grocery_category = "SELECT * FROM grocery_category_items WHERE category = ?";
const sql_fidsbay_UPDATE_grocery_category = "UPDATE grocery_category_items SET items=? WHERE category = ?";



// Meal CATEGORIES
const sql_fidsbay_get_meal_options = "SELECT * FROM meal_category_items";
const sql_fidsbay_get_meal_category = "SELECT * FROM meal_category_items WHERE category = ?";
const sql_fidsbay_UPDATE_meal_category = "UPDATE meal_category_items SET items=? WHERE category = ?";




// SQL TO UPDATE MEMBERS
const sql_fidsbay_updateuser = "UPDATE members SET account_status=?, userstatus=? WHERE username=? ";



// SQL TO UPDATE WALLET
const sql_fidsbay_updateuser_wallet = "UPDATE fidsbay_wallet SET deposit_status=?, ads_status=? WHERE userid=? ";





router.post('/', (req,res) => {

    try {
        const sql_login_query = "SELECT * FROM admin_watchtower WHERE (email=? AND password=?) ";
        mysqlConnectionfidsbay.query(sql_login_query,[req.body.email,req.body.password],function (err,result,fields) {

            if (result.length==1) {
                res.send(result[0]);
                // console.log('ekanem');
            }else{
                res.send(JSON.stringify('invalid'));
            }
            
    
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});






router.post('/getAppBaseInfo', (req,res) => {
    try {
            
        const sql_appBase = "SELECT * FROM AppBase";
        mysqlConnectionfidsbay.query(sql_appBase,function (err,result,fields) {

            if (result.length==1) {
                res.send(result[0]);
            }else{
                res.send(JSON.stringify('invalid'));
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});



router.get('/getmembers', (req,res) => {

    try {

        mysqlConnectionfidsbay.query(sql_fidsbay_accounts,function (err,result,fields) {

            if (!err) {
                res.send(result);
            }else{
                res.send(JSON.stringify('error'));
            }

        }); //QUERY TO CHECK IF EMAIL IS IN USE
 
    } catch (error) {
        
    }

});






router.post('/getuser', (req,res) => {

    try {
        
        mysqlConnectionfidsbay.query(sql_fidsbay_user,[req.body.username],function (err,result,fields) {

            if (!err) {
                res.send(result[0]);
            }else{
                res.send(JSON.stringify('error'));
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});



router.post('/getuserWallet', (req,res) => {

    try {
        
        mysqlConnectionfidsbay.query(sql_fidsbay_user_wallet,[req.body.userid],function (err,result,fields) {
            if (!err) {
                if (result.length > 0) {
                    res.send(JSON.stringify({status:'OK',body: result[0]}));
                }else{
                    res.send(JSON.stringify({status:'bad',body: result[0]}));
                }
            }else{
                res.send(JSON.stringify('error'));
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});



router.post('/updateuser', (req,res) => {

    try {
        
        // update members table
        // update members table
        // update members table
        mysqlConnectionfidsbay.query(sql_fidsbay_updateuser,[req.body.accountStatus, req.body.userStatus, req.body.username],function (err,result,fields) {
            // console.log('sasa');

            if (!err) {

                    try {
                        
                        // update members table
                        mysqlConnectionfidsbay.query(sql_fidsbay_updateuser_wallet,[req.body.depositStatus, req.body.adsStatus, req.body.userid],function (err,result,fields) {
                            // console.log('sasa');
                
                            if (!err) {
                                res.send(JSON.stringify('OK'));
                            }else{
                                res.send(JSON.stringify('error'));
                                console.log('step2err');
                            }
                            
                        }); //QUERY TO CHECK IF EMAIL IS IN USE
                
                    } catch (error) {
                        
                    }

            }else{
                res.send(JSON.stringify('error'));
                console.log('step1err');
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});



// GET PRODUCTS TOTAL NUMBER
// GET PRODUCTS TOTAL NUMBER
// GET PRODUCTS TOTAL NUMBER
router.get('/getproductsnumber', (req,res) => {

    try {
        
        mysqlConnectionfidsbay.query(sql_fidsbay_products_number,function (err,result,fields) {
            if (!err) {

                res.send({status:'OK', body: result.length});
              
            }else{
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});




// GET ALL ORDERS: status new
// GET ALL ORDERS: status new
// GET ALL ORDERS: status new
router.get('/getOrdersNew', (req,res) => {

    try {
        
        mysqlConnectionfidsbay.query(sql_fidsbay_all_new_orders,function (err,result,fields) {
            if (!err) {

                res.send({status:'OK', body: result});
              
            }else{
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});






// GET ALL ORDERS: status opened
// GET ALL ORDERS: status opened
// GET ALL ORDERS: status opened
router.get('/getOrdersOpen', (req,res) => {

    try {
        
        mysqlConnectionfidsbay.query(sql_fidsbay_all_opened_orders,function (err,result,fields) {
            if (!err) {

                res.send({status:'OK', body: result});
              
            }else{
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});








// GET ALL ORDERS: status closed
// GET ALL ORDERS: status closed
// GET ALL ORDERS: status closed
router.get('/getOrdersClosed', (req,res) => {

    try {
        
        mysqlConnectionfidsbay.query(sql_fidsbay_all_closed_orders,function (err,result,fields) {
            if (!err) {

                res.send({status:'OK', body: result});
              
            }else{
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});










// GET SPECIFIC ORDERS: by id
// GET SPECIFIC ORDERS: by id
// GET SPECIFIC ORDERS: by id
router.post('/getOrderById', (req,res) => {

    try {
        
        mysqlConnectionfidsbay.query(sql_fidsbay_find_orderplaced_id,[req.body.orderId],function (err,result,fields) {
            if (!err) {

                res.send({status:'OK', body: result});
              
            }else{
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});












// GET SPECIFIC ORDERS: by reference
// GET SPECIFIC ORDERS: by reference
// GET SPECIFIC ORDERS: by reference
router.post('/getOrderByReference', (req,res) => {

    try {
        mysqlConnectionfidsbay.query(sql_fidsbay_find_orderplaced_reference,[req.body.orderReference],function (err,result,fields) {
            if (!err) {

                res.send({status:'OK', body: result});
              
            }else{
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (error) {
        
    }

});

















    // GET GROCERY CATEGORY OPTION: 
    // GET GROCERY CATEGORY OPTION: 
    // GET GROCERY CATEGORY OPTION:  
    router.get('/getGroceryCategory', (req,res) => {

        try {
            mysqlConnectionfidsbay.query(sql_fidsbay_get_grocery_options,function (err,result,fields) {
                if (!err) {

                    res.send({status:'OK', body: result});
                
                }else{
                    res.send({status:'BAD',body: ''});
                }
                
            }); //QUERY TO CHECK IF EMAIL IS IN USE

        } catch (error) {
            
        }

    });


    // GET MEAL CATEGORY OPTION: 
    // GET MEAL CATEGORY OPTION: 
    // GET MEAL CATEGORY OPTION:  
    router.get('/getMealCategory', (req,res) => {

        try {
            mysqlConnectionfidsbay.query(sql_fidsbay_get_meal_options,function (err,result,fields) {
                if (!err) {

                    res.send({status:'OK', body: result});
                
                }else{
                    res.send({status:'BAD',body: ''});
                }
                
            }); //QUERY TO CHECK IF EMAIL IS IN USE

        } catch (error) {
            
        }

    });













// ADD NEW GROCERY CATEGORY OPTION: 
// ADD NEW GROCERY CATEGORY OPTION: 
// ADD NEW GROCERY CATEGORY OPTION: 
router.post('/addGroceryCategoryOption', (req,res) => {



    // get the items of that particular category
    // get the items of that particular category
    try {
        mysqlConnectionfidsbay.query(sql_fidsbay_get_grocery_category,[req.body.newOptionForCategory],function (err,result,fields) {
            if (!err) {

                // if item is empty
                // if item is empty
                if (result[0].items == '') {
                    
                    // console.log(result[0].items+'1');

                    var category_item_array = [];
                    category_item_array.push(req.body.newOption);
                    category_item_array = JSON.stringify(category_item_array);

                        try {

                            mysqlConnectionfidsbay.query(sql_fidsbay_UPDATE_grocery_category,[category_item_array,req.body.newOptionForCategory],function (err,result,fields) {
                                if (!err) {

                                    res.send({status:'OK', body: result});
                                    
                                }else{
                                    res.send({status:'BAD',body: ''});
                                }
                                
                            }); //QUERY TO CHECK IF EMAIL IS IN USE

                        } catch (error) {
                            
                        }

                }else{
                    // if item has items: 
                    // if item has items: 


                    var category_item_array = JSON.parse(result[0].items);
                    category_item_array.push(req.body.newOption);
                    category_item_array = JSON.stringify(category_item_array);

                        try {
                            mysqlConnectionfidsbay.query(sql_fidsbay_UPDATE_grocery_category,[category_item_array,req.body.newOptionForCategory],function (err,result,fields) {
                                if (!err) {

                                    res.send({status:'OK', body: result});
                                    
                                }else{
                                    res.send({status:'BAD',body: ''});
                                }

                                
                            }); //QUERY TO CHECK IF EMAIL IS IN USE

                        } catch (error) {
                            
                        }




                }
                


              
            }else{
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (err) {
        console.log(err);
        
    }





});








// ADD NEW MEAL CATEGORY OPTION: 
// ADD NEW MEAL CATEGORY OPTION: 
// ADD NEW MEAL CATEGORY OPTION: 
router.post('/addMealCategoryOption', (req,res) => {



    // get the items of that particular category
    // get the items of that particular category
    try {
        mysqlConnectionfidsbay.query(sql_fidsbay_get_meal_category,[req.body.newOptionForCategory],function (err,result,fields) {
            if (!err) {

                // if item is empty
                // if item is empty
                if (result[0].items == '') {
                    
                    // console.log(result[0].items+'1');

                    var category_item_array = [];
                    category_item_array.push(req.body.newOption);
                    category_item_array = JSON.stringify(category_item_array);

                        try {

                            mysqlConnectionfidsbay.query(sql_fidsbay_UPDATE_meal_category,[category_item_array,req.body.newOptionForCategory],function (err,result,fields) {
                                if (!err) {

                                    res.send({status:'OK', body: result});
                                    
                                }else{
                                    res.send({status:'BAD',body: ''});
                                }
                                
                            }); //QUERY TO CHECK IF EMAIL IS IN USE

                        } catch (error) {
                            
                        }

                }else{
                    // if item has items: 
                    // if item has items: 


                    var category_item_array = JSON.parse(result[0].items);
                    category_item_array.push(req.body.newOption);
                    category_item_array = JSON.stringify(category_item_array);

                        try {
                            mysqlConnectionfidsbay.query(sql_fidsbay_UPDATE_meal_category,[category_item_array,req.body.newOptionForCategory],function (err,result,fields) {
                                if (!err) {

                                    res.send({status:'OK', body: result});
                                    
                                }else{
                                    res.send({status:'BAD',body: ''});
                                }

                                
                            }); //QUERY TO CHECK IF EMAIL IS IN USE

                        } catch (error) {
                            
                        }




                }
                


              
            }else{
                res.send({status:'BAD',body: ''});
            }
            
        }); //QUERY TO CHECK IF EMAIL IS IN USE

    } catch (err) {
        console.log(err);
        
    }





});






module.exports = router;