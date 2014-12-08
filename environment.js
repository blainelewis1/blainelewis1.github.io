/*
	
	Imagine a planet, entirely made of blocks of different kinds
	From your original planet you need to get off it, onto a new one
	
	You can mine all kinds of blocks, BUT as in real life, you need 
	to do something with it. 

	Things can be built, tech upgraded...

*/


var BLOCK_SIZE = 5;
var EMPTY_BLOCK = 0;
var BASIC_BLOCK = 1;

function createPlanet() {
	blocks = generatePlanet();


	//This one is centered...
	planet = {"blocks" : blocks, 
			  "x" : blocks.length, "y" : blocks.length, "z" : blocks.length,
			  "width" : blocks.length, "height" : blocks.length, "depth" : blocks.length
			};

	return planet;
}

/*
	Lets start with round planets
*/

$(function () {
	//drawPlanet(createPlanet());
});

function generatePlanet() {

	//Radius from 10 to 110
	maxRadius = Math.pow(4, Math.random()* 1.5) + 10;

	//TODO: change me
	maxRadius = 10;

	maxRadius = Math.floor(maxRadius);

	/*if(maxRadius % 2 != 0) {
		maxRadius++;
	}*/

	//Init planet
	var blocks = [];
	for(var x = 0; x <= maxRadius*2; x++) {
		blocks.push([]);
		for(var y = 0; y <= maxRadius*2; y++) {
			blocks[x].push([]);
			for(var z = 0; z <= maxRadius*2; z++) {
				blocks[x][y].push(EMPTY_BLOCK);
			}
		}
	}

	var x0 = maxRadius;
	var y0 = maxRadius;
	var z0 = maxRadius;

	for(var x = -maxRadius; x <= maxRadius; x++){
		for(var y = -maxRadius; y <= maxRadius; y++){
			for(var z = -maxRadius; z <= maxRadius; z++){
				//If it's on or in the soh, can be changed to any ellipse.
				if(z*z+y*y+x*x <= maxRadius*maxRadius){
					//console.log("X " + (x + x0) + " Y: " + (y +y0) + "  Z: " + (z +z0));
					//console.log("X " + (x) + " Y: " + (y) + "  Z: " + (z));
					blocks[x + x0][y + y0][z + z0] = BASIC_BLOCK;
				}
			}
		}
	}



	//print3dArray(blocks);

	return blocks;

}

/*
	This function is super expensive... 
	would it be cheaper to keep track of surface?
*/

function getSurface(planet) {
	//find a point on the surface, planet[planet.length/2][planet[0].length/2][planet[0].length/2]

	//now traverse like a graph lol.... keep track of the coords and add them to a set
	//To make sure we don't see them twice
	return;
}