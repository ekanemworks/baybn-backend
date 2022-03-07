
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
const nodemailer = require('nodemailer');


// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection');
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);

router.use(cors()); 
        


// GET LOWEST SQUARED ROOT, OR IF VALUE ENDERD IS A POWER OF 2 OR ANY DESIRED NUMBER
// GET LOWEST SQUARED ROOT, OR IF VALUE ENDERD IS A POWER OF 2 OR ANY DESIRED NUMBER
// GET LOWEST SQUARED ROOT, OR IF VALUE ENDERD IS A POWER OF 2 OR ANY DESIRED NUMBER
// GET LOWEST SQUARED ROOT, OR IF VALUE ENDERD IS A POWER OF 2 OR ANY DESIRED NUMBER
function PowersofTwo(num) { 

    // code goes here  
    // return num; 
    var i=0
    var rip=0;
    while(num > 2 && rip!=1){
      num = num/2;
      rip = num%2;
    }

    if (rip==0) {
        console.log('true');
    }else{
        console.log('false');
    }

}
// console.log(PowersofTwo(32));



// GOAL
// Input: "a b c d-e-f%g" 
// Output: a_b_c_d_e_f_g
// 
// OR
// Input: "cats AND*Dogs-are Awesome" 
// Output: cats_and_dogs_are_awesome
function SnakeCase(str) { 

    // code goes here
    str = str.toLowerCase().replace(/[ %--*_#]/g, '_');
    return str; 



    var newStr = str.split('');
    console.log(newStr); 
    var newStr2 = [];

    // newStr.forEach(element => {
    //     if (element == ' ') {
    //         element = '_'
    //     }else if (condition) {
    //         str.toLowerCase().replace(/[ *_#]/g, '');
    //     }

    //     newStr2.push(element);

    // });

    // str = str.replace(' ', '_');
    // console.log(str);
    // return str; 
  
}
// console.log(SnakeCase('cats AND*Dogs-are Awesome'));



function RunLength(str) { 
    var arr = [];
    let n = str.length;
    for (let i = 0; i<n; i++){
      let count = 1;
      while(i<n-1 && str[i] == str[i+1])
      {
        count++;
        i++;
      }
      arr.push(str[i]);
      arr.push(count);
    }

    str = arr.join('');
    
    return str; 
  
  }
     
  // keep this function call here 
//   console.log(RunLength('aabbcde'));



module.exports = router;