var util = require('util')
	, _ = require('underscore')
	, log = require('nlogger').logger(module)
	, should = require('should')
	, config = require('./../lib/config')
	, meetup = new (require('./../lib/controllers/meetup'))({
		key : config.MEETUP.KEY
	})

describe('Meetup',function(){
	var group;
	describe('#getGroup',function(){
		it('should get the group meta data associated with a particular group' +
		' url-name', function(done){
			meetup.getGroup('Pittsburgh-Node-js',function(err,group_){
				should.not.exist(err);
				should.exist(group_);
				group = group_;
				done();
			});
		});
	});
	describe('#getMembers',function(){
		it('should get the members of the meetup group', function(done){
			meetup.getMembers(group,function(err,members){
				should.not.exist(err);
				should.exist(members);
				// log.debug('number of members: '+members.length);
				// _.each(members,function(m){
				// 	log.debug(m);
				// });
				done();
			});
		});
	});
});