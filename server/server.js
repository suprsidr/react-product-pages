var express = require('express');
var path = require('path');
var app = express();
var compression = require('compression');
var fs = require('fs');

app.use(compression());
app.use(express.static(path.join(__dirname, '../')));

app.get('/static/:id', function(req, res) {
  console.log(req.params.id);
  var file = path.join(__dirname, '../content/', req.params.id, 'Default.html');
  fs.exists( file, function(exists) {
    if(exists) {
      const html = fs.readFileSync(file, 'utf-8');
      res.send(JSON.stringify(html));
    } else {
      res.send('not found');
    }
    res.end();
  });
});

app.get(/^\/(\*|products\/*|product\/*|search\/*)/, function(req,res) {
  res.sendFile(path.resolve(__dirname,'../index.html'));
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
