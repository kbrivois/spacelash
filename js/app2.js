// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// Trait avec la souris					
var coordonnees = [];
var mouseDown = false;	
		
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 352;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/labirinto.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "img/pacman2.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "img/ghost.png";

// Monster image 2
var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
	monsterReady2 = true;
};
monsterImage2.src = "img/ghost.png";

// Game objects
var matrix = undefined;
var hero = {
	speed: 5
};
var monster = {
	direction: 0
};
var monster2 = {
	direction: 0
};

var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("mousedown", function (e) {
	var x = e.clientX;
	var y = e.clientY;
	
	mouseDown = true;
	
	coordonnees[0] = x;
	coordonnees[1] = y;

}, false);

addEventListener("mousemove", function (e) {
	if(mouseDown == true)
	{
		var x = e.clientX;
		var y = e.clientY;
		
		coordonnees[2] = x;
		coordonnees[3] = y;
	}
}, false);

addEventListener("mouseup", function (e) {
	mouseDown = false;
	
	coordonnees = [];
	
}, false);

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = (canvas.height / 2) - 20;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	
	// Throw the monster somewhere on the screen randomly
	monster2.x = 32 + (Math.random() * (canvas.width - 64));
	monster2.y = 32 + (Math.random() * (canvas.height - 64));
};

// --- collision stuff
var getCollisionPoints = function (pos, size) {
	var result = {
		up: [
		pos,
		{ x: pos.x + (size.w / 2), y: pos.y},
		{ x: pos.x + size.w,       y: pos.y}],

		down: [
		{ x: pos.x,                y: pos.y + size.h},
		{ x: pos.x + (size.w / 2), y: pos.y + size.h},
		{ x: pos.x + size.w,       y: pos.y + size.h}],

		left: [
		pos,
		{ x: pos.x,                y: pos.y + (size.h / 2)},
		{ x: pos.x,                y: pos.y + size.h}],

		right: [
		{ x: pos.x + size.w,       y: pos.y},
		{ x: pos.x + size.w,       y: pos.y + (size.h / 2)},
		{ x: pos.x + size.w,       y: pos.y + size.h}]
	};

	return result;
};

var checkCollisions = function (points) {
	var result = ((ctx.getImageData(points[0].x, points[0].y, 1, 1).data[2] == 0) && 
		 (ctx.getImageData(points[1].x, points[1].y, 1, 1).data[2] == 0) &&
		 (ctx.getImageData(points[2].x, points[2].y, 1, 1).data[2] == 0));
	return result;
}

var collision = function (current, pos, size) {
	size = size || { w:30, h:30 };
	var delta = { x: pos.x - current.x, y: pos.y - current.y };
	var collisionPoints = getCollisionPoints(pos, size);
	var result = { x: current.x, y: current.y };

	if ((delta.x > 0) && (checkCollisions(collisionPoints.right))) {
		result.x = pos.x;
	} else if ((delta.x < 0) && (checkCollisions(collisionPoints.left))) {
		result.x = pos.x;
	}

	if ((delta.y > 0) && (checkCollisions(collisionPoints.down))) {
		result.y = pos.y;
	} else if ((delta.y < 0) && (checkCollisions(collisionPoints.up))) {
		result.y = pos.y;
	}

	return result;
};
/// --- end of collision stuff

