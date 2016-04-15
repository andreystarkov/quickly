/*
* @Author: Andrey Starkov
* @Date:   2016-04-11 15:39:11
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 00:27:38
*/

const prefix = '';

var routesMap = {
    prefix: prefix,
    host: 'http://quickly.su',
    routes: {
        main: {
            name: 'main',
            path: '/'
        },
        home: {
            name: 'home',
            path: '/home'
        },
        profile: {
            name: 'profile',
            path: '/profile'
        },
        list: {
            name: 'list',
            cleanPath: '/list/',
            path: '/list/:cuisine'
        },
        shop: {
            name: 'shop',
            cleanPath: '/shop/',
            path: '/shop/:company'
        }
    },
};

module.exports = routesMap;
