const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');

router.use(cors()); 



// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


router.get('/suggested', (req,res) => {

    try {
        const sql_suggested = "SELECT * FROM search_autosuggestion ";
        mysqlConnectionfidsbay.query(sql_suggested,function (err,rows,fields) {
            
            res.send(rows);
        }); //End of product mysql statement
        
        
    } catch (error) {
        
    }

    });

    router.get('/HomeSearchSuggestedchef', (req,res) => {
    
        try {
            const sql_home_search_suggestions = "SELECT * FROM members WHERE accounttype='business' ";
            mysqlConnectionfidsbay.query(sql_home_search_suggestions,function (err,rows,fields) {
                
                res.send(rows);
            }); //End of product mysql statement
            
            
        } catch (error) {
            
        }
    
        });

    

module.exports = router;