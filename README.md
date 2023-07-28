# Terminatable sleep
Terminatable sleep for nodejs apps

Install:
```
npm i terminatable_sleep
```

How to use:
```js
const {terminator, terminatableSleep} = require("terminatable_sleep");

// example
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

        await terminatableSleep(15000, cancel => {
            // Call the cancel() function to cancel the sleep

            terminator.onTerminate(cancel);
        });

        // or just use await terminatableSleep(15000, terminator.onTerminate);
        
        if (terminator.isTerminating()) {
            break;
        }
    }

})();
```
Run your program and then hit CTRL+C
