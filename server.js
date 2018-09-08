var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')
var mongo = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017';

app.set('views',__dirname+'/views');  //For dynamic view generation
app.set("view engine","jade");


app.use("/",function(req,res,next){ //Just for debugging process
  console.log(req.url);
  next();
});

app.use(express.static(path.join(__dirname, "Resources")));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.get('/',function(req,res){  //Initial root function
  fs.readFile('index.html',function(err,data){
    if(err)
      console.log(err);
    else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      }
  });
});




app.get('/add',function(req,res){ //Function to display input form
  fs.readFile('add.html',function(err,data){
    if(err)
      console.log(err);
    else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
    });
  });


app.post('/insert',function(req,res,next){  //Function that does the insertion
  var user = {
    eid: req.body.eid,
    name: req.body.name,
    des: req.body.des,
    man: req.body.man
  };
    mongo.connect(url,{ useNewUrlParser: true },function(err,client){
      assert.equal(null,err);
        const db = client.db('mydatabase');
      db.collection('users').insertOne(user,function(err,res){
        assert.equal(null,err);
      console.log("inserted");
      client.close();
      });

    });
res.redirect('/add');
});


app.get('/list',function(req,res,next){ //Function to display data as a list
    var result = [];
    mongo.connect(url,{ useNewUrlParser: true },function(err,client){
      assert.equal(null,err);
      const db = client.db('mydatabase');
      var cursor = db.collection('users').find();
      cursor.forEach(function(doc,err){
      assert.equal(null,err);
      result.push(doc);
      },function(){
        client.close();
        res.render('listview',{users:result});

      });
    });
});

app.get('/table',function(req,res,next){  //Function to display data as  table
    var result = [];
    mongo.connect(url,{ useNewUrlParser: true },function(err,client){
      assert.equal(null,err);
      const db = client.db('mydatabase');
      var cursor = db.collection('users').find();
      cursor.forEach(function(doc,err){
      assert.equal(null,err);
      result.push(doc);
      },function(){
        client.close();
        res.render('tableview',{users:result});

      });
    });
});

app.listen(3030,function(){console.log("App running on http://localhost:3030");});
