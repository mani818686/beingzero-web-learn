const usermodel=require('../models/usermodel');
module.exports = {
    createUser: function(userObject){
        var user = new usermodel(userObject);
        user.save()
    },
    getAllUsers : function(cb){
        usermodel.find({}, function(err, allUsers){
            cb(err, allUsers);
        });
    },
    getItemById :function(id,cb) {
    usermodel.findById(id, function(err, singleDBItem) {
        cb(err, singleDBItem);
    });
    },
    updateItemById :function(id,updateOps,cb)
    {
        usermodel.updateOne({_id:id},{ $set: updateOps },(err, itemDetails) => {
            if (err) console.log('ERROR: ' + err);
            cb(err, itemDetails);
        });
    },
    deleteItemById:function(id,cb)
    {
        usermodel.deleteOne({_id:id},(err, itemDetails) => {
            cb(err, itemDetails);
        })
    }
}