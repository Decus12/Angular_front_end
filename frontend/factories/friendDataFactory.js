main_module.factory('friendDataFactory',function($resource){

    var factory = {};
    
    //In this array we cache the friends information,
    //so that once stored in array we won't make any further request
    factory.friendsArray = [];
    
    factory.getFriendData = function(){
    
    //Check if cache is empty. If empty get the data to cache from backend

       
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            return resource.query().$promise;

    }
    
    return factory;
});