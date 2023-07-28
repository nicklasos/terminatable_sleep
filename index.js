async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function terminatableSleep(ms, cb) {
    return new Promise(resolve => {
        let id = setTimeout(resolve, ms);

        let cancel = () => {
            clearTimeout(id);
            resolve();
        };

        cb(cancel);
    });
}

let isTerminating = false;
let onTerminate = () => {};

let beforeExit = async () => {};

const terminator = {
    init(params) {
        params = params || {};

        beforeExit = params.beforeExit || async function () {};

        process.on('SIGINT', async () => {
            isTerminating = true;

            await beforeExit();
            onTerminate();
        });
    },

    onTerminate(cb) {
        onTerminate = cb;
        if (terminator.isTerminating()) {
            cb();
        }
    },

    isTerminating() {
        return isTerminating;
    },
};

module.exports = {
    terminatableSleep,
    terminator,
    sleep,
}