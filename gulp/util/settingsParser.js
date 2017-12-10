const _ = require('lodash');

const envs = ['development', 'qa', 'staging', 'production'];

module.exports = function(settings, defaultObj) {
    const new_settings = {};
    _.each(envs, env => {
        const env_settings = settings[env] || {};
        const new_setting = {};
        new_settings[env] = _.merge(
            new_setting,
            defaultObj || {},
            settings.default,
            env_settings
        );
    });

    console.log('new settings:\n', new_settings, '\n');

    return new_settings;
};
