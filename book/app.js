var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var multer  = require('multer');
mongoose.connect("mongodb://localhost/book");
var db = mongoose.connection;
Genre = require('./models/genre')

Book = require('./models/book');
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get('/new',function(req,res){
	
	var genre = new Genre()

	res.render("new.ejs",{genre:genre});
})

app.get('/api/genres',function(req,res){

	Genre.getGenres(function(err,genre){
		
		if(err)
		{
			throw err;
		}
		
		res.json(genre)
	});
});


app.get('/api/genres/:_id',function(req,res){

	Genre.getGenreById(req.params._id,function(err,genre){
		if (err) {
			throw err;
		}
		res.json(genre);


	});
});


app.get('/api/books',function(req,res){

	Book.getBooks(function(err,books){
		
		if(err)
		{
			throw err;
		}
		
		res.json(books)
	});
});  

app.get('/api/books/:_id',function(req,res){

	Book.getBookById(req.params._id,function(err,book){
		
		if(err)
		{
			throw err;
		}
		
		res.json(book)
	});
});

// app.post('/api/genres',function(req,res){
// 	var genre = req.body;
//  Genre.addGenre(genre,function(err,genre){
//  	if (err) {
//  		throw err;
//  	}
//  	res.json(genre)
//  });

// });
// *******************************************************************

app.post('/api/genres',function(req,res){

	
	var genre = req.body;

	Genre.create(genre,function(err,result){
		if (err) {
			throw err;
		}
	
		res.json(result);

	})

})

// app.post('/api/genres/_id',function(req,res){
// 	debugger;
// 	var genre = req.body;

// 	Genre.create(genre,function(err,result){
// 		if (err) {
// 			throw err;
// 		}
	
// 		res.redirect('/new');

// 	})

// })
// app.get('/index',function(req,res){
//  Genre.getGenres(function(err,genre){
//  	if (err) {
//  		throw err;
//  	}
//  	res.render('index',{lists:genre})
//  })
	
// });

// app.get('/show/:_id',function(req,res){
// 	Genre.getGenreById(req.params._id,function(err,genre){
// 		if (err) {
// 			throw err;
// 		}

//   res.render('show',{show:genre})

// 	})

// })

app.get('/edit/:_id',function(req,res){

	Genre.getGenreById(req.params._id,function(err,genre){
		if (err) {
			throw err;
		}
  
		res.render('edit',{edit:genre});
	})
	
})

app.put('/genres/:_id',function(req,res){	
	var id = req.params._id;

	var genre = req.body;
	Genre.updateGenre(id,genre,{},function(err,genre){
		if (err) {
			throw err;
		}
		res.json(genre);
	})
})

app.post('/api/books',function(req,res){
	var book = req.body;
	Book.addBook(book,function(err,book){
		if (err) {
			throw err;
		}
		res.json(book)

	});

});

app.put('/api/books/:_id',function(req,res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id,book,{},function(err,book){
		if (err) {
			throw err;
		}
		res.json(book)
	})
})


app.listen(3000,function(){

})