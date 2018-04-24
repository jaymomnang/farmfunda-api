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

//internally generated numbers for attendance records.
exports.getNewID = function (currentID, prefix) {
    var pos = Number(currentID.substring(3, 10)) + 1;
    var l = pos.toString().length;
    var nxt = prefix;

    for (var i = 0; i + l < 7; i++) {
        nxt = nxt + "0";
    }

    return nxt + pos.toString();
};
