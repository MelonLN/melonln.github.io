var startDate = new Date('2024-02-06T21:00:00');

function updateCountdown() {
    var now = new Date();
    var difference = now - startDate;

    var days = Math.floor(difference / (1000 * 60 * 60 * 24));

    var hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    var daysText = (days < 2) ? 'day' : 'days';

    document.getElementById('countdown').innerHTML = 'Experience: ' + days + ' ' + daysText + ', ' + hours + ' hours.';
}

setInterval(updateCountdown, 1000);

updateCountdown();
