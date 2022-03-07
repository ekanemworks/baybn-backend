const mysql = require('mysql');
const express = require('express');
var app = express();
var bodyparser = require('body-parser');
// const count = require('../../nodeapp/mymodule/count');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const date = require('date-and-time');
const multer = require('multer');
var formidable = require('formidable');
const fs = require('fs');
const mime = require('mime');

// DATABASE CONNECTION
var DATABASE_CONNECTION = require('./dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


app.use(require('./ApiRoutes'));
app.use(bodyparser.json({limit:"100mb"}));


var cors = require('cors'); 
app.use(cors()); 

app.use('/profilephotos', express.static(__dirname + '/profilephotos'));
app.use('/productphotos', express.static(__dirname + '/productphotos'));
app.use('/photo_categories', express.static(__dirname + '/photo_categories'));
app.use('/promotionadsphoto', express.static(__dirname + '/promotionadsphoto'));


// MAINLY FOR CHAT SOCKET IO REALTIME
// const express = require('express');
const appp = express();
const server=require('http').createServer(appp);
io = require('socket.io')(server, {
    upgradeTimeout: 50000,
  cors:{
      origin:"*"
  },
});


var clients = {};

io.on('connection', (socket) => { 
    // console.log(socket.id);
    console.log(socket.id+' joinned the chat server');


    socket.on('signin',(id)=>{
        console.log(id);
        clients[id]=socket;
        // console.log(clients);
    });

    socket.on('disconnect',()=>{
        console.log("Disconnected", socket.id);
    });

    socket.on('message',(msg)=>{
        console.log(msg);
        let targetId = msg.baybnTargetId;

        // TO ONLY EMIT IF RECIEVER IS KNOWN
        if (clients[targetId]) {
            clients[targetId].emit('message-received', msg);
        }
        // socket.broadcast.emit('message-receive',data);
    });

});


// server.listen(3001, () => {
//   console.log("Chat Server is running...");
 
// });
server.listen(3001, '192.168.0.126', ()=> {console.log("Chat Server is running... IP")});
// server.listen(3001, '192.168.8.197', ()=> {console.log("Chat Server is running... IP")});


// const app2 = express();
// const PORT = process.env.PORT || 4000;
// const server = app2.listen(PORT,()=>{
//     console.log('server started', PORT);
// })
// const http = require('http');

// const io = require('socket.io')(server);

// io.on('connection',(socket)=>{
//     console.log("connected successfully", socket.id);
// });

// var app_2 = express();
// var chatserver = http.createServer(app_2)
// const io = require('socket.io')(chatserver);
// app_2.use(express.json());


// io.on("connection", (socket) => {
//     console.log(socket.id);
//     console.log('connected');

//     socket.on("signin", (data) => {
//         console.log(data);
//     })

// });

// chatserver.listen(3001, () => console.log('chat socket-server running'));








mysqlConnectionfidsbay.connect((err) => {
    if (!err) {
        console.log('Database Connected');
        console.log('...');
    }else{
        console.log(err)
        console.log('Error dey o: Db not connecting to node server');
    }
});


// app.listen(3000, () => console.log('App Server Running'));

// RUN ON LOCAL MACHINE
app.listen(3000, '192.168.0.126', ()=> console.log("App server running on IP"));
// app.listen(3000, '192.168.8.197', ()=> console.log("App server running on IP")); // COUSANT WIFI
// http.createServer(onRequest).listen(8888,'192.168.0.102');








app.get('/',(req,res) => {
    res.send('The App')
})

// app.options('/setupBusinessProfilephoto', function (req, res) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.end();
//   });



// app.post('/sendStatusText', (req,res) => {

// });


// FOR SETUP BUSINESS PROFILE PHOTO
// FOR SETUP BUSINESS PROFILE PHOTO
// FOR SETUP BUSINESS PROFILE PHOTO
// FOR SETUP BUSINESS PROFILE PHOTO
// FOR SETUP BUSINESS PROFILE PHOTO
app.post('/setupBusinessProfilephoto', (req, res) => {


    
    var form = new formidable.IncomingForm()
    form.parse(req)
    form.on('fileBegin', function (name, file) {

        // FOR DELETING AND MANAGING FILES
        // FOR DELETING AND MANAGING FILES
        var curr_img_a = __dirname + '/profilephotos/user_' + file.name + '_a.jpg';
        var curr_img_b = __dirname + '/profilephotos/user_' + file.name + '_b.jpg';
        var curr_img_c = __dirname + '/profilephotos/user_' + file.name + '_c.jpg';

            if (fs.existsSync(curr_img_a)) {
              
            var newFilename = 'user_'+file.name+'_b.jpg';
            fs.unlinkSync(curr_img_a);
            // console.log('b')

            }else if (fs.existsSync(curr_img_b)) {
            
                var newFilename = 'user_'+file.name+'_c.jpg';
                fs.unlinkSync(curr_img_b);
                // console.log('c')
                
                
            }else if (fs.existsSync(curr_img_c)) {
        
            var newFilename = 'user_'+file.name+'_a.jpg';
            fs.unlinkSync(curr_img_c);
            // console.log('a')
            
            }else{

            var newFilename = 'user_'+file.name+'_a.jpg';
            }
            
            var DB_img_path = 'profilephotos/'+newFilename;

            mysqlConnectionfidsbay.query("UPDATE members SET profilephoto=? WHERE id=?",[DB_img_path,file.name],function (err,rows,fields) {

            });
            
        file.path = __dirname + '/profilephotos/'+newFilename;

    res.send(JSON.stringify('profilephotos/'+newFilename));
    })

}); //End of setup business profile photo












// ENGINE BEHIND CONVERTING BASE64 TO IMAGE FILE






// FOR ADD PRODUCT PHOTO
// FOR ADD PRODUCT PHOTO
// FOR ADD PRODUCT PHOTO
// FOR ADD PRODUCT PHOTO
// FOR ADD PRODUCT PHOTO
    app.post('/addProductPhoto/:id', (req, res) => {

            // function to decode base64
            // function to decode base64
            function decodeBase64Image(dataString) {
                var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};
            
                if (matches.length !== 3) {
                return new Error('Invalid input string');
                }
            
                response.type = matches[1];
                response.data = new Buffer.from(matches[2], 'base64');
            
                return response;
            }
            // end of function to decode base64
            // end of function to decode base64


          var decodedImg = decodeBase64Image(req.body.base64);
          var imageBuffer = decodedImg.data;
        

            mysqlConnectionfidsbay.query("SELECT * FROM products WHERE ownerid=? ",[req.params.id],function (err,rows,fields) {
        

                                var productNumber = rows.length
                                productNumber++
                                var dirTest = __dirname+'/productphotos/user_'+ req.params.id;
                                        if (!fs.existsSync(dirTest)){
                                            // if it does not exist
                                                fs.mkdirSync(dirTest);
                                        }

                                var dirTest2 = __dirname+'/productphotos/user_'+ req.params.id +'/product_num_'+productNumber;
                                        if (!fs.existsSync(dirTest2)){
                                            // if it does not exist
                                                fs.mkdirSync(dirTest2);
                                        }
                                var newnameVariable = uuidv4();
                                newnameVariable = newnameVariable.substring(0,5);
                                var newFilename = newnameVariable+'.jpg';

                                try{
                                    fs.writeFileSync(__dirname+'/productphotos/user_'+ req.params.id + '/product_num_' + productNumber +'/'+ newFilename, imageBuffer, 'utf8');
                                 }
                                catch(err){
                                    console.error(err)
                                }
                        
                                    
                                // file.path = __dirname + '/productphotos/user_'+ file.name+'/product_num_'+productNumber+'/'+newFilename;

                                // sending back the product link: this can be appended to the weblink the (productphotos) is a static api link on the server
                                // sending back the product link: this can be appended to the weblink the (productphotos) is a static api link on the server
                                res.send(JSON.stringify('productphotos/user_'+ req.params.id + '/product_num_' + productNumber +'/'+ newFilename));



  
            });




    }); //End of PRODUCT photo






























