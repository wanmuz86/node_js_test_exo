var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router(); 

var port = process.env.PORT || 8080;              

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/:date', function(req, res) {
	var intRegex = /^\d+$/;
	if (intRegex.test(req.params.date)){
		var naturalDate = new Date(req.params.date * 1000);
		res.json({ unix: req.params.date , natural: timeConverter(req.params.date)}); 
    } 
    else {
    	var naturalDate = new Date(req.params.date).getTime()/1000
    	res.json({ unix: req.params.date , natural: naturalDate});    	
    }
});

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
app.use(router);

app.listen(port);
console.log('Magic happens on port ' + port);