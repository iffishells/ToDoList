const express = require('express');
const app = express();
const BodyParser = require('body-parser');


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000,function(req ,resp)
{
  console.log("your server is listen at 3000 port")
})
