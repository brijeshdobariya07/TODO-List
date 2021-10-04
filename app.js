const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
console.log(date);
const https = require("https");
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Wake Up","Eat","Study"];
let workItems = [];

app.get("/",function (req,res) {
    let day = date.getDate();
    res.render("list",{listTitle:day,listOfItems:items});    
});

app.post("/", (req,res) => {
    let item = req.body.text1;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work",(req,res)=> {
    res.render("list",{listTitle:"Work List",listOfItems:workItems});
});

app.post("/work",(req,res) => {
    let item = req.body.text1;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",(req,res) => {
    res.render("about"); 
})


app.listen(3000, (req,res) => {
   console.log("Server running at 3000 port"); 
});
