require(['./config'], function() {
    require(['app/main'], function(app) {
        // If the module is a function, execute it...
        // Otherwise do nothing
        if (typeof app === 'function') {
            app();
        }
    });
});
