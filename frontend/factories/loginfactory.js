main_module.factory('factorylogin',function(){


    var factory = {};
    
    //this function can be called from ANY controller using this factory
    //implementation
    factory.startLogin = function(data){
        
        console.log(data);
    
    }
    
    //factory must always return an abject!!!
    
    return factory;
});