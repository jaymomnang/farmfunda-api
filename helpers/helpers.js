//push new data to the database using supplied object
exports.saveData = function(obj){
	
	return new Promise(function (resolve, reject) {

		obj.save(function(err, savedObj) {
        	if (err)
            	res.send(err);
        	resolve(savedObj);
    	});        
    });
	
}

//pull data from the database using supplied object and query parameters
exports.getObjFromDB = function(obj, params){

	return new Promise(function(resolve, reject){
		obj.find(params, function(err, res, resObj) {
        	if (err) reject(err);            
        	resolve(resObj);
    	});
	});
	
}