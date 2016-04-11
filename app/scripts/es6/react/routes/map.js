/*
* @Author: Andrey Starkov
* @Date:   2016-04-11 15:39:11
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-11 15:53:45
*/

const prefix = '/app';

var routesMap = {
    prefix: prefix,
    routes: {
        main: {
            name: 'main',
            path: prefix+'/'
        },
        home: {
            name: 'home',
            path: prefix+'/home'
        },
        profile: {
            name: 'profile',
            path: prefix+'/profile'
        },
        list: {
            name: 'list',
            path: prefix+'/list/:cuisine'
        },
        shop: {
            name: 'shop',
            path: prefix+'/shop/:company'
        }
    },
};

module.exports = routesMap;
