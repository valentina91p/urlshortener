var app = require('express')();
var mongoose = require('mongoose');
var tokengen = require('rand-token');

mongoose.connect('mongodb://127.0.0.1/urlshortener');

var urlSchema = mongoose.Schema({
	token: String,
	original: String
});

var Url = mongoose.model('Url', urlSchema);

app.get('/',function(req,res){
	res.sendFile('index.html', {root:__dirname});
});

app.get("/create/*", function(req,res){
	if(/^(http|https):\/\/www\.[a-zA-Z][a-zA-Z\-]*\.[a-zA-Z]+$/.test(req.params[0])){
		var new_token = tokengen.generate(4);
		var entry = new Url({token: new_token, original: req.params[0]});
		entry.save(function(err){
			if(err){
				res.json({error: err});	
			}else{
				res.json({original_url: entry.original, short_url: entry.token});
			}
		});
	}else
		res.json({error:"Wrong url format, make sure you have a valid protocol and real site."});
})
app.get('/:url',function(req,res){
	Url.find({token: req.params.url}, function(err, url){
		if(err){
			res.json({error: err});
		}else{
			res.redirect(url[0].original);
		}
	});
});

app.listen(process.env.PORT || 80, function(){

});