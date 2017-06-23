
var fs = require('fs');

var myFile = 'input.txt';


function showData(err, data){
	if(err) return console.error(err);
	console.log(data.toString());
}

function showMessage(err) {
	if(err) return console.error(err);
	console.log('\n Text is appended');
	fs.readFile(myFile, showData);
}

function appendToFile(err, txt) {
	if(err) return console.error(err);
	txt = txt + "Appended Something";
	fs.writeFile(myFile, txt, showMessage);
}

fs.readFile(myFile, appendToFile);