const mongoose=require('mongoose');

module.exports={
    connect : function(){
        var optionsJSON = {   useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true };
        var connection_string="mongodb+srv://dbuser:dbuser@cluster0.vsbgp.mongodb.net/users?retryWrites=true&w=majority" || process.env.connection_string;
        mongoose.connect(connection_string, optionsJSON);
        var connectionObj = mongoose.connection;
        connectionObj.on('connected', function(){
            console.log("CONNECTED TO DB");
        })
        connectionObj.on('disconnected', function(){
            console.log("DISCONNECTED FROM DB");
        })

        connectionObj.on('error', function(err){
            console.log("ERROR: "+err);
        })
    },
    disconnect : function(){
        mongoose.disconnect();   
    }
}