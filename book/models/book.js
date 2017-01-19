var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	title :{
		type : String,
		required :true
	},
	description : {
		type : String
		

	}
});


var Book = module.exports = mongoose.model('Book',bookSchema)

module.exports.getBooks = function(callback,limit){
	
	Book.find(callback).limit(limit);
}

module.exports.getBookById = function(id,callback){
   Book.findById(id,callback);
}

module.exports.addBook = function(book,callback){
	Book.create(book,callback);
}

module.exports.updateBook = function(id,book,option,callback){
	var query = {_id:id}
	var update = {
		title : book.title,
		description : book.description
	}
	Book.findOneAndUpdate(query,update,option,callback);
}