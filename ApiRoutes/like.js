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



// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


// SQL_STATEMENTS FOR THE ACCOUNT THAT IS BEING LIKED
// SQL_STATEMENTS FOR THE ACCOUNT THAT IS BEING LIKED
const get_profile_like_information_sql = "SELECT * FROM members WHERE id = ?";
const update_profile_like_information_sql = "UPDATE members SET likes=?, liked_by_array=?, points=? WHERE id = ?";

const delete_profile_like_activity_from_table = "DELETE FROM activity WHERE activity_for_id = ? AND activity_by_id = ? AND activity_type = ?";
const delete_product_like_activity_from_table = "DELETE FROM activity WHERE activity_for_id = ? AND activity_by_id = ? AND activity_product_id = ?";

const insert_activity_table = "INSERT INTO activity VALUES (NULL,?,?,?,?,?,?)";


// SQL_STATEMENTS FOR THE PRODUCT THAT IS BEING LIKED
// SQL_STATEMENTS FOR THE PRODUCT THAT IS BEING LIKED
const get_product_like_information_sql = "SELECT productlikes,liked_by_array FROM products WHERE id = ?";
const update_product_like_information_sql = "UPDATE products SET productlikes=?, liked_by_array=? WHERE id = ?";








// LIKE A PROFILE
// LIKE A PROFILE
// LIKE A PROFILE
// LIKE A PROFILE
router.post('/', (req,res) => {


    // FOR THE ACCOUNT THAT IS BEING LIKED
    // FOR THE ACCOUNT THAT IS BEING LIKED
    // FOR THE ACCOUNT THAT IS BEING LIKED
    // FOR THE ACCOUNT THAT IS BEING LIKED
    // FOR THE ACCOUNT THAT IS BEING LIKED
    // FOR THE ACCOUNT THAT IS BEING LIKED
    // FOR THE ACCOUNT THAT IS BEING LIKED
    var datetime = new Date();
    var activity_date = date.format(datetime, 'ddd, MMM DD YYYY');

    try {
                
        mysqlConnectionfidsbay.query(get_profile_like_information_sql,[req.body.profileOwnerId],function (err,result,fields) {
            var likes_results = result[0].likes;
            var liked_by_array_results = result[0].liked_by_array;




            // TO CHECK IF ARRAY IS EMPTY
            // TO CHECK IF ARRAY IS EMPTY
            if (liked_by_array_results == '' || liked_by_array_results == null) {
                // like array is empty

                // creating a new array and pushing the liker's Id
                var liked_by_array = [];
                var likeById = parseInt(req.body.likeById, 10);
                liked_by_array.push(likeById);

                // incrementing the count profile statistics
                likes_results++;

                // stringifying it so it can be an array in the database
                // stringifying it so it can be an array in the database
                liked_by_array_S = JSON.stringify(liked_by_array);
                // console.log(liked_by_array + ' real array');
                // console.log(liked_by_array_S + ' stringed array');


                // POINTS FORMULAR: Algo
                // POINTS FORMULAR: Algo
                var points = result[0].points;
                var productnumber = result[0].productnumber;
                points = (likes_results/3) + (productnumber/6);

                try {
                    
                    mysqlConnectionfidsbay.query(update_profile_like_information_sql,[likes_results,liked_by_array_S,points,req.body.profileOwnerId],function (err,result,fields) {
                
                        // SENDING ACTIVITY TO ACTIVITY TABLE
                        // SENDING ACTIVITY TO ACTIVITY TABLE
                        mysqlConnectionfidsbay.query(insert_activity_table,[req.body.profileOwnerId,req.body.likeById,'like',activity_date,0,0],function (err,result,fields) {
                            res.send(JSON.stringify({status:'liked', count:likes_results}))
                        });


                     });
                } catch (error) {
                    
                }

            }
            else{
                // like array is NOT empty
                // like array is NOT empty
                // like array is NOT empty

                var likedBy = req.body.likeById;
                
                var likedBy = parseInt(req.body.likeById, 10);

                // converting json string in DB to array for use
                var tmp = JSON.parse(liked_by_array_results)


                // to check if liker's ID is in array and getting the position
                // to check if liker's ID is in array and getting the position
                var liker_index = tmp.indexOf(likedBy);
                // console.log(liker_index);


                // liker's ID not in array is outputted as -1
                // liker's ID not in array is outputted as -1
                if (liker_index == -1) {
                    tmp.push(likedBy);
                    
                    // console.log(tmp)
                    likes_results = likes_results +1;


                    // stringifying it so it can be an array in the database: this is the like array
                    // stringifying it so it can be an array in the database: this is the like array
                    tmp = JSON.stringify(tmp);



                    // POINTS FORMULAR: Algo
                    // POINTS FORMULAR: Algo
                    var points = result[0].points;
                    var productnumber = result[0].productnumber;
                    points = (likes_results/3) + (productnumber/6);
                    
                    try {
                        mysqlConnectionfidsbay.query(update_profile_like_information_sql,[likes_results,tmp,points,req.body.profileOwnerId],function (err,result,fields) {     
                            
                            // SENDING ACTIVITY TO ACTIVITY TABLE
                            // SENDING ACTIVITY TO ACTIVITY TABLE
                            try {
                                mysqlConnectionfidsbay.query(insert_activity_table,[req.body.profileOwnerId,req.body.likeById,'like',activity_date,0,0],function (err,result,fields) {
                                    res.send(JSON.stringify({status:'liked', count:likes_results}))
                                });
                            } catch (error) {
                                
                            }
                        });
                    } catch (error) {
                        
                    }

                }
                else
                {
                    // TO UN-LIKE A PROFILE
                    // TO UN-LIKE A PROFILE

                    tmp.splice(liker_index, 1);

                    likes_results = likes_results -1;

                    // stringifying it so it can be an array in the database
                    // stringifying it so it can be an array in the database
                    tmp = JSON.stringify(tmp);


                    // POINTS FORMULAR: Algo
                    // POINTS FORMULAR: Algo
                    var points = result[0].points;
                    var productnumber = result[0].productnumber;
                    points = (likes_results/3) + (productnumber/6);

                    try {
                        
                        mysqlConnectionfidsbay.query(update_profile_like_information_sql,[likes_results,tmp,points,req.body.profileOwnerId],function (err,result,fields) {     
                        
                            // DELETE ACTIVITY FROM ACTIVITY TABLE
                            try {
                                
                                mysqlConnectionfidsbay.query(delete_profile_like_activity_from_table,[req.body.profileOwnerId,req.body.likeById,'like'],function (err,result,fields) {
                                    res.send(JSON.stringify({status:'unliked', count:likes_results}))
                                });
                            } catch (error) {
                                
                            }
                        });
                    } catch (error) {
                        
                    }

                }





            }


        });

    } catch (error) {
        
    }










    // SQL_STATEMENTS FOR THE LIKER
    // SQL_STATEMENTS FOR THE LIKER
    const get_liker_like_for_array = "SELECT liked_for_array FROM members WHERE id = ?";
    const update_liker_liked_for_array = "UPDATE members SET liked_for_array=? WHERE id = ?";

  

    // FOR THE LIKER TO UPDATE THEIR ARRAY TO BE USED FOR GETTING ALL THE LIKES IN DASHBOARD LIKED_BY
    // FOR THE LIKER TO UPDATE THEIR ARRAY TO BE USED FOR GETTING ALL THE LIKES IN DASHBOARD LIKED_BY
    // FOR THE LIKER TO UPDATE THEIR ARRAY TO BE USED FOR GETTING ALL THE LIKES IN DASHBOARD LIKED_BY
    // FOR THE LIKER TO UPDATE THEIR ARRAY TO BE USED FOR GETTING ALL THE LIKES IN DASHBOARD LIKED_BY
    // FOR THE LIKER TO UPDATE THEIR ARRAY TO BE USED FOR GETTING ALL THE LIKES IN DASHBOARD LIKED_BY
    // FOR THE LIKER TO UPDATE THEIR ARRAY TO BE USED FOR GETTING ALL THE LIKES IN DASHBOARD LIKED_BY
    var datetime = new Date();
    var activity_date = date.format(datetime, 'ddd, MMM DD YYYY');

    try {
        mysqlConnectionfidsbay.query(get_liker_like_for_array,[req.body.likeById],function (err,result,fields) {
            var liked_for_array_results = result[0].liked_for_array;





            // TO CHECK IF ARRAY IS EMPTY
            // TO CHECK IF ARRAY IS EMPTY
            if (liked_for_array_results == '' || liked_for_array_results == null) {
                // like array is empty



                // creating a new array and pushing the liker's Id
                var liked_for_array = [];
                liked_for_array.push(req.body.profileOwnerId);

                // stringifying it so it can be an array in the database
                // stringifying it so it can be an array in the database
                liked_for_array = JSON.stringify(liked_for_array);


                

                try {
                    mysqlConnectionfidsbay.query(update_liker_liked_for_array,[liked_for_array,req.body.likeById],function (err,result,fields) {

                    });
                } catch (error) {
                    
                }

            }
            else{
                // like for array is NOT empty
                // like for array is NOT empty
                // like for array is NOT empty

                
                var likedFor = parseInt(req.body.profileOwnerId, 10);

                // converting json string in DB to array for use
                var tmp = JSON.parse(liked_for_array_results)


                // to check if liker's ID is in array and getting the position
                // to check if liker's ID is in array and getting the position
                var like_for_index = tmp.indexOf(likedFor);


                // liker's ID not in array is outputted as -1
                // liker's ID not in array is outputted as -1
                if (like_for_index == -1) {
                    tmp.push(likedFor);
                    


                    // stringifying it so it can be an array in the database
                    // stringifying it so it can be an array in the database
                    tmp = JSON.stringify(tmp);
                    try {
                        
                        mysqlConnectionfidsbay.query(update_liker_liked_for_array,[tmp,req.body.likeById],function (err,result,fields) {     
                        
                        }); 
                    } catch (error) {
                        
                    }
                }
                else
                {

                    tmp.splice(like_for_index, 1);

                    // stringifying it so it can be an array in the database
                    // stringifying it so it can be an array in the database
                    tmp = JSON.stringify(tmp);
                    try {
                            
                        mysqlConnectionfidsbay.query(update_liker_liked_for_array,[tmp,req.body.likeById],function (err,result,fields) {     
                        
                        });
                    } catch (error) {
                        
                    }

                }





            }


        });
    } catch (error) {
        
    }
    












});









