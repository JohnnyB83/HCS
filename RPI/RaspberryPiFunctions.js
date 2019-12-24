const GPIO = require('pigpio').Gpio;

const GPIO_ACTIVE = new Gpio(2, { mode: Gpio.OUTPUT });
const GPIO_PASSIVE = new Gpio(3, { mode: Gpio.OUTPUT });

module.exports = function turnSystemOn() {
    GPIO_ACTIVE.digitalWrite(1);
    GPIO_PASSIVE.digitalWrite(0);
}

module.exports = function turnSystemOff() {
    GPIO_ACTIVE.digitalWrite(0);
    GPIO_PASSIVE.digitalWrite(0);
}