const express = require('express');
const BodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const mysql = require("mysql");
const { SlowBuffer } = require('buffer');
const { createConnection } = require('net');
const { query } = require('express');
const app = express();



// DataBase Connection

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'murti123',
    database: "todolist"
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
app.set('view engine', 'ejs')



app.get('/', function(req, res) {
    res.render('index')
});


app.post("/", function(req, resp) {
    const UserEmail = req.body.email;
    const UserPassword = req.body.password


    connection.query('SELECT Emails , password FROM Password_member_of_todalist WHERE Emails  = ? and password = ? ', [UserEmail, UserPassword],
        function(error, rows, fields) {

            if (error) throw error;
            console.log(rows[0].Emails);
            // resp.send(rows[0].Emails)
            if (rows[0].Emails === UserEmail && rows[0].password === UserPassword) {
                console.log("you logged into todolist")
                resp.redirect("/todolist")
            } else {
                resp.render("/")
                console.log("sorry you cant be logged");
            }
        })



});



app.get('/contact', function(req, res) {
    res.render("contact.ejs")
});



app.post("/contact", function(req, resp) {

    members = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }


    var query = "INSERT INTO registered_person(FirstName , LastName ,email ,pass) VALUES( ? , ? , ? , ?)";
    var object = [members.name, members.email, members.password];

    var sqlstring = " INSERT INTO Password_member_of_todalist(  user_name, Emails, password) VALUES(  ? , ? , ?)";
    connection.query(sqlstring, object,
        function(error, results, fields) {
            if (error) throw error;
            // console.log("the solution is ", results[0].solution)
        });

    // member_list.push(members) m
    resp.redirect("/contact")

});



app.get('/todolist', function(req, res) {
    // console.log("todolist get has been called")
    res.render("todolist", {
        newitem: adding_task_list
    });


});

app.post('/todolist', function(req, resp) {
    console.log("todolist post has been called")

    // const tasksComing_Form_user = req.body.set_items
    adding_task_list.push(req.body.set_items)
        // var sqlString = "INSERT INTO Add_Taks (tasks) VALUES (?)"
        // var taskObject = [tasksComing_Form_user]

    // connection.query(sqlString, taskObject, function(error, rows, fields) {
    //     if (error) throw error;
    //     console.log(rows)
    // })

    console.log(adding_task_list);
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