router.get('/getLikeArray/:id', (req,res) => {


    const sqlconst = `SELECT members.id, members.username, \
    members.profilephoto FROM members WHERE members.liked_for_array LIKE ? OR  members.liked_for_array LIKE ?`;

            try {
                mysqlConnectionfidsbay.query(sqlconst,['%'+req.params.id+',%','%'+req.params.id+']%'],function (err,result2,fields) {
                    res.send(result2)
                });
            } catch (error) {
                
            }

});





















// TO LIKE A PRODUCT
// TO LIKE A PRODUCT
// TO LIKE A PRODUCT
router.post('/likeproduct', (req,res) => {

    // FOR THE PRODUCT THAT IS BEING LIKED
    // FOR THE PRODUCT THAT IS BEING LIKED
    // FOR THE PRODUCT THAT IS BEING LIKED
    // FOR THE PRODUCT THAT IS BEING LIKED
    var datetime = new Date();
    var activity_date = date.format(datetime, 'ddd, MMM DD YYYY');

    try {
        mysqlConnectionfidsbay.query(get_product_like_information_sql,[req.body.productid],function (err,result,fields) {

            if (err) {
                console.log(err);
            }else{




                    var likes_results = result[0].productlikes;
                    var liked_by_array_results = result[0].liked_by_array;


                    // TO CHECK IF ARRAY IS EMPTY
                    // TO CHECK IF ARRAY IS EMPTY
                    if (liked_by_array_results == '' || liked_by_array_results == null) {
                        // like array is empty

                        // creating a new array and pushing the liker's Id
                        var liked_by_array = [];
                        var likeById = parseInt(req.body.likeById, 10);
                        liked_by_array.push(likeById);

                        // incrementing the count profile statistics
                        likes_results++;

                        // stringifying it so it can be an array in the database
                        // stringifying it so it can be an array in the database
                        liked_by_array_S = JSON.stringify(liked_by_array);
                        // console.log(liked_by_array + ' real array');
                        // console.log(liked_by_array_S + ' stringed array');

                        try {
                            mysqlConnectionfidsbay.query(update_product_like_information_sql,[likes_results,liked_by_array_S,req.body.productid],function (err,result,fields) {
                            
                                if (err) {
                                    console.log(err)
                                }else{
    
                                    // SENDING ACTIVITY TO ACTIVITY TABLE
                                    // SENDING ACTIVITY TO ACTIVITY TABLE
                                    try {
                                            
                                        mysqlConnectionfidsbay.query(insert_activity_table,[req.body.shopOwnerId,req.body.likeById,'likeproduct',activity_date,0,req.body.productid],function (err,result,fields) {
                                        
                                            if (err) {
                                                console.log(err);
                                            }else{
        
                                                res.send(JSON.stringify({status:'liked', count:likes_results}))
                                            }
        
                                        });
                                    } catch (error) {
                                        
                                    }
    
                                }
                            
    
                            });
                        } catch (error) {
                            
                        }
                        

                    }
                    else{
                        // like array is NOT empty
                        // like array is NOT empty
                        // like array is NOT empty

                        var likedBy = req.body.likeById;
                        
                        var likedBy = parseInt(req.body.likeById, 10);

                        // converting json string in DB to array for use
                        var tmp = JSON.parse(liked_by_array_results)


                        // to check if liker's ID is in array and getting the position
                        // to check if liker's ID is in array and getting the position
                        var liker_index = tmp.indexOf(likedBy);
                        // console.log(liker_index);


                        // liker's ID not in array is outputted as -1
                        // liker's ID not in array is outputted as -1
                        if (liker_index == -1) {
                            tmp.push(likedBy);
                            
                            // console.log(tmp)
                            likes_results = likes_results +1;


                            // stringifying it so it can be an array in the database
                            // stringifying it so it can be an array in the database
                            tmp = JSON.stringify(tmp);
                            try {
                                mysqlConnectionfidsbay.query(update_product_like_information_sql,[likes_results,tmp,req.body.productid],function (err,result,fields) {     
                                
                                    if (err) {
                                        console.log(err);
                                    }else{
    
                                        // SENDING ACTIVITY TO ACTIVITY TABLE
                                        // SENDING ACTIVITY TO ACTIVITY TABLE
                                        try {
                                                
                                            mysqlConnectionfidsbay.query(insert_activity_table,[req.body.shopOwnerId,req.body.likeById,'likeproduct',activity_date,0,req.body.productid],function (err,result,fields) {
                                                
                                                if (err) {
                                                    console.log(err);
                                                }else{
        
                                                    res.send(JSON.stringify({status:'liked', count:likes_results}))
                                                }
                                            });
                                        } catch (error) {
                                            
                                        }
                                        
                                    }
    
                                });
                            } catch (error) {
                                
                            }
                            
                        }
                        else
                        {
                            // console.log(tmp);
                            tmp.splice(liker_index, 1);

                            likes_results = likes_results -1;

                            // stringifying it so it can be an array in the database
                            // stringifying it so it can be an array in the database
                            tmp = JSON.stringify(tmp);
                            try {
                                mysqlConnectionfidsbay.query(update_product_like_information_sql,[likes_results,tmp,req.body.productid],function (err,result,fields) {     
                                
                                    if (err) {
                                        console.log(err);
                                    }else{
                                        // SENDING ACTIVITY TO ACTIVITY TABLE
                                        // SENDING ACTIVITY TO ACTIVITY TABLE
                                        try {
                                            
                                            mysqlConnectionfidsbay.query(delete_product_like_activity_from_table,[req.body.shopOwnerId,req.body.likeById,req.body.productid],function (err,result,fields) {
                                                
                                                if (err) {
                                                    console.log(err);
                                                }else{

                                                    res.send(JSON.stringify({status:'unliked', count:likes_results}))
                                                }

                                            });
                                        } catch (error) {
                                            
                                        }

                                    }
                                
                                });
                            } catch (error) {
                                
                            }
                            

                        }





                    }




            }


        });

    } catch (error) {
        
    }

    








});











module.exports = router;