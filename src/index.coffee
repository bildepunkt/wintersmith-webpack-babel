fs = require 'fs'
xpile = require './xpile'

module.exports = (env, callback) ->
    config = env.config.webpackBabel || {}
    if config.pattern?
            pattern = config.pattern
            delete config.pattern

    class WebpackPlugin extends env.ContentPlugin

        constructor: (@filepath) ->

        getFilename: ->
            @filepath.relative

        getView: -> (env, locals, contents, templates, callback) ->
            xpile @filepath, config.output, (result) ->
                callback null, new Buffer(result)

    WebpackPlugin.fromFile = (filepath, callback) ->
        fs.readFile filepath.full, (error, result) ->
            if not error?
                plugin = new WebpackPlugin filepath

            callback error, plugin

    env.registerContentPlugin 'scripts', pattern || '**/main.*(js|es|es6|jsx)', WebpackPlugin

    callback()
