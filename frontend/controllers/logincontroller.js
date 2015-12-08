//This is the way you define contollers
//The main_module variable is defined in mainmodule.js file (located in module folder)
//The first argument is the name ogf the contoroller. THIS IS IMPORTANT, because you use THIS
//name when you want to use this controller in some view
//The $scope object is the glue between the view and controller. You use this object to transfer
//data between the view and controllers
main_module.controller('controllerlogin',function($scope, factorylogin,$location){

    //var user = $scope.user;
    //$scope.pass = "halituli"
    
    //This is called when login is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('login pressed');
        
        var temp = {
        
            username:$scope.user,
            password:$scope.pass
        }
        
         var waitPromise = factorylogin.startLogin(temp);
        //wait the response  from server
        waitPromise.then(function(data){
            $location.path('/list');
            //code inside this block will be called when success response
            //from server receives
        },function error(data){
            $('.error').text('Wrong username or password!');
        });
    }
    
     $scope.registerClicked = function(){
         
         console.log('register pressed');
        var temp = {
        
            username:$scope.user,
            password:$scope.pass
        }
         
         var response = factorylogin.StartRegister(temp);
            response.then(success,error)
    }
});

function success(data){
    alert('New user registered. You can now login');

}

function error(data){
    alert('Register person failed. Username is already in use');
}