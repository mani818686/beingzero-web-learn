const express = require('express');
const app = express();
const db=require('./backend/db/dbconnect');
//const apiroutes=require("./apiroutes");
const userLib=require('./backend/lib/user');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
db.connect();

app.use(express.static(__dirname+"/frontend"))

app.get("/", function(req, res){
    res.send("<h1>Welcome to HomePage</h1>");
})
app.get('/api/user',function(req,res){
    userLib.getAllUsers(function(err,userobj)
    {
        res.json(userobj);
    })
});
app.get('/api/user/:id',function(req,res){
    userLib.getItemById(req.params.id,function(err,userobj)
    {
        res.json(userobj);
    })
});
app.patch('/api/user/:id',function(req,res){
    req.body.age=parseInt(req.body.age);
    console.log(req.body,req.params)
    userLib.updateItemById(req.params.id,req.body,function(err,userobj)
    {   //console.log(err,userobj);
        res.json(userobj);
    })
});
app.delete('/api/user/:id',function(req,res){
    userLib.deleteItemById(req.params.id,function(err,userobj)
    {  
        res.json(userobj);
    })
});
app.post('/api/user', function(req, res){
    userLib.createUser(req.body);
    res.redirect("/users");
});

app.get("/:name", function(req, res){
    res.sendFile(__dirname +"/frontend/html/"+req.params.name+".html");
})
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})
