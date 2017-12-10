const exec = require('child_process').exec;
function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
}

module.exports = function(callback) {
    execute('git config --global user.name', name => {
        execute('git config --global user.email', email => {
            callback({
                name: name.replace('\n', ''),
                email: email.replace('\n', ''),
            });
        });
    });
};
