const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


// datbases
const db = require("./database/index");
const sesionModel = require("./database/models/sessionReg")

db.start();

// middleware
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(session({
    secret: "this is secreat"
}));





app.get('/', (req, res) => {
    if(req.session.isAuth)
    res.sendFile(__dirname + '/public/admin.html');
    else
    res.sendFile(__dirname + '/public/login.html');
    
})

app.post('/login', (req, res) => {
    console.log(req.body.userId);
    if (req.body.userId === 'pkm181020@gmail.com' && req.body.pwd === '123') {
        req.session.isAuth= true;
        res.sendFile(__dirname + '/public/admin.html');
    } else if (req.body.userId === 'user' && req.body.pwd === '123') {
        res.sendFile(__dirname + '/public/user.html');
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.post("/admin", (req, res) => {
    console.log(req.body);
    const SpeakerName = req.body.SpeakerName;
    const SpeakerEmail = req.body.SpeakerEmail;
    const SessionDate = req.body.SessionDate;
    const SessionTime = req.body.SessionTime;
    const HallNo = req.body.HallNo;
    const SessionTitle = req.body.SessionTitle;
    const SessionDesc = req.body.SessionDesc;

    sesionModel.create({
        SpeakerName : SpeakerName,
        SpeakerEmail : SpeakerEmail,
        SessionDate : SessionDate,
        SessionTime : SessionTime,
        HallNo : HallNo,
        SessionTitle : SessionTitle,
        SessionDesc : SessionDesc
    }).then((data)=>{
        console.log(data);
        res.sendFile(__dirname + '/public/admin.html');
    }).catch((err)=>{
        console.log(err);
    })

})

app.get("/showSession",(req,res)=>{
    sesionModel.find({}).then((data)=>{
        data.forEach((d)=>{
            console.log(d);
        })
        res.send(data);
        // console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
})



app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
})
app.listen(3000, function () {
    console.log("server started");
})
