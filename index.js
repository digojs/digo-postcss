var postcss = require("postcss");

module.exports = function PostCSS(file, options, done) {

    // 设置默认值。
    options = Object.assign({
        processors: [],
        from: file.srcPath,
        to: file.srcPath,
        map: file.sourceMap && {
            prev: file.sourceMapData,
            from: file.srcPath,
            annotation: false
        }
    }, options);

    // 生成。
    postcss(options.processors).process(file.content, options).then(function(result) {
        var warnings = result.warnings();
        if (warnings.length) {
            for (var i = 0; i < warnings.length; i++) {
                file.warning({
                    name: PostCSS.name + (warnings[i].plugin ? "/" + warnings[i].plugin : ""),
                    message: warnings[i].text,
                    line: warnings[i].line - 1,
                    column: warnings[i].column - 1,
                });
            }
        }

        // 保存。
        file.content = result.css;
        if (result.map) {
            file.sourceMapData = result.map;
        }
    }, function(error) {
        file.error({
            name: PostCSS.name + (error.plugin ? "/" + error.plugin : ""),
            message: error.text,
            line: error.line - 1,
            column: error.column - 1,
        });
    }).then(done, done);

};
