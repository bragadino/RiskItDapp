const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
var app = express();

app.use(express.static(_dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, 'index.html'));
});
app.listen(port);
console.log("Server started");
