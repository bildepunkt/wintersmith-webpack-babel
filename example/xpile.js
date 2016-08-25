
var webpack = require("webpack");
var fs = require("fs");
var path = require("path");

(function (filePath, callback) {
    var xpiled;

    webpack({
        entry: filePath,
        output: {
            path: './scripts',
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }]
        }
    }, function(err, stats) {
        if (err) {
            throw err;
        }

        callback(
            fs.readFileSync(path.resolve("scripts", "bundle.js"), "utf8")
        );
    });
}());
