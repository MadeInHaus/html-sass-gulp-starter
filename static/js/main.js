require(['./config'], function() {
    require(['app/app'], function(app) {
        // If the module is a function, execute it...
        // Otherwise do nothing
        if (typeof app === 'function') {
            app();
        }
    });
});
