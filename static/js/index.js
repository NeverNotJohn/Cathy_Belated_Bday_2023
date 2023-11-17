// The attributes of the player.
var player = {
    x: (window.innerWidth)/2 + 25,
    y: 500,
    x_v: 0,
    y_v: 0,
    jump : true,
    height: 50,
    width: 50
    };

// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
    };

// The friction and gravity to show realistic movements    
var gravity = 0.6;
var friction = 0.7;

// The number of platforms
var num = 2;

// The platforms
var platforms = [];

// Function to render the canvas
function rendercanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#f5b5b8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to render the player
function renderplayer(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect((player.x)-player.width, (player.y)-player.height, player.width, player.height);
    
    // debug box
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(player.x, player.y-player.height, 5, 5);
}

// Function to create platforms
function createplat(x,y,width,height) {
    platforms.push(
        {
        x: x,
        y: y,
        width: width,
        height: height
        }
    );
}

// Function to render platforms
function renderplat(){
    ctx.fillStyle = "#45597E";

    for (let j = 0; j < platforms.length; j++) 
    {
        ctx.fillRect(platforms[j].x, platforms[j].y, platforms[j].width, platforms[j].height);
    }

}

// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if(e.keyCode == 65) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if(e.keyCode == 87 || e.keyCode == 32) {
        if(player.jump == false) {
            player.y_v = -15;
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 68) {
        keys.right = true;
    }
}

// This function is called when the pressed key is released
function keyup(e) {
    if(e.keyCode == 65) {
        keys.left = false;
    }
    if(e.keyCode == 87 || e.keyCode == 32) {
        if(player.y_v < -2) {
        player.y_v = -3;
        }
    }
    if(e.keyCode == 68) {
        keys.right = false;
    }
} 

function loop() {

    // If the player is not jumping apply the effect of frictiom
    if(player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }
    player.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if(keys.left) {
        player.x_v = -2.5;
    }
    if(keys.right) {
        player.x_v = 2.5;
    }

    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;

    // A simple code that checks for collions with the platform
    let i = -1;
    
    for (let j = 0; j < platforms.length; j++)
    {
        if (
            platforms[j].x < player.x                                               // 1 if player is to the right of left platform edge
            && player.x - player.width < platforms[j].x + platforms[j].width        // 1 if player is to the left of right platform edge
            && platforms[j].y < player.y                                            // 1 if the player is below platform
            && player.y < platforms[j].y + platforms[j].height                      // 1 if player is above top of platform
           )
        {
            player.jump = false;
            player.y = platforms[j].y;   
        }
    }


    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderplat();

}

// Create Platforms

const center = window.innerWidth/2;

createplat(center-350/2, 750, 350, 20);
createplat(center-300/2-300, 590, 300, 20);
createplat(center-300/2 + 300, 590, 300, 20);


canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");

// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
setInterval(loop,22);