// EDIT IMAGE: ADD PRODUCT PHOTO
// EDIT IMAGE: ADD PRODUCT PHOTO
// EDIT IMAGE: ADD PRODUCT PHOTO
// EDIT IMAGE: ADD PRODUCT PHOTO
// EDIT IMAGE: ADD PRODUCT PHOTO
app.post('/addItemPhotoSpecific/:ownerid/:productid/:imagePosition', (req, res) => {









            // function to decode base64
            // function to decode base64
            function decodeBase64Image(dataString) {
                var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};
            
                if (matches.length !== 3) {
                return new Error('Invalid input string');
                }
            
                response.type = matches[1];
                response.data = new Buffer.from(matches[2], 'base64');
            
                return response;
            }
            // end of function to decode base64
            // end of function to decode base64


          var decodedImg = decodeBase64Image(req.body.base64);
          var imageBuffer = decodedImg.data;
        

            mysqlConnectionfidsbay.query("SELECT * FROM products WHERE ownerid=? ",[req.params.ownerid],function (err,rows,fields) {
        

                                var productNumber = rows.length

                                var dirTest = __dirname+'/productphotos/user_'+ req.params.ownerid;
                                        if (!fs.existsSync(dirTest)){
                                            // if it does not exist
                                                fs.mkdirSync(dirTest);
                                        }

                                var dirTest2 = __dirname+'/productphotos/user_'+ req.params.ownerid +'/product_num_'+productNumber;
                                        if (!fs.existsSync(dirTest2)){
                                            // if it does not exist
                                                fs.mkdirSync(dirTest2);
                                        }
                                var newnameVariable = uuidv4();
                                newnameVariable = newnameVariable.substring(0,5);
                                var newFilename = newnameVariable+'.jpg';

                                try{
                                    fs.writeFileSync(__dirname+'/productphotos/user_'+ req.params.ownerid + '/product_num_' + productNumber +'/'+ newFilename, imageBuffer, 'utf8');
                                 }
                                catch(err){
                                    console.error(err)
                                }
                        

                                imageRecreatedPath = 'productphotos/user_'+ req.params.ownerid + '/product_num_' + productNumber +'/'+ newFilename
            
            
            
                                if (req.params.imagePosition == 1) {
                                    
                                    mysqlConnectionfidsbay.query("UPDATE products SET productphoto1=? WHERE id=?",[imageRecreatedPath,req.params.productid],function (err,rows,fields) {
                                        res.send(JSON.stringify('productphotos/user_'+ req.params.ownerid +'/product_num_'+productNumber+'/'+newFilename));
                                        });
                        
                                }else if (req.params.imagePosition == 2) {
                                    
                                    mysqlConnectionfidsbay.query("UPDATE products SET productphoto2=? WHERE id=?",[imageRecreatedPath,req.params.productid],function (err,rows,fields) {
                                    res.send(JSON.stringify('productphotos/user_'+ req.params.ownerid +'/product_num_'+productNumber+'/'+newFilename));
                                    });
                        
                                }else if (req.params.imagePosition == 3) {
                                    
                                   
                                    mysqlConnectionfidsbay.query("UPDATE products SET productphoto3=? WHERE id=?",[imageRecreatedPath,req.params.productid],function (err,rows,fields) {
                                        res.send(JSON.stringify('productphotos/user_'+ req.params.ownerid +'/product_num_'+productNumber+'/'+newFilename));
                                        });
                                }
            
                      

  
            });








}); //End of PRODUCT photo















