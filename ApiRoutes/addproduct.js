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



// SQL_STATEMENTS
const sql_create_new_product = "INSERT INTO products VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
const sql_update_member_info = "UPDATE members SET productnumber = ? WHERE id=?";






router.post('/', (req,res) => {
    var datetime = new Date();
    var creationdate = date.format(datetime, 'ddd, MMM DD YYYY');







    if (req.body.producttype == 'meal') {
        







        if (req.body.itemcategory==null || req.body.itemcategory =='' ||
            req.body.itemname==null || req.body.itemname =='' ||
            req.body.itemdescription==null || req.body.itemdescription =='' ||
            req.body.itempic1==null || req.body.itempic1 =='' ||
            req.body.itemprice==null || req.body.itemprice =='') 
        {

            res.send({status: 'null', body: ''});

            
        }else{
            // MEANS ALL THE VALUES ARE PRESENT
            // MEANS ALL THE VALUES ARE PRESENT



            
            if (req.body.itempic2 == null) {
                var itempic2 = '';
            }else{
                var itempic2 = req.body.itempic2;
            }



            if (req.body.itempic3 == null) {
                var itempic3 = '';
            }else{
                var itempic3 = req.body.itempic3;
            }

            var itempriceDisplay = req.body.itemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            var escape_product_input = 
                [req.body.itemcategory,
                req.body.itemTag,
                req.body.producttype,
                req.body.productclass,
                req.body.itemname,
                req.body.itemdescription,
                req.body.itempic1,
                itempic2,
                itempic3,
                req.body.itemprice,
                itempriceDisplay,
                req.body.preparationtime,
                req.body.itemlocation,
                req.body.city,
                'Nigeria',
                req.body.id,
                creationdate,
                0,
                '',
                '',
                '']
        

                try {
                    mysqlConnectionfidsbay.query(sql_create_new_product,escape_product_input,function (err,result,fields) {
        
                        if (err) {
                                console.log(err);
                        }else{
            
                            var productnumber = req.body.productnumber;
                            productnumber++
                    
                            mysqlConnectionfidsbay.query(sql_update_member_info,[productnumber,req.body.id],function (err,result,fields) {
                                            
                                // To send back to updated USER INFO localstorage
                                const sql_get_user_info = "SELECT * FROM members WHERE session=?";            
                                mysqlConnectionfidsbay.query(sql_get_user_info,[req.body.session],function (err,rows,fields) {
                            
                                    res.send({status: 'OK', body: rows[0]});
                                
                                });


                            });
                        
                        }
            
                
                
                    });

                } catch (error) {
                    
                }

            
        

        }


    }else if (req.body.producttype == 'grocery') {
        


            
        if (req.body.itempic2 == null) {
            var itempic2 = '';
        }else{
            var itempic2 = req.body.itempic2;
        }



        if (req.body.itempic3 == null) {
            var itempic3 = '';
        }else{
            var itempic3 = req.body.itempic3;
        }

        var itempriceDisplay = req.body.itemprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        var escape_product_input = 
            [req.body.itemcategory,
            req.body.itemTag,
            req.body.producttype,
            req.body.productclass,
            req.body.itemname,
            req.body.itemdescription,
            req.body.itempic1,
            itempic2,
            itempic3,
            req.body.itemprice,
            itempriceDisplay,
            req.body.preparationtime,
            req.body.itemlocation,
            req.body.city,
            'Nigeria',
            req.body.id,
            creationdate,
            0,
            '',
            '',
            '']
    

        try {
                mysqlConnectionfidsbay.query(sql_create_new_product,escape_product_input,function (err,result,fields) {
    
                    if (err) {
                            console.log(err);
                    }else{
        
                        var productnumber = req.body.productnumber;
                        productnumber++
                
                        mysqlConnectionfidsbay.query(sql_update_member_info,[productnumber,req.body.id],function (err,result,fields) {
                                        
                            // To send back to updated USER INFO localstorage
                            const sql_get_user_info = "SELECT * FROM members WHERE session=?";            
                            mysqlConnectionfidsbay.query(sql_get_user_info,[req.body.session],function (err,rows,fields) {
                        
                                res.send({status: 'OK', body: rows[0]});
                            
                            });


                        });
                    
                    }
        
            
            
                });

        } catch (error) {
                
        }

        


    }




});

module.exports = router;