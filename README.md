Wintersmith Webpack Babel
=========================

A Babelifying Webpack module bundler for Wintersmith. Because modules!

### Install

npm i --save wintersmith-webpack-babel

### Use

Add the plugin path in your `config.json`:

    ...
    "plugins": [
        ...
        "./node_modules/wintersmith-webpack"

Define webpack-babel options in your `config.json`:

    ...
    webpackBabel: {
        // Optionally define a filename for your bundled code. Defaults to "bundle.js"
        output: "sweetass.custom.filename.js"
    }
