//fix shadow
document.addEventListener("DOMContentLoaded", function() {
    var navItems = document.querySelectorAll("#nav2 li");
    navItems.forEach(function(navItem) {
        navItem.addEventListener("mousedown", function() {
            var img = this.querySelector("img");
            img.style.filter = "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))";
        });
        navItem.addEventListener("mouseup", function() {
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
  
    var timer = setInterval(function() {
      current += increment;
      progressElement.textContent = current.toFixed(2) + "%";
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        clearInterval(timer);
        progressElement.textContent = end.toFixed(2) + "%";
      }
    }, 10);
}

// Create a new MutationObserver instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      var displayStyle = mutation.target.style.display;
      if (displayStyle === 'block') {
        var progressElement = mutation.target.querySelector('.progress');
        if (progressElement) {
          animateProgress(0, 97.48, 2000, progressElement);
        }
      }
    }
  });
});

// Start observing the '.description' elements for attribute changes
var targetNodes = document.querySelectorAll('.description');
targetNodes.forEach(function(targetNode) {
  observer.observe(targetNode, { attributes: true });
});


//typing
var app = document.getElementById('app');
var typewriter= new Typewriter(app, {
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

//px
function addElement() {
  var pixelFrame = document.querySelector('.pixel-frame');
  var newElement = document.createElement('div');
  // Thêm các thuộc tính cho newElement tại đây
  pixelFrame.appendChild(newElement);
}

//show description
// document.addEventListener('DOMContentLoaded', function() {
//     var buttons = document.querySelectorAll('.button-content');
//     var descriptions = document.querySelectorAll('.description');
//     var containers = Array.from(document.querySelectorAll('.container'));

//     // Tạo một mảng để theo dõi trạng thái hiển thị của mỗi phần tử .description
//     var isShowing = new Array(descriptions.length).fill(false);

//     // Thêm sự kiện click vào mỗi nút
//     buttons.forEach(function(button, index) {
//         button.addEventListener('click', function() {
//             var description = descriptions[index];
//             // var div = document.getElementById("myDiv");
//             // descriptions.classList.toggle("open");
//             // // var belowDivs = document.querySelector(".below-divs");
//             // containers.classList.toggle("open");
//             if (!isShowing[index]) {
//                 // Trượt xuống các phần tử sau
//                 for (var i = index + 1; i < containers.length; i++) {
//                     containers[i].style.transform = 'translateY(30px)';
//                 }
//                 setTimeout(function() {
//                     description.style.opacity = '1';
//                 }, 1500);
//                 setTimeout(function() {
//                     description.style.display = 'block';
//                     for (var i = index + 1; i < containers.length; i++) {
//                         containers[i].style.transform = 'translateY(0)';
//                     }
//                 }, 1000);
//                 isShowing[index] = true;
//             } else {
//                 description.style.opacity = '0';
//                 setTimeout(function() {
//                     if (!isShowing[index]) {
//                         description.style.display = 'none';
//                         // Trượt lên các phần tử sau
//                         for (var i = index + 1; i < containers.length; i++) {
//                             containers[i].style.transform = 'translateY(0)';
//                         }
//                     }
//                 }, 500);
//                 isShowing[index] = false;
//             }
//         });
//     });
// });

//2
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.button-content');
    var descriptions = document.querySelectorAll('.description');
    // var containers = Array.from(document.querySelectorAll('.container'));

    // Tạo một mảng để theo dõi trạng thái hiển thị của mỗi phần tử .description
    var isShowing = new Array(descriptions.length).fill(false);

    // Thêm sự kiện click vào mỗi nút
    buttons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            var description = descriptions[index];
            // var descriptions = document.querySelectorAll('.description');
            // var containers = Array.from(document.querySelectorAll('.container'));
            descriptions.forEach(function(description) {
                description.classList.toggle("open");
            }); 
            if (!isShowing[index]) {
                // for (var i = index + 1; i < containers.length; i++){
                //     containers[i].classList.toggle("open");
                // }
                setTimeout(function() {
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
                setTimeout(function() {
                    if (!isShowing[index]) {
                        description.style.display = 'none';
                    }
                    for (var i = index + 1; i < containers.length; i++){
                        containers[i].classList.toggle("close");
                    }
                }, 500);
                // setTimeout(function() {
                //     for (var i = index + 1; i < containers.length; i++){
                //         containers[i].classList.toggle("close");
                //     }
                // }, 600)
                 // Đặt display: none sau khi hiệu ứng mờ hoàn tất
                isShowing[index] = false;
            }
        });
    });
});

//
window.onload = function() {
    var containers = document.querySelectorAll(".text3, .underline");
    containers.forEach(function(container) {
      container.style.animation = "fall-motion3 2s";
  
      container.addEventListener("animationend", function() {
        container.style.animation = "";
      });
    });
  };
















