//See https://www.codementor.io/nodejs/tutorial/build-website-from-scratch-using-expressjs-and-bootstrap
//And http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

var express = require("express");
var app = express();  
var router = express.Router();  //Built in middle layer routing server provided by ExpressJS
var path = __dirname + '/views/';  //__dirname points to current directory
                                    //Views store HTML. Used in Router.get call
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;  //uses default port on Openshift, or 3000 locally
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1' //added from https://blog.openshift.com/run-your-nodejs-projects-on-openshift-in-two-simple-steps/

router.use(function (req,res,next) {
  console.log("/" + req.method);  //Log to console.
  next();  //needs to be passed after middle layer defined to execute router.
           //Router used to pass "GET" or "POST" to next route
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");  //sendFile() built-in expressJS function. Sends files to web browser
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.use("/",router);  //Tells Express to Use the routes we defined above.

//app.use("*",function(req,res){  //Routes are assigned in order. If no incoming request matched route
//  res.sendFile(path + "404.html");  //This will execute and host a 404 page.
//});

app.listen(port,function(){  //Listen on port 3000
    console.log((new Date()) + " Listening on " + ip + ", server_port " + port); 
    //console.log("Live at Port 3000");
});