// DELETE ALL PRODUCT PHOTO
// DELETE ALL PRODUCT PHOTO
// DELETE ALL PRODUCT PHOTO
// DELETE ALL PRODUCT PHOTO
// DELETE ALL PRODUCT PHOTO
// DELETE ALL PRODUCT PHOTO
app.post('/deleteProductPhoto', (req, res) => {

    if (fs.existsSync(__dirname+'/'+req.body.itempic1)){
        // if it exist
    fs.unlinkSync(__dirname+'/'+req.body.itempic1);
    }

    if (fs.existsSync(__dirname+'/'+req.body.itempic2)){
        // if it exist
    fs.unlinkSync(__dirname+'/'+req.body.itempic2);
    }

    if (fs.existsSync(__dirname+'/'+req.body.itempic3)){
        // if it exist
    fs.unlinkSync(__dirname+'/'+req.body.itempic3);
    }

}); //End of PRODUCT photo





















// FOR UPDATE PROFILE PHOTO
// FOR UPDATE PROFILE PHOTO
// FOR UPDATE PROFILE PHOTO
// FOR UPDATE PROFILE PHOTO
// FOR UPDATE PROFILE PHOTO
app.post('/updateProfilePhoto', (req, res) => {
   console.log('entered');
   var base64ImageVariable =  req.body.image;
   var session = req.body.session;
   var randomvariable = uuidv4();
   randomvariable = randomvariable.substr(0,4);
   var imagePathOnDB = '';



            // function to decode base64
            // function to decode base64
            function decodeBase64Image(dataString) {
                // var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                // response = {};
            
                // if (matches.length !== 3) {
                // return new Error('Invalid input string');
                // }
            
                // response.type = matches[1];
                response = new Buffer.from(dataString, 'base64');
            
                return response;
            }
            // end of function to decode base64
            // end of function to decode base64

        var decodedImg = decodeBase64Image(base64ImageVariable);
        var imageBuffer = decodedImg;
        

            
        try {
            mysqlConnectionfidsbay.query("SELECT id FROM members WHERE session = ?",[session],function (err,rows,fields) {

                if (!err) {
                    
                    var userid = rows[0].id;
                    var curr_img_a = __dirname+'/profilephotos'+'/'+ 'user_'+userid+'_CODE_A.jpg';
                    var curr_img_b = __dirname+'/profilephotos'+'/'+ 'user_'+userid+'_CODE_B.jpg';
    
                    if (fs.existsSync(curr_img_a)) {
                  
                        fs.unlinkSync(curr_img_a);
                        fs.writeFileSync(curr_img_b, imageBuffer, 'utf8');
                        imagePathOnDB = 'profilephotos'+'/'+ 'user_'+userid+'_CODE_B.jpg';
                       
                    }else if(fs.existsSync(curr_img_b)){
                        
                        fs.unlinkSync(curr_img_b);
                        fs.writeFileSync(curr_img_a, imageBuffer, 'utf8');
                        imagePathOnDB = 'profilephotos'+'/'+ 'user_'+userid+'_CODE_A.jpg';

                    }else{
                        fs.writeFileSync(curr_img_a, imageBuffer, 'utf8');
                        imagePathOnDB = 'profilephotos'+'/'+ 'user_'+userid+'_CODE_A.jpg';
                    }



                    mysqlConnectionfidsbay.query("UPDATE members SET profilephoto = ? WHERE session = ?",[imagePathOnDB,session],function (err,rows,fields) {

                        if (!err) {
                            
                            res.send({
                                status: 'ok',
                                body: {imagePathOnDB: imagePathOnDB},
                                message: 'Update successfully'
                            })

                        }else{
                            console.log(err);
                            res.send({
                                status: 'error',
                                message: 'Database error!'
                            });
                        }
            
                    });
    
    
    
                }else{
                    console.log(err);
                    res.send({
                        status: 'error',
                        message: 'Database error!'
                    });
                }
    
            });
        } catch (error) {
            console.log(error);
            res.send({
                status: 'error',
                message: 'server error'
            })
        }  
        

     


}); //End of setup business profile photo
