// Update game objects
var update = function () {
  	var pos = {x: hero.x,y: hero.y};
	if (38 in keysDown) { // Player holding up
		pos.y = hero.y - hero.speed;
		if ( (ctx.getImageData(hero.x,      pos.y, 1, 1).data[2] == 0) && 
			 (ctx.getImageData(hero.x + 15, pos.y, 1, 1).data[2] == 0) &&
			 (ctx.getImageData(hero.x + 30, pos.y, 1, 1).data[2] == 0) ) {
			hero.y = pos.y;
		}
	}

	if (40 in keysDown) { // Player holding down
		pos.y = hero.y + hero.speed;
		if ( (ctx.getImageData(hero.x,      pos.y + 30, 1, 1).data[2] == 0) && 
			 (ctx.getImageData(hero.x + 15, pos.y + 30, 1, 1).data[2] == 0) && 
			 (ctx.getImageData(hero.x + 30, pos.y + 30, 1, 1).data[2] == 0) ) {
			hero.y = pos.y;
		}
	}

	if (37 in keysDown) { // Player holding left
		pos.x = hero.x - hero.speed;
		if ( (ctx.getImageData(pos.x, hero.y,      1, 1).data[2] == 0) && 
			 (ctx.getImageData(pos.x, hero.y + 15, 1, 1).data[2] == 0) && 
			 (ctx.getImageData(pos.x, hero.y + 30, 1, 1).data[2] == 0) ) {
			hero.x = pos.x;
		}
	}
	if (39 in keysDown) { // Player holding right
		pos.x = hero.x + hero.speed;
		if ( (ctx.getImageData(pos.x + 30, hero.y,      1, 1).data[2] == 0) && 
			 (ctx.getImageData(pos.x + 30, hero.y + 15, 1, 1).data[2] == 0) && 
			 (ctx.getImageData(pos.x + 30, hero.y + 30, 1, 1).data[2] == 0) ) {
			hero.x = pos.x;
		}
	}

	//var point = collision(hero, pos);
	//hero.x = point.x;
	//hero.y = point.y;

	var result;

	if(monster.direction == 0) {
		monster.direction = Math.floor((Math.random()*4)+1);
	}

	if(monster.direction == 1) {
		result = collision(monster, {x: monster.x, y: monster.y - 1});
	}

	if(monster.direction == 2) {
		result = collision(monster, {x: monster.x + 1, y: monster.y});
	}

	if(monster.direction == 3) {
		result = collision(monster, {x: monster.x, y: monster.y  + 1});
	}

	if(monster.direction == 4) {
		result = collision(monster, {x: monster.x - 1, y: monster.y});
	}

	if (result.x == monster.x && result.y == monster.y) {
		monster.direction = Math.floor((Math.random()*4)+1);
		monster.x + 2;
		monster.y + 2;
	} else {
		monster.x = result.x;
		monster.y = result.y;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x +  32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
	
	if(monster2.direction == 0) {
		monster2.direction = Math.floor((Math.random()*4)+1);
	}

	if(monster2.direction == 1) {
		result = collision(monster2, {x: monster2.x, y: monster2.y - 1});
	}

	if(monster2.direction == 2) {
		result = collision(monster2, {x: monster2.x + 1, y: monster2.y});
	}

	if(monster2.direction == 3) {
		result = collision(monster2, {x: monster2.x, y: monster2.y  + 1});
	}

	if(monster2.direction == 4) {
		result = collision(monster2, {x: monster2.x - 1, y: monster2.y});
	}

	if (result.x == monster2.x && result.y == monster2.y) {
		monster2.direction = Math.floor((Math.random()*4)+1);
		monster2.x + 2;
		monster2.y + 2;
	} else {
		monster2.x = result.x;
		monster2.y = result.y;
	}

	// Are they touching?
	if (
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x +  32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	
	if (monsterReady2) {
		ctx.drawImage(monsterImage2, monster2.x, monster2.y);
	}
	
	if(mouseDown == true)
	{
		ctx.strokeStyle='red';
		
		ctx.beginPath();
		ctx.moveTo(coordonnees[0],coordonnees[1]);
		ctx.lineTo(coordonnees[2],coordonnees[3]);
		ctx.stroke();
		
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x +  32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
		
		if ((coordonnees[1]-coordonnees[0])/(coordonnees[3]-coordonnees[2]) == (x-x1)/(y-y1)) 
		{
		// M est sur la droite formée par A-B
			if( x<=x2 && x>=x1) 
			{
				// M est sur le segment A-B
				alert("Loser !");
				reset();
			}
		}
	}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update();
	render();

	then = now;
	requestAnimationFrame(main);
};

// Let's play this game!
reset();
var then = Date.now();
main();
