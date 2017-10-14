
var express = require('express');
var app = express();

app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", function (req, res) {
  let time = req.params.time;
  
  // Try to create a date with time param
  let date = new Date(time);
  
  // Check if time is a valid number
  // if so, treat it as a Unix timestamp
  // by setting date to Unix epoch
  // and adding the seconds since
  if ( !isNaN(new Number(time)) ) {
    date = new Date(0);
    date.setUTCSeconds(time);
  }
  
  // If we were given invalid input, bail out
  if ( isNaN(date) ) {
    res.json({ unix: null, natural: null });
  }
  
  // Format output and send response
  const unix = Math.floor(date.getTime() / 1000);
  const month = date.toLocaleString('en-us', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  const natural = `${month} ${day}, ${year}`;
  
  res.json({ unix, natural });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
