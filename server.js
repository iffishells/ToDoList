const express = require('express');
const BodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const app = express();


const member_list = []

//serving the static file

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.static("public"))
//for the middle ware
app.use(BodyParser.urlencoded({extended : true}));

//for the ejs engine
app.set('views',path.join(__dirname , "views"))
app.set('view engine' , 'ejs')

app.get('/', function (req, res) {
  res.render('index.ejs')
});


app.post("/" , function(req , resp)
{
    console.log("root post method");
    console.log(req.body);
});


app.get('/contact', function (req, res) {
  res.render("contact.ejs")
});


app.post("/contact" , function(req, resp)
{
  const members = {
    username  : req.body.username,
    email: req.body.email ,
    password : req.body.password
  }
  member_list.push(members)
  resp.redirect("/")

});


app.listen(3000,function(req ,resp)
{
  console.log("your server is listen at 3000 port")
})
