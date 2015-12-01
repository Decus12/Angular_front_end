//Here we create our main module. First argument is the name of the module, the second one
//the '[] array' contains the dependancies to other angular modules
var main_module = angular.module('main_module',['ngRoute']);


//Create basic configuration for our angular app.
//Configuration includes USUAllY a router for our views.
main_module.config(function($routeProvider){

                   
      $routeProvider.when('/',{
        templateUrl:'partial_login.html',
        controller:'controllerlogin'
        });             
});