
var log = require('nlogger').logger(module)
	, config = require('./../config')
	, meetup = new (require('./../controllers/meetup'))({
	key : config.MEETUP.KEY
})

module.exports = function(app){
	app.get('/', function(req,res,next){
		log.debug('looking for greoup: '+config.MEETUP.GROUP.URL);
		var groupUrlName = config.MEETUP.GROUP.URL;
		meetup.getGroup(groupUrlName,function(err,group){
			if(err) return next(err);
			if(!group) return next(new Error('No group was found with url name: '+groupUrlName));
			meetup.getMembers(group,function(err,members){
				if(err) return next(err);
				// var members = [
				// 	{
				// 		photo_url : 'http://photos4.meetupstatic.com/photos/member/9/7/a/c/thumb_7058828.jpeg'
				// 		, name : 'Vicapow'
				// 	}
				// ];
				res.render('home',{
					members : members
				});
			});
		});
	});
}