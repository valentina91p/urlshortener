var app = require('express')();

app.get('/',function(req,res){});
app.get('/create/:url',function(req,res){});
app.get('/:url',function(req,res){});

app.listen(process.env.PORT || 80, function(){

});