/*
    Require.js config
    http://requirejs.org/docs/api.html#config
*/

requirejs.config({

    waitSeconds: 30,

    paths: {

        // Main libs
        'jquery': 'libs/jquery',
        'underscore': 'libs/lodash.underscore',
        'backbone': 'libs/backbone',

        // Main plugins
        hbs: 'libs/hbs',
        i18n: 'libs/i18n',
        i18nprecompile: 'libs/i18nprecompile',
        json2: 'libs/json2'

    },

    shim: {

    },

    hbs: {
        templateExtension: "html",
        disableI18n: true,
        disableHelpers: false
    }

});
