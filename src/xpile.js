
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
    callback = callback || function () {}

    webpack({
        // wintersmith plugin assumes we're in contents, webpack does not
        entry: path.resolve("contents", entry.relative),
        output: {
            path: './build/scripts',
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

        if (stats.compilation.errors.length) {
            stats.compilation.errors.forEach(function (name, e) {
                console.error("\n +-+-+ webpack compile error:", name, e, "\n");  
            });

            return;
        }
        
        var result;

        try {
            result = fs.readFileSync(path.resolve("build", "scripts", outFileName), "utf8")
        } catch (err) {
            console.error(err);
        }

        callback(result);
    });
};
