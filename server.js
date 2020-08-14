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

const task_list = []
// app.get('/', function (req, res) {
//   res.render('index.ejs')
// });


// app.post("/" , function(req , resp)
// {
//     const UserName = req.body.email
//     const password = req.body.password
//
//     for (let i = 0; i < member_list.length; i++) {
//       console.log("hellow ballah!");
//       if (UserName == member_list[i].email && password == member_list[i].password  ) {
//         resp.send("Connected Succcessfully")
//       }
//       else {
//         resp.send("Your Password/Emails are Wrong! ")
//       }
//     }
//     resp.render("todolist.ejs")
//
// });


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

app.get('/', function (req, res) {
  res.render("todolist.ejs",{
    newitem : task_list
  })
});

app.post('/', function (req, resp) {

  task_list.push(req.body.set_items)
  resp.redirect("/")
});



app.listen(3000,function(req ,resp)
{
  console.log("your server is listen at 3000 port")
})
