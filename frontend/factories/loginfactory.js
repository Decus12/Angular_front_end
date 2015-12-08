main_module.factory('factorylogin',function($resource){


    var factory = {};
    
    //this function can be called from ANY controller using this factory
    //implementation
    factory.startLogin = function(data){
        
        console.log(data);
        //Create a resource for context '/friends/login'
        var req = $resource('/friends/login',{},{'post':{method:'POST'}});
        //use POST method to send the username and password to above context
        //note that we return an promise object from here
        return req.post(data).$promise;
    
    }
    
    factory.StartRegister = function(data){
    
        var req = $resource('/friends/register',{},{'post':{method:'POST'}});

        return req.post(data).$promise;
    }
    
    //factory must always return an abject!!!
    
    return factory;
});