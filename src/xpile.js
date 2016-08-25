
var webpack = require("webpack");
var fs = require("fs");
var path = require("path");

/**
 * transpile and bundle es6 modules
 * @method xpile
 * @param  {String} entry The code's entry point
 * @param  {String} outFileName The filename to output
 * @param  {Function} callback Executes on compile complete, passing the bundle contents
 */
module.exports = function xpile (entry, outFileName, callback) {
    var xpiled;

    outFileName = outFileName || "bundle.js";

    webpack({
        entry: entry,
        output: {
            path: './contents/scripts',
            filename: outFileName,
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
        
        var result;

        try {
            result = fs.readFileSync(path.resolve("contents", "scripts", outFileName), "utf8")
        } catch (err) {
            console.error(err);
        }

        console.log(result);

        callback(result);
    });
};
