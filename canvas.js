alert("IF YOU WIN THIS GAME YOU WILL GET SECRET UNLEAKED LPI GLITCHES!")
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.height = 25;
canvas.width = canvas.height * 2;

function RB(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var array2D = (y,x) => {
    var array = [];
    for(let i = 0 - y; i < y + y; i++) {
        array[i] = [];
        for(let j = 0 - x; j < x + x; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}
var map = array2D(canvas.height,canvas.width);

class player {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.speedX = 1;
		this.speedY = 0;
		this.fat = 1;
		this.xa = [];
		this.ya = [];
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if(this.x >= canvas.width) {
			this.x = 0;
		} else if(this.x < 0) this.x = canvas.width;
		if(this.y >= canvas.height) {
			this.y = 0;
		} else if(this.y < 0) this.y = canvas.height;
		for(let i = this.fat; i > -1; i--) {
			this.xa[i + 1] = this.xa[i];
			this.ya[i + 1] = this.ya[i];
		}
		this.xa[0] = this.x;
		this.ya[0] = this.y;
		if(this.xa[this.fat] == undefined) this.xa[this.fat] = 0;
		if(this.ya[this.fat] == undefined) this.ya[this.fat] = 0;
		//console.log("X"+this.x+"Y"+this.y);
	}
}
class points {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	update() {
		this.x = RB(1,canvas.width - 1);
		this.y = RB(1,canvas.height - 1);
	}
}

var framecheck = 0;
var keys = [];
onkeydown = onkeyup = (e) => {
    keys[e.keyCode] = e.type == 'keydown';
	if(framecheck == 0) {
        if(keys[68] || keys[39]) {//d and right arrow
            if(player1.speedX != -1) player1.speedX = 1;
	    player1.speedY = 0;
            keys[68] = 0;
            keys[39] = 0;
	    framecheck = 1;
        }
        if(keys[65] || keys[37]) {//a and left arrow
            if(player1.speedX != 1) player1.speedX = -1;
	    player1.speedY = 0;
            keys[65] = 0;
            keys[37] = 0;
	    framecheck = 1;
        }
        if(keys[87] || keys[38] || keys[32]) {//w and up arrrow and space
		if(player1.speedY != 1) player1.speedY = -1;
		player1.speedX = 0;
                keys[87] = 0;
                keys[38] = 0;
                keys[32] = 0;
		framcheck = 1;
        }
	if(keys[83] || keys[40]) { //s and down arrow
		if(player1.speedY != -1) player1.speedY = 1;
		player1.speedX = 0;
		keys[83] = 0;
		keys[40] = 0;
		framecheck = 1;
	}
	}
}

var drawing = () => {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(let i = 0; i < canvas.height; i++) {
		for(let j = 0; j < canvas.width; j++) {
			if(map[i][j] == 1) {
				ctx.fillStyle = "green";
				ctx.fillRect(j,i,1,1);
				//map[i][j] = 0;
			} else if(map[i][j] == 2) {
				ctx.fillStyle = "DarkGreen";
				ctx.fillRect(j,i,1,1);
				//map[i][j] = 0;
			} else if(map[i][j] == 3) {
				ctx.fillStyle = "red";
				ctx.fillRect(j,i,1,1);
			}
		}
	}
}

var player1 = new player(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2));
var apple = new points(RB(1,canvas.width - 1),RB(1,canvas.height - 1));
var start = 0;
var lose = () => {
	let c = 0;
	while(1) document.title = c++;
}
var count = 0;
var game = () => {
	if(count < 5) count++;
	map[player1.y][player1.x] = 2;
	player1.update();
	map[player1.ya[player1.fat]][player1.xa[player1.fat]] = 0;
	map[apple.y][apple.x] = 3;
	if(map[player1.y][player1.x] == 2) lose();
	map[player1.y][player1.x] = 1;
	if(player1.x == apple.x && player1.y == apple.y) {
		map[apple.y][apple.x] = 0;
		player1.fat++;
		apple.update();
		while(map[apple.y][apple.x] != 0) apple.update();
	}
	if(count < 5) map[Math.floor(canvas.height / 2)][Math.floor(canvas.width / 2)] = 0;
	setTimeout(() => {
		drawing();
		game();
		framecheck = 0;
	},1000/15);
}
game();






