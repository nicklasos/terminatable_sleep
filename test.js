const {terminator, terminatableSleep} = require("./index");

function closeConnection() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Close connection');
            resolve();
        }, 500);
    });
}

terminator.init({
    beforeExit: async () => {
        console.log('Before exit');

        await closeConnection();

        console.log('Connection closed');
    }
});

(async () => {

    while (true) {

        console.log('Working...');

        await terminatableSleep(4000, terminator.onTerminate);

        if (terminator.isTerminating()) {
            break;
        }
    }

})();
