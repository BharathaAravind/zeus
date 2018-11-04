var express = require('express');
var http = require('http');
var  path = require('path');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
const importer = require('node-mysql-importer')
var request = require('request')
var MYSQLCONNECTION = require('./constants');
const zk = require('node-zookeeper-client')
var client;
var port='3001'
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
var url = '149.165.170.230:2181';
console.log("Controller is running at 3001");

app.listen(port);

app.get('/',function(req,res){
    return res.render('index');    
});

app.get('/login',function(req,res){
    return res.render('index');    
});

app.post('/login', async function(req,res){
	var email= req.body.uname;
    var password = req.body.psw;
    if(!client){
        client = zk.createClient(url, {retries: 2})
        client.connect();
    }
    var randomNodeInstance = "";
    await client.getChildren('/zeus/node',function(error, data){
        if(error){
            console.log("error");
        }else{
            randomNodeInstance = data[Math.floor(Math.random()*data.length)];        
            var tmp = '/zeus/node/'+randomNodeInstance;
            
            client.getData(tmp, function(error, data){
                if(error){
                    console.log("error getting data from zookeeper");
                }else{
                    var url = JSON.parse(data.toString('utf8'));
                    randomNodeInstance = url['host']+":"+url["port"];
                    var urlnode1='http://'+randomNodeInstance+'/login';
                    request.post(
                        urlnode1,
                        // 'http://localhost:3050/login',
                        { json: { 
                            email: req.body.uname,
                            password: req.body.psw
                         } },
                        function (error, response, body) {
                            if (response.body.code == 200) {
                                res.redirect('/home');
                            }
                            else{
                                res.send("Incorrect login");
                            }
                        }
                    );
                }
            });
        }
    });
});

app.get('/logout',function(req, res){
    if(!client){
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect();
    }
    else{
        console.log("logout");
        client.close();
    }
    console.log("test");
    res.redirect('/login');
}); 


app.get('/addQueue', async function(req, res){   
    console.log("Testing Java")
    
    if(!client){
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect();
    }
    var randomJavaInstance = "";
    await client.getChildren('/zeus/java',function(error, data){
        if(error){
            console.log("error");
        }else{
            randomJavaInstance = data[Math.floor(Math.random()*data.length)];        
            var tmp = '/zeus/java/'+randomJavaInstance;
            client.getData(tmp, function(error, data){
                if(error){
                    console.log("error getting data from zoo");
                }else{
                    // var url = JSON.parse(data.toString('utf8'));
                    randomJavaInstance = data.toString('utf8');
                    var urljava1='http://'+randomJavaInstance+'/search/video/';
                    console.log(urljava1 + req.query.userId + '/' + req.query.category);
                    request({
                        method: 'GET',
                        //  url: 'http://localhost:8090/search/video/'+req.query.userId + '/' + req.query.category,
                        url: urljava1 + req.query.userId + '/' + req.query.category,
                    }, function (err, resp) {
                        if (err) return console.error(err.message);
                    });
                }
            });
        }
    });
    res.send("ok");
});

app.get('/signup',function(req,res){
    return res.render('signup');
});


app.post('/signup', async function(req,res){
    console.log("TestingNode2")
    var email= req.body.uname;
    var password = req.body.psw;

    if(!client){
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect();
    }
    var randomNodeInstance = "";
    await client.getChildren('/zeus/node',function(error, data){
        if(error){
            console.log("error");
        }else{
            randomNodeInstance = data[Math.floor(Math.random()*data.length)];        
            var tmp = '/zeus/node/'+randomNodeInstance;
            client.getData(tmp, function(error, data){
                if(error){
                    console.log("error getting data from zoo");
                }else{
                    var url = JSON.parse(data.toString('utf8'));
                    randomNodeInstance = url['host']+":"+url["port"];
                    var urlnode2='http://'+randomNodeInstance+'/signup';
                    console.log(urlnode2);
                    request.post(
                        // 'http://localhost:3050/signup',
                        urlnode2,
                        { 
                            json: { 
                                "EMAIL":req.body.email,
                                "PASSWORD":req.body.password,
                                "PHONENO":req.body.PhoneNo
                            }
                        },
                        function (error, response, body) {
                            console.log(response.body.code);
                            if (response.body.code == 200) {
                                res.redirect('/login');
                            }
                            else{
                                res.send("Signup not successful");
                            }
                        }
                    );
                    
                }
            });
        }
    });
    
});

