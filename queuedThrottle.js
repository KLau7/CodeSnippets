// queued throttle function
// similar to lodash throttle
// but will save the last function called
// and invoke after timeout

const queuedThrottle = (fn, timeout = 500) => {
    var queue = null;   // named queue but only stores one function call
    var timer = null;
        
    // using functional programming so all throttled function calls use the same queue and timer
    return function () {
        if (!timer) {
            fn(...arguments);   // invoke function
            timer = setTimeout(() => {  // start cool down
                // invoke queued up function if exist
                queue && queue(...arguments);
                // reset timer and clear queue
                timer = null;
                queue = null;
            }, timeout);
        }else {
            // use functional programming to store function call with arguments
            queue = () => {
                fn(...arguments);
            }
        }
    }
}

// example use case

const logger = (msg) => {
    console.log(msg);
}

const eventHandler = () => {
    logger('example');
}

window.addEventListener('scroll', queuedThrottle(eventHandler, 200));