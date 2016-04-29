var express = require('express');
var path = require('path');
var app = express();
var compression = require('compression');

app.use(compression());
app.use(express.static(path.join(__dirname, './../')));


app.get('*', function(req,res) {
  res.sendFile(path.resolve(__dirname,'../index.html'));
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
