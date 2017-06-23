var fs = require('fs');

var myFile = 'input.txt';

fs.readFile(myFile, function(err, txt){
	if (err) return console.error(err);
	txt = txt + "\n Appended Something!!!!";

	fs.writeFile(myFile, txt, function(err){
		if (err) return console.error(err);
		console.log('Text is appended');
		fs.readFile(myFile, function(err, data){
			if(err) return console.error(err);
			console.log(data.toString());
		});

	});
});
