({
    optimizeCss: 'standard',
    optimize: "uglify2",
    findNestedDependencies: true,
    preserveLicenseComments: false,
    inlineText: true,
    skipModuleInsertion: false,
    dir: "../../bin/static/js/",
    mainConfigFile: './config.js',
    pragmasOnSave: {
        useConcatenatedShims: true
    },
    paths: {
        facebook: "empty:",
        ytapi: "empty:",
        googlejs: "empty:",
        twitter: "empty:",
        youtube: "empty:"
    },
    modules: [{
        name: 'main',
    }]
})