app.get("/home", function(req, response){
    response.render('home')
});

app.get('/getSearchVideos', async function(req, res){
    
    if(!client){
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect();
    }
    var randomJavaInstance = "";
    await client.getChildren('/zeus/java',function(error, data){
        if(error){
            console.log("error");
        }else{
            randomJavaInstance = data[Math.floor(Math.random()*data.length)];        
            var tmp = '/zeus/java/'+randomJavaInstance;
            client.getData(tmp, function(error, data){
                if(error){
                    console.log("error getting data from zoo");
                }else{
                    randomJavaInstance = data.toString('utf8');
                    var urljava2='http://'+randomJavaInstance+'/search/v1/';
                    console.log(urljava2 + req.query.data);
                    request({
                        method: 'GET',
                        // url: 'http://localhost:8090/search/v1/'+req.query.data
                        url: urljava2 + req.query.data
                    }, function (err, resp) {
                        if (err) return console.error(err.message);
                    
                        // console.log(resp.body);
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        res.setHeader('Content-Type', 'application/json');
                        // console.log(JSON.stringify(resp.body));
                        res.send(JSON.stringify(resp.body));
                    });

                }
            });
        }
    });

    
}); 

app.get('/getVideos',async function(req, res){
    
    console.log("Testing Python")

    if(!client){
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect();
    }
    var randomPythonInstance = "";
    await client.getChildren('/zeus/python',function(error, data){
        if(error){
            console.log("error");
        }else{
            randomPythonInstance = data[Math.floor(Math.random()*data.length)];        
            var tmp = '/zeus/python/'+randomPythonInstance;
            client.getData(tmp, function(error, data){
                if(error){
                    console.log("error getting data from zoo");
                }else{
                    randomPythonInstance = data.toString('utf8');
                    var urlpython='http://'+randomPythonInstance+'/getVideos';
                    console.log(urlpython);
                    request({
                        method: 'GET',
                        // url: 'http://localhost:4000/getVideos',
                        url: urlpython,
                    }, function (err, resp) {
                        if (err) return console.error(err.message);
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(resp.body));
                    });
                }
            });
        }
    });
    
}); 

app.get('/playVideo',function(req, res){
    return res.render('playvideo',{ url: req.query.url}); 
}); 

app.get('/getRecommendations',async function(req, res){
    
    console.log("Testing Python for recommendations")

    if(!client){
        console.log("Zookeeper connection code");
        client = zk.createClient(url, {retries: 2})  // Connect ZK
        client.connect();
    }
    var randomPythonInstance = "";
    await client.getChildren('/zeus/python',function(error, data){
        if(error){
            console.log("error");
        }else{
            randomPythonInstance = data[Math.floor(Math.random()*data.length)];        
            var tmp = '/zeus/python/'+randomPythonInstance;
            client.getData(tmp, function(error, data){
                if(error){
                    console.log("error getting data from zoo");
                }else{
                    randomPythonInstance = data.toString('utf8');
                    var urlpython='http://'+randomPythonInstance+'/getRecommendations';
                    console.log(urlpython);
                    request({
                        method: 'GET',
                        // url: 'http://localhost:4000/getRecommendations',
                        url: urlpython,
                    }, function (err, resp) {
                        if (err) return console.error(err.message);
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        res.setHeader('Content-Type', 'application/json');
                        // console.log(JSON.stringify(resp.body))
                        res.send(JSON.stringify(resp.body));
                    });
                }
            });
        }
    });
    
});

module.exports = app;