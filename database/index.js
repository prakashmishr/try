module.exports.start = function () {


    var mongoose = require('mongoose');
    const  url = "mongodb+srv://orca:orca@cluster0.b1zdhhl.mongodb.net/eventsDB?retryWrites=true&w=majority"
    mongoose.connect(url).then(function () {
        console.log("db is live");
    }).catch(function (err) {
        //console.log(err);
        console.log("db is not live");
    })
}