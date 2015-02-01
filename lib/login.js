/**
 * Created by steph on 2/1/15.
 */
var isLoggedIn = 1;
var status = "";
var link = "";

exports.link = function(){
    if(isLoggedIn){
        link = "/account";
    }
    else {
        link = "/login";
    }
    return link;
};

exports.status = function(){
    if(isLoggedIn){
        status = "Account";
    }
    else {
        status = "Sign In";
    }
    return status;
};