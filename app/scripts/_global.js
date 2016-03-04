/* global variables */

var cuisinesList;
var isAuth;

var userSMSCode = Cookies.get('code');
var userToken = Cookies.get('token');
var userPhone = Cookies.get('phone');
var serverUrl = 'http://176.112.201.81';
var imageBaseUrl = 'http://176.112.201.81/static/cdn';

if( userToken !== undefined ){
    isAuth = 1;
}