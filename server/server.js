var express = require('express');
var path = require('path');
var app = express();
var compression = require('compression');
var fs = require('fs');

app.use(compression());
app.use(express.static(path.join(__dirname, '../')));

app.get('/static/:id', function(req, res) {
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

app.get('/js/manifest.json', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.resolve(__dirname,'../js/manifest.json'));
});

app.get('/storelocator', function(req,res) {
  res.sendFile(path.resolve(__dirname,'../StoreLocator.html'));
});

app.get(/^\/(\*|products\/*|product\/*|search\/*|video)/, function(req,res) {
  res.sendFile(path.resolve(__dirname,'../index.html'));
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
