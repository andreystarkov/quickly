/* global variables */

var isAuth = "0";
var userSMSCode = Cookies.get('code');
var userToken = Cookies.get('token');
var userPhone = Cookies.get('phone');
var serverUrl = 'http://176.112.201.81';
var imageBaseUrl = 'http://176.112.201.81/static/cdn';
if( userToken !== undefined ){
    isAuth = 1;
}