var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');

//define connection attributes fo mysql server
var connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'friends_schema',
    multipleStatements: true

});

//connect to mysql server wit given connection attributes
connection.connect(function(err){

if(err){
    console.log('could not connect' + err.message);
}else{
    console.log ('connected to mysql server database friends_schema');
}


});

//call this function to check username and password from mysql database
exports.loginMysql = function(req,res){

    connection.query('select * from where username=? and pass=?',
                    [req.body.username,req.body.password],function(error,results,fields){
        
        console.log(error);
        console.log(results);
        console.log(fields);
    });
}

exports.loginMysqlProc = function(req,res){

    connection.query('call getLoginInfo(?,?)',[req.body.username,req.body.password],
                    function(error,results,fields){
        
        if(error){
        
            res.send(502,{status:error.message});
        }else{
            var test = results[0];
            if(test.length > 0){
                
                req.session.kayttaja = test[0].username;
                req.session.userid = test[0].user_id;
                
                var token = jwt.sign(results,server.secret,{expiresIn:'2h'});
                res.send(200,{status:"ok",secret:token});
            }else{
                res.send(401,{status:"wrong username or password"});
        }
        }
    });
}

exports.getFriendsForUserByUsername = function(req,res){

    connection.query('call getAllFriendsbyName(?)',
        [req.session.kayttaja],function(error,results,fields){
        
        if(results.length > 0){
           var data = results[0];
            
        res.send(data);
        }else{
        res.redirect('/');
        }
        //console.log(results);
    });
}

exports.registerUser = function(req,res){
    
    connection.query('insert into user(username,pass) values(?,?)',
    //connection.query('call registerUser(?,?)',
                    [req.body.username,req.body.password],
                    function(error,results,fields){
    //var friend = new db.Friends(req.body);
    //friend.save(function(err)
        
        if(error){
            
            res.status(500).send({status:"Username already in use"});
        }
        else{
            res.status(200).send({status:"Ok"});
        }
    });
}

exports.addNewFriend = function(req,res){

    connection.query('call addNewFriend(?,?,?,?)',
                    [req.body.name,req.body.address,req.body.age,req.session.userid],
                    function(error,result,fields){
            if(error){
                
                res.status(500).json({message:'Fail'});
            }else{
                
                res.status(200).json({data:result});
            }
    });
}

exports.updateFriend = function(req,res){

    connection.query('update friend set name=?, address=?, age=? where _id = ?',
                    [req.body.name,req.body.address,req.body.age,req.body.id],
                    function(error,results,fields){
                            if(error){
            
            res.status(500).send({status:"Failed to update"});
        }
        else{
            res.status(200).send({status:"Ok"});
        }
    });

}

