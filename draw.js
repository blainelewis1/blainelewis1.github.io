
$(function() {
	// Get the canvas element from our HTML above

	var canvas = document.getElementById("renderCanvas");

	// Load the BABYLON 3D engine

	var engine = new BABYLON.Engine(canvas, true);

	var createScene = function () {

		// Now create a basic Babylon Scene object 
		var scene = new BABYLON.Scene(engine);

		// Change the scene background color to black...
		scene.clearColor = new BABYLON.Color3(.5, .5, .5);

		// This creates and positions a free camera
		var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    	//var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);
		// This targets the camera to scene origin
		//camera.setTarget(BABYLON.Vector3.Zero());

		// This attaches the camera to the canvas
		camera.attachControl(canvas, false);

		var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
	

		// Dim the light a small amount
		//light.intensity = 1;

		console.log(scene);

		drawPlanet(createPlanet(), scene);

		/*// Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
		var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
		*/


		// Leave this function
		return scene;

  };  // End of createScene function

  // Now, call the createScene function that you just finished creating
  var scene = createScene();

   // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });

    // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });

});


function drawPlanet(planet, scene) {


	//getSurface(planet);
	//Start by bruteforcing
	//TODO: do better

	//Centered on x y z
	//console.log(planet);
	//console.log(scene);

	for(var x = 0; x < planet.width; x++) {
		for(var y = 0; y < planet.height; y++) {
			for(var z = 0; z < planet.depth; z++) {
				if(planet.blocks[x][y][z] != EMPTY_BLOCK){
					drawBlock(x + planet.x - planet.width/2, 
							  y + planet.y - planet.height/2,
							  z + planet.z - planet.depth/2,
							  planet.blocks[x][y][z],
							  scene);
				}
			}
		}
	}
}

function drawBlock(x, y, z, type, scene){
	var block = BABYLON.Mesh.CreateBox("x" + x + "y" + y + "z" + z, 1, scene);
	block.position = new BABYLON.Vector3(x,y,z);
}