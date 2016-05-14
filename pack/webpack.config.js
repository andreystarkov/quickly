/*
* @Author: Andrey Starkov
* @Date:   2016-05-14 10:09:23
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-05-14 10:10:28
*/

module.exports = {
    entry: getEntrySources(['../app/scripts/es6/react/index.js']),
    output: {
        publicPath: 'http://localhost:8080/',
        filename: '../build/package.js'
    },
    devtool: 'eval',
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'source-map'
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'react-hot',
                    'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
                ]
            }
        ]
    }
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}