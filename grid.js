
var colors = {'W' : 'blue', 'G' : 'chocolate'};

var agent = {'x' : 1, 'y' : 1}

var map = [ ['W','W','W','W','W','W','W','W','W','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','G','G','G','G','G','G','G','G','W'],
			['W','W','W','W','W','W','W','W','W','W']
			];

var timer;
var time = 1000;
var SIZE = 50;


$(function() {

	timer = setTimeout(displayAndAct, time);

	display();


	$('#faster').click(faster);
	$('#slower').click(slower);
	$('#play').click(play);
	$('#pause').click(pause);

});

function pause() {
	clearTimeout(timer);
}

function play() {
	clearTimeout(timer);
	setTimeout(displayAndAct, time);
}

function faster() {
	time -= 100;
}

function slower() {
	time += 100;
}

function displayAndAct() {
	clearTimeout(timer);

	agentsAct();

	display();

	setTimeout(displayAndAct, time);
}

function agentsAct() {
	
}

function display() {
	var $canvas = document.getElementById("grid");
	var ctx = $canvas.getContext("2d");
	ctx.strokeStyle = "black";

	for(var y = 0; y < map.length; y++) {
		for(var x = 0; x < map[y].length; x++){
			ctx.fillStyle = colors[map[y][x]];
			ctx.fillRect(x*SIZE, y*SIZE, SIZE, SIZE);
			ctx.strokeRect(x*SIZE, y*SIZE, SIZE, SIZE);

		}
	}

	//Draw our agent too :D
	ctx.fillStyle = 'yellow';
	ctx.fillRect(agent.x*SIZE + 10, agent.y*SIZE + 10, SIZE - 20, SIZE - 20);
}

