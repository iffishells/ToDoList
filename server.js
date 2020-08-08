const express = require('express');
const BodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

//serving the static file
app.use(express.static("public"))

//for the middle ware
app.use(BodyParser.urlencoded({extended : true}));

//for the ejs engine
app.set('view engine' , 'ejs')

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000,function(req ,resp)
{
  console.log("your server is listen at 3000 port")
})
