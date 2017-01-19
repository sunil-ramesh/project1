var mongoose = require('mongoose');

var genreSchema = mongoose.Schema({
	name:{ 
		type : String,
		default : "def_here"
	}
		// required :true
})


var Genre = module.exports = mongoose.model('Genre',genreSchema)


module.exports.getGenres = function(callback,limit){
	
	Genre.find(callback).limit(limit);
}

module.exports.getGenreById = function(id,callback){
	Genre.findById(id,callback);
}

module.exports.addGenre =function(genre,callback){
	Genre.create(genre,callback);
} 

module.exports.updateGenre = function(id,genre,option,callback){
	var query = {_id : id}
   
   var update = {
     name : genre.name
   }
	Genre.findOneAndUpdate(query,update,option,callback);
}