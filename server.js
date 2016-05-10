var app = require('express')();

app.get('/',function(req,res){});
app.get("/create/*", function(req,res){
	console.log(req.params[0]);
	if(/^(http|https):\/\/www\.[a-zA-Z][a-zA-Z\-]*\.[a-zA-Z]+$/.test(req.params[0]))
		res.json("Valid url.");
	else
		res.json({error:"Wrong url format, make sure you have a valid protocol and real site."});
})
app.get('/:url',function(req,res){});

app.listen(process.env.PORT || 80, function(){

});