
var colors = {'W' : 'blue', 'G' : 'chocolate'};

console.log(colors);

var map = [ ['W','W','W','W','W','W','W','W','W','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','W','W','W','W','W','W','W','W','G']
			];

console.log(map);

var timer;
var time = 1000;
var SIZE = 20;


$(function() {
	//set timer for event loop
	timer = setTimeout(displayAndAct, time);

	//onclick for time modifiers start stop...

});

function displayAndAct() {
	clearTimeout(timer);

	display();

	//setTimeout(displayAndAct, time);
}

function display() {
	var $canvas = document.getElementById("grid");
	var ctx = $canvas.getContext("2d");


	for(var y = 0; y < map.length; y++) {
		for(var x = 0; x < map[y].length; x++){
			console.log(colors[map[y][x]] + "X: " + x + ", Y: "+ y);
			ctx.fillStyle = colors[map[y][x]];

			//ctx.strokeStyle = "black";
			ctx.rect(x*SIZE, y*SIZE, SIZE, SIZE);
			ctx.fill();
		}
	}

}