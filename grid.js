var colors = {'W' : 'blue', 'G' : 'chocolate'};

var agents = [{'x' : 1, 'y' : 1, 'act':null}]

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

	agents[0].act = BlaineBotAct;

	console.log(agents);
	console.log(agents[0]);
	console.log(agents[0].act);

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
	timer = setTimeout(displayAndAct, time);
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

	timer = setTimeout(displayAndAct, time);
}

function agentsAct() {
	for(var i = 0; i < agents.length; i++){
		agents[i].act(agents[i]);
	}
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

	ctx.fillStyle = 'yellow';

	for(var i = 0; i < agents.length; i++){
		ctx.fillRect(agents[i].x*SIZE + 10, agents[i].y*SIZE + 10, SIZE - 20, SIZE - 20);
	}
}

function getState(agent) {
	return agent.x + agent.y*2;
}

function getActions(agent) {
	//search neighbours... etc. 
	//Are we on a food block..
	var actions = [];

	var cur = map[agent.y][agent.x];

	if(agent.x + 1 < map[agent.y].length){
		if(map[agent.y][agent.x + 1] == cur) {
			actions.push(right);
		}
	}

	if(agent.y + 1 < map.length) {
		if(map[agent.y + 1][agent.x] == cur) {
			actions.push(down);
		}
	}

	if(agent.x - 1 > 0){
		if(map[agent.y][agent.x + 1] == cur) {
			actions.push(left);
		}
	}

	if(agent.y - 1 > 0){
		if(map[agent.y - 1][agent.x] == cur) {
			actions.push(up);
		}
	}



	return actions;
}

/* list of actions? */

function left(agent) {
	agent.x -= 1;
}

function right(agent) {
	agent.x += 1;

}

function up(agent) {
	agent.y -= 1;
}

function down(agent) {
	agent.y += 1;
}

