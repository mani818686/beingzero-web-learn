const express = require('express');

const app = express();

app.use(express.static(__dirname+"/frontend"))

app.get("/", function(req, res){
    res.send("<h1>Welcome to HomePage</h1>");
})

app.get("/:name", function(req, res){
    res.sendFile(__dirname +"/frontend/html/"+req.params.name+".html");
})
// Heroku will automatically set an environment variable called PORT
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})
