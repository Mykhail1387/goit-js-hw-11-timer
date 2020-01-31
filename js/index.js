'use strict';

const refs = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
    textOver: document.querySelector('.textOver'),
};

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
    }

    setInt = setInterval(() => {
        const nowDate = Date.now();
        const time = this.targetDate - nowDate;

        this.updateTimer(time);

        this.timeOver(time);
    }, 1000)

    updateTimer(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        refs.days.textContent = `${days}`;
        refs.hours.textContent = `${hours}`;
        refs.mins.textContent = `${mins}`;
        refs.secs.textContent = `${secs}`;
    }

    pad(value) {
        return String(value).padStart(2, '0')
    }

    timeOver(time) {
        if (time <= 0) {
            clearInterval(this.setInt);
            this.updateTimer(0);
            refs.textOver.textContent = 'Game over!';
        }
    }
};

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Feb 21, 2020'),
});