// DELETE ONE PRODUCT PHOTO
// DELETE ONE PRODUCT PHOTO
// DELETE ONE PRODUCT PHOTO
// DELETE ONE PRODUCT PHOTO
// DELETE ONE PRODUCT PHOTO
app.post('/deleteitemPhoto', (req, res) => {

    // console.log(req.body.itemImgPath);
    if (fs.existsSync(__dirname+'/'+req.body.itemImgPath)){
        // if it exist
         fs.unlinkSync(__dirname+'/'+req.body.itemImgPath);

         if (req.body.imagePosition == 1) {
             
         mysqlConnectionfidsbay.query("UPDATE products SET productphoto1 =? WHERE id=?",['',req.body.itemid],function (err,rows,fields) {
            res.send(JSON.stringify('deleted'));
        });

         }else if (req.body.imagePosition == 2) {
            
         mysqlConnectionfidsbay.query("UPDATE products SET productphoto2=? WHERE id=?",['',req.body.itemid],function (err,rows,fields) {
            res.send(JSON.stringify('deleted'));
        });

        }else if (req.body.imagePosition == 3) {
            
         mysqlConnectionfidsbay.query("UPDATE products SET productphoto3=? WHERE id=?",['',req.body.itemid],function (err,rows,fields) {
            res.send(JSON.stringify('deleted'));
        }); 
        }

    }


}); //End of PRODUCT photo















// FOR ADVERT: CAMPAIGN PHOTO
// FOR ADVERT: CAMPAIGN PHOTO
// FOR ADVERT: CAMPAIGN PHOTO
// FOR ADVERT: CAMPAIGN PHOTO
// FOR ADVERT: CAMPAIGN PHOTO
// FOR ADVERT: CAMPAIGN PHOTO
app.post('/addCampaignPhoto/:contact', (req, res) => {

    // function to decode base64
    // function to decode base64
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    
        if (matches.length !== 3) {
        return new Error('Invalid input string');
        }
    
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
    
        return response;
    }
    // end of function to decode base64
    // end of function to decode base64


    var decodedImg = decodeBase64Image(req.body.base64);
    var imageBuffer = decodedImg.data;

    const dateTime = new Date();
    var date_created            = date.format(dateTime, 'ddd, MMM DD YYYY');

    var dirTest = __dirname+'/promotionadsphoto/date_'+ date_created;
                                if (!fs.existsSync(dirTest)){
                                    // if it does not exist
                                        fs.mkdirSync(dirTest);
                                }

    var dirTest2 = __dirname+'/promotionadsphoto/date_'+ date_created +'/contact_'+req.params.contact;
                                if (!fs.existsSync(dirTest2)){
                                    // if it does not exist
                                        fs.mkdirSync(dirTest2);
                                }


    var newnameVariable = uuidv4();
                        newnameVariable = newnameVariable.substring(0,5);
                        var newFilename = newnameVariable+'.jpg';

                        try{
                            fs.writeFileSync(__dirname+'/promotionadsphoto/date_'+ date_created + '/contact_' + req.params.contact +'/'+ newFilename, imageBuffer, 'utf8');
                         }
                        catch(err){
                            console.error(err)
                        }
                
                            
                        // file.path = __dirname + '/productphotos/user_'+ file.name+'/product_num_'+productNumber+'/'+newFilename;

                        // sending back the product link: this can be appended to the weblink the (productphotos) is a static api link on the server
                        // sending back the product link: this can be appended to the weblink the (productphotos) is a static api link on the server
                        var newdata = {
                            imagepath: 'promotionadsphoto/date_'+ date_created + '/contact_' + req.params.contact +'/'+ newFilename,
                            uniqueLink: newFilename
                        }

                        res.send(JSON.stringify(newdata));






}); //End of PRODUCT photo



