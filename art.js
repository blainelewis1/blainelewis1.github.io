// var canvas = document.querySelector('#art canvas');

// canvas.style.width ='100%';
// canvas.style.height='100%';

// canvas.width  = canvas.offsetWidth;
// canvas.height = canvas.offsetHeight;

// random = Math.random

// /** @type {CanvasRenderingContext2D} */ 
// var ctx = canvas.getContext('2d');

// const width = canvas.clientWidth;
// const height = canvas.clientHeight;
// const maxRadius = Math.min(width, height) / 10;
// const colors = ['#0598CC', '#544d3f', '#f9f3e4'];

// let circles = [];

// for(var i = 0; i < 100; i++) {
//     let circle = {
//         x: random() * width, 
//         y: random() *  height, 
//         radius: Math.random() * maxRadius,
//         fill: colors[Math.floor(Math.random() * colors.length)]
//     }

//     circles.push(circle)
// }

// var start = null;

// function draw(timestamp) {
//     if (!start) start = timestamp;
//     var timeDelta = timestamp - start;

//     circles.forEach(function(circle) {
//         ctx.beginPath();
//         ctx.arc(circle.x, circle.y, circle.radius, 0,  Math.PI * 2, false); 
        
//         ctx.fillStyle = circle.fill;
//         ctx.fill();
//     });
    
//     window.requestAnimationFrame(draw);
// }



// window.requestAnimationFrame(draw);

//https://unsplash.com/search/photos/mountain
//https://unsplash.com/search/photos/home-office
//https://unsplash.com/search/photos/nature

function scale(value, min, max) {
    let scaleAmount = max - min
    return value * scaleAmount + min
}

let filters = {
    'blur' : (amount) => `blur(${scale(amount, 1, 5)}px)`,
    'brightness' : (amount) => `brightness(${scale(amount, 0, 1)})`,
    'contrast' : (amount) => `contrast(${scale(amount, 0, 500)}%)`,
    'grayscale' : (amount) => `grayscale(${scale(amount, 0, 100)}%)`,
    'hue-rotate' : (amount) => `hue-rotate(${scale(amount, 0, 360)}deg)`,
    'invert' : (amount) => `invert(${scale(amount, 0, 100)}%)`,
    'opacity' : (amount) => `opacity(${scale(amount, 0, 100)}px)`,
    'saturate' : (amount) => `saturate(${scale(amount, 0, 100)}%%)`,
    'sepia' : (amount) => `sepia(${scale(amount, 0, 100)}%)`,
};

var weatherCallback = function(data) {
    console.log(data.query.results.channel);
    
    let image = document.querySelector("#pic")
    let filterNames = Object.keys(filters);
    let randomFilterName = filterNames[Math.floor(Math.random() * filterNames.length)]
    
    let randomFilter = filters[randomFilterName]
    let filterApplied = randomFilter(Math.random())

    image.setAttribute('style', `filter:${filterApplied}`)
};