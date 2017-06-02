const express = require('express')
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/Public'));
app.set('views',path.join(__dirname,'Views'));
app.set('view engine', 'pug');
app.get('/',function(req,res){
  res.render('index.pug',{});
});
app.get('/:time', function (req, res) {
    var timereq = req.params.time;
    var dateobj = '';
    if(isNaN(timereq))
      dateobj = new Date(timereq);
    else {
      timereq = parseInt(timereq);
      dateobj = new Date(timereq);
    }
    var retObj = {
      "unix-timestamp":+dateobj,
      "natural time":dateobj.toDateString()
    };
    if(dateobj.toDateString() == "Invalid Date")
    {
      var retObj = {
        "unix-timestamp":"null",
        "natural time":"null"
      };
    }
    res.setHeader('Content-type','application/json');
    res.json(retObj);
    //res.send(""+(+dateobj));
});
app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});
