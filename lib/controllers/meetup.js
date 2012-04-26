
var _ = require('underscore')
	, request = require('request')
	, log = require('nlogger').logger(module)
	, endPoint = "https://api.meetup.com/"

function MeetupController(opts){
	_.extend(this,opts);
}

MeetupController.prototype.getMembers = function(group,cb){
    var group_id;
	if(typeof(group==='object')) var group_id = group.id;
	else var group_id = group;
	request.get({
		url : endPoint + 'members'
		, qs : {
			key : this.key
			, sign : true
			, group_id : group_id
		}
		, json : true
	}, function(err,res,apiRes){
		if(err) return cb(err);
		if(!apiRes || !apiRes.results)
			return cb(null,null);
		return cb(null,apiRes.results);
	});
}

MeetupController.prototype.getGroup = function(groupURLName,cb){
	request.get({ // make an HTTP GET request
		url : endPoint + 'groups'
		, qs : { // url query parameters
			key : this.key
			, sign : true
			, group_urlname : groupURLName
			, age : 20
		}
		, json : true // parse the response as JSON
	}, function(err,res,apiRes){
		if(err) return cb(err);
		// only return the first group found
		// TODO: handle exceded rate limit
		if(!apiRes || !apiRes.results || apiRes.results.length===0){
			log.warn(apiRes);
			log.warn(res.statusCode);
			return cb(null,null); // no group found
		}
		return cb(null,apiRes.results[0]);
	});
}

module.exports = MeetupController;