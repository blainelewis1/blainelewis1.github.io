var q;
var EPSILON = 1;
var ALPHA = 0.1;
var GAMMA = 0.1;

function BlaineBotAct(agent) {
	var s = getState(agent);

	var actions = getActions(agent);

	var a = epsilonGreedy(actions, s);

	a(agent);
	return;

	nextState = takeAction(a, agent);

	q[s][a] = q[s][a] + ALPHA * (R + GAMMA*q[nextState][a] - q[s][a]);
}

function epsilonGreedy(actions, s) {
	if(Math.random() <= EPSILON){
		return actions[Math.floor(Math.random() * actions.length)];
	} else {
		return policy(actions, s);
	}

}

function policy(s){
	return argmax(q[s]);
}

function argmax(arr){
	var max = 0;

	for(var i = 1; i < arr.length; i++) {
		if(arr[i] > arr[max]) {
			max = i;
		}
	}

	return max;
}