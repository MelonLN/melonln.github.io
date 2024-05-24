//fix shadow
document.addEventListener("DOMContentLoaded", function () {
    var navItems = document.querySelectorAll("#nav2 li");
    navItems.forEach(function (navItem) {
        navItem.addEventListener("mousedown", function () {
            var img = this.querySelector("img");
            img.style.filter = "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))";
        });
        navItem.addEventListener("mouseup", function () {
            var img = this.querySelector("img");
            img.style.filter = "drop-shadow(4px 4px 0px rgb(255, 255, 255))";
        });
    });
});

//loading
function animateProgress(start, end, duration, progressElement) {
    var range = end - start;
    var current = start;
    var increment = range / (duration / 10);

    var timer = setInterval(function () {
        current += increment;
        progressElement.textContent = current.toFixed(2) + "%";
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            progressElement.textContent = end.toFixed(2) + "%";
        }
    }, 10);
}

// Create a new MutationObserver instance
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            var displayStyle = mutation.target.style.display;
            if (displayStyle === 'block') {
                var progressElement = mutation.target.querySelector('.progress');
                if (progressElement) {
                    animateProgress(0, 96.66, 2000, progressElement);
                }
                var progressElement = mutation.target.querySelector('.progress3');
                if (progressElement) {
                    animateProgress(0, 86.66, 2000, progressElement);
                }
                var progressElement = mutation.target.querySelector('.progress4');
                if (progressElement) {
                    animateProgress(0, 88.00, 2000, progressElement);
                }
                var progressElement = mutation.target.querySelector('.progress5');
                if (progressElement) {
                    animateProgress(0, 100.00, 1500, progressElement);
                }
            }
        }
    });
});

// Start observing
var targetNodes = document.querySelectorAll('.description');
targetNodes.forEach(function (targetNode) {
    observer.observe(targetNode, { attributes: true });
});


//typing
var app = document.getElementById('app');
var typewriter = new Typewriter(app, {
    delay: 35,
});
typewriter
    .pauseFor(2500)
    .typeString("Hello!, ")
    .pauseFor(1500)
    .typeString("i'm ")
    .pauseFor(500)
    .typeString("MelonLN :D")
    .pauseFor(1000)
    .start();

//typing2
const textContainers = document.querySelectorAll('.container1');

textContainers.forEach(textContainer => {
    const originalHTML = textContainer.innerHTML;
    textContainer.innerHTML = '';
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = originalHTML;

    let index = 0;
    let text = tempContainer.textContent;

    function typeEffect() {
        if (index < text.length) {
            textContainer.innerHTML = originalHTML.slice(0, index) + '<span class="cursor"></span>';
            index++;
            setTimeout(typeEffect, 50);
        } else {
            textContainer.innerHTML = originalHTML;
        }
    }

    setTimeout(typeEffect, 1500);
});

// CSS for the cursor
let style = document.createElement('style');
style.innerHTML = `
.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    50% { opacity: 0; }
}`;
document.head.appendChild(style);

//2
document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.button-content');
    var descriptions = document.querySelectorAll('.description');
    // var containers = Array.from(document.querySelectorAll('.container'));

    var isShowing = new Array(descriptions.length).fill(false);

    buttons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            var description = descriptions[index];
            // var descriptions = document.querySelectorAll('.description');
            // var containers = Array.from(document.querySelectorAll('.container'));
            descriptions.forEach(function (description) {
                description.classList.toggle("open");
            });
            if (!isShowing[index]) {
                // for (var i = index + 1; i < containers.length; i++){
                //     containers[i].classList.toggle("open");
                // }
                setTimeout(function () {
                    description.style.opacity = '1';
                    // for (var i = index + 1; i < containers.length; i++){
                    //     containers[i].classList.toggle("open");
                    // }
                }, 50);
                description.style.display = 'block';
                // // setTimeout(function() {
                //     for (var i = index + 1; i < containers.length; i++){
                //         containers[i].classList.toggle("close");
                //     }
                // // }, 50); 
                isShowing[index] = true;
            } else {
                description.style.opacity = '0';
                setTimeout(function () {
                    if (!isShowing[index]) {
                        description.style.display = 'none';
                    }
                    for (var i = index + 1; i < containers.length; i++) {
                        containers[i].classList.toggle("close");
                    }
                }, 500);
                // setTimeout(function() {
                //     for (var i = index + 1; i < containers.length; i++){
                //         containers[i].classList.toggle("close");
                //     }
                // }, 600)
                isShowing[index] = false;
            }
        });
    });
});

//
window.onload = function () {
    var containers = document.querySelectorAll(".text3, .underline");
    containers.forEach(function (container) {
        container.style.animation = "fall-motion3 2s";

        container.addEventListener("animationend", function () {
            container.style.animation = "";
        });
    });
};

//scr
document.getElementById("slider-button").addEventListener("click", function() {
    document.getElementById("popup2").style.display = "block";
});


//
// var clickCount = 0;
// var maxClicks = 5;

// document.querySelectorAll("#slider-button, #slider-button1, #slider-button2, #slider-button3").forEach(function(button) {
//     button.addEventListener("click", function() {
//         clickCount++;

//         if (clickCount >= maxClicks && clickCount < maxClicks * 2) {
//             document.querySelector('#app').style.display = 'none';
//             document.querySelector('#app2').style.display = 'block';
//             document.querySelector('#slider-button').style.display = 'none';
//             document.querySelector('#slider-button1').style.display = 'flex';
//         }

//         if (clickCount >= maxClicks * 2 && clickCount < maxClicks * 3) {
//             document.querySelector('#app2').style.display = 'none';
//             document.querySelector('#app3').style.display = 'block';
//             document.querySelector('#slider-button1').style.display = 'none';
//             document.querySelector('#slider-button2').style.display = 'flex';
//         }

//         if (clickCount >= maxClicks * 3 && clickCount < maxClicks * 4) {
//             document.querySelector('#app3').style.display = 'none';
//             document.querySelector('#app4').style.display = 'block';
//             document.querySelector('#slider-button2').style.display = 'none';
//             document.querySelector('#slider-button3').style.display = 'flex';
//         }

//         if (clickCount >= maxClicks * 4) {
//             document.querySelector('#app').style.display = 'block';
//             document.querySelector('#app4').style.display = 'none';
//             document.querySelector('#slider-button').style.display = 'flex';
//             document.querySelector('#slider-button3').style.display = 'none';

//             clickCount = 0;
//         }
//     });
// });

//

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
    if (event.keyCode == 123) {
        event.preventDefault();
    }
});

//
document.addEventListener('contextmenu',
    event => event.preventDefault()
);






















