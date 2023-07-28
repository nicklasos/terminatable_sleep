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
        await closeConnection();

        console.log('Connection closed');
    }
});

(async () => {

    while (true) {

        console.log('Working...');

        await terminatableSleep(15000, terminator.onTerminate);

        if (terminator.isTerminating()) {
            console.log('break');
            break;
        }
    }
})();
