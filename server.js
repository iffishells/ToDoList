const express = require('express');
const BodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const mysql = require("mysql");
const { SlowBuffer } = require('buffer');
const { createConnection } = require('net');
const app = express();



// DataBase Connection 

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'murti123' ///
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});








// Varible defineds


const adding_task_list = []
const member_list = []

console.log(member_list);

//serving the static file

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"))


//for the middle ware
app.use(BodyParser.urlencoded({ extended: true }));



//for the ejs engine
app.set('views', path.join(__dirname, "views"))
    //  app.set('view engine', 'ejs')



app.get('/', function(req, res) {
    res.render('index')
});


app.post("/", function(req, resp) {
    const UserName = req.body.email
    const password = req.body.password

    for (let i = 0; i < member_list.length; i++) {
        S
        if (UserName === member_list[i].email && password === member_list[i].password) {
            console.log("in checking password ... ....");
            resp.redirect("/todolist")

        } else {
            resp.render("/")
        }
    }


});



app.get('/contact', function(req, res) {
    res.render("contact.ejs")
});




app.post("/contact", function(req, resp) {
    const members = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    member_list.push(members)
    resp.redirect("/")

});



app.get('/todolist', function(req, res) {
    // console.log("todolist get has been called")
    res.render("todolist", {
        newitem: adding_task_list
    });


});

app.post('/todolist', function(req, resp) {
    // console.log("todolist post has been called")
    adding_task_list.push(req.body.set_items)

    console.log(req.body);
    resp.redirect("/todolist")

});

app.post("/submit", function(req, resp) {
    resp.render("submitted_task", {
        tasks: adding_task_list
    })

})

app.post("/return", function(req, resp) {
    resp.redirect("/todolist")
})


app.listen(3000, function(req, resp) {
    console.log("your server is listen at 3000 port")
})