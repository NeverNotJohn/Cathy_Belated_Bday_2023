// Terrible Global var syntax but f it

let level = 1;
var jumpSound = new Audio('static/sounds/jump.mp3');
var music = new Audio('static/sounds/seycara.mp3');
var win = new Audio('static/sounds/win.mp3');

const video = docum

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
    up: false
    };

// The friction and gravity to show realistic movements    
var gravity = 0.6;
var friction = 0.7;

// The number of platforms
var num = 2;

// The platforms
var platforms = [];
var masks = [];

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
    //ctx.fillStyle = "#FF0000";
    //ctx.fillRect(player.x, player.y-player.height, 5, 5);
}

// Images
image_path = "";
image_x = 0;
image_y = 0;
function renderimage()
{
  base_image = new Image();
  base_image.src = image_path;
  ctx.drawImage(base_image, image_x, image_y);
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

// Function to create mask
mask_num = 0;
mask_size = 0;
function createmask(x,y,width,height) {
    masks.push(
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

    // Render masks
    ctx.fillStyle = "#f5b5b8";
    for (let j = 0; j < masks.length; j++) 
    {
        ctx.fillRect(masks[j].x, masks[j].y, masks[j].width, masks[j].height);
    }

    // Level 1 Text

    switch (level) {
        case 1:
            ctx.font = '50px arial';
            ctx.fillStyle = 'white';
            var text = "Go Up To Advance! :>";
            var textWidth = ctx.measureText(text).width;
            ctx.fillText('Go Up To Advance! :>', center - textWidth/2, 130);
            break;
    
        case 2:
            ctx.font = '50px arial';
            ctx.fillStyle = 'white';
            var text = `Level is ${(1-mask_num/mask_size) * 100 }% cleared!`;
            var textWidth = ctx.measureText(text).width;
            ctx.fillText(text, center - textWidth/2, 130);

            if (levelLock)
            {
                ctx.fillText('Pumpkin!!!', center - textWidth/2, 300);
            }

            break;
        case 3:
            ctx.font = '50px arial';
            ctx.fillStyle = 'white';
            var text = `Level is ${(1-mask_num/mask_size) * 100 }% cleared!`;
            var textWidth = ctx.measureText(text).width;
            ctx.fillText(text, center - textWidth/2, 130);

            if (levelLock)
            {
                ctx.fillText('Wide Heng!', center - textWidth/2, 500);
            }

            break;

        case 7:
            ctx.font = '50px arial';
            ctx.fillStyle = 'white';
            var text = `Level is ${(1-mask_num/mask_size) * 100 }% cleared!`;
            var textWidth = ctx.measureText(text).width;
            ctx.fillText(text, center - textWidth/2, 130);
            ctx.fillText('Oh and one last thing...', center - textWidth/2, 500);

           break;
        default:
            break;
    }
    

}

function playJumpSound()
{
    jumpSound.play();
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
            playJumpSound();
        }
        keys.up = true;
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
        keys.up = false;
    }
    if(e.keyCode == 68) {
        keys.right = false;
    }
} 

// Level Vars
let levelLock = true;

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

    // Remove Masks

    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderimage();
    renderplayer();
    renderplat();

    for (let j = 0; j < masks.length; j++)
    {
        if (
            masks[j].x < player.x                                               // 1 if player is to the right of left platform edge
            && player.x - player.width < masks[j].x + masks[j].width        // 1 if player is to the left of right platform edge
            && masks[j].y < player.y                                            // 1 if the player is below platform
            && player.y < masks[j].y + masks[j].height                      // 1 if player is above top of platform
           )
        {
            mask_num--;
            masks[j] = 
                {
                x: 0,
                y: 0,
                width: 0,
                height: 0
                }
        }


    }

    // Out of screen? TP to Opposite side

    if (player.y > window.innerHeight || player.x < 0 || player.x > window.innerWidth)
    {

        if (player.x < 0)
        {
            player.x = window.innerWidth;
        }
        else if (player.x - player.width > window.innerWidth)
        {
            player.x = 0;
        }
        else if (player.y > window.innerHeight)
        {
            player.y = 0;
            player.x_v = 0;
            player.y_v = 0;
        }

    }

    // limit vertical velocity
    
    if (player.y_v > 15)
    {
        player.y_v = 15;
    }

    // Detect if good
    if (!levelLock && mask_num <= 10)
    {
        levelLock = true;
        win.play();

        if (level == 3)
        {
            createplat(center+600, 700, 300, 20);
            createplat(center+600, 500, 300, 20);
            createplat(center+600, 300, 300, 20);
            createplat(center+600, 100, 300, 20);
        }

    }

    // When up, go to next level

    if (player.y < 10 && player.y_v < 0 && levelLock)
    {

        level++;

        // Generate new platforms
        switch (level) {
            case 2:
                platforms = [];
                player.x = (window.innerWidth)/2 + 25;
                player.y = 500;

                level2();

                // Create New Platforms

                break;

            case 3:
                platforms = [];
                player.x = 100;
                player.y = 700;

                level3();
                break;

            case 4:

                platforms = [];
                player.x = 100;
                player.y = 700;
                level4();
                break;

            case 5:

                platforms = [];
                player.x = 100;
                player.y = 700;
                level5();
                break;
    
            case 6:

                platforms = [];
                player.x = 100;
                player.y = 700;
                level6();
                break;

            case 7:

                platforms = [];
                player.x = 100;
                player.y = 700;
                level7();
                break;

            default:
                break;
        }

    }
    
}

function level2() {
    createplat(center-350/2, 750, 350, 20);
    createplat(center-200/2-250, 590, 200, 20);
    createplat(center-200/2 + 250, 590, 200, 20);

    createplat(center-250/2 + 300, 400, 250, 20);
    createplat(center-250/2 - 300, 400, 250, 20);
    createplat(center-300/2 + 300, 200, 300, 20);
    createplat(center-300/2 - 300, 200, 300, 20);

    for (let i = 0; i < 10; i++)
    {
        for (let j = 0; j < 10; j++)
        {
            createmask(center-250 + j*50, 600 - i*50, 50, 50);
        }
    }
    image_path = "static/images/candycorn_girl_STICKER.png";
    image_x = center-250;
    image_y = 200;
    mask_num = 100;
    mask_size = 100;
    levelLock = false;
}

function level3() {
    createplat(center-2000/2, 800, 2000, 20);
    masks = [];

    for (let i = 0; i < 2; i++)
    {
        for (let j = 0; j < 30; j++)
        {
            createmask(center-750 + j*50, 700 - i*50, 50, 50);
        }
    }

    image_path = "static/images/wide_heng.png";
    image_x = center-750;
    image_y = 650;
    mask_num = 60;
    mask_size = 60;
    levelLock = false;


}

function level4()
{
    createplat(center-2000/2, 800, 2000, 20);
    createplat(center+600, 700, 300, 20);
    createplat(center+600, 500, 300, 20);
    createplat(center+600, 300, 300, 20);
    createplat(center+600, 100, 300, 20);
    masks = [];

    image_path = "static/images/msg1.png";
    image_x = 100;
    image_y = 100;
    mask_num = 0;
    mask_size = 0;
}

function level5()
{
    image_path = "static/images/msg2.png";
    image_x = 10;
    image_y = 10;
    createplat(center-2000/2, 800, 2000, 20);
    createplat(center+600, 700, 300, 20);
    createplat(center+600, 500, 300, 20);
    createplat(center+600, 300, 300, 20);
    createplat(center+600, 100, 300, 20);
    masks = [];

    mask_num = 0;
    mask_size = 0;
}
function level6()
{
    createplat(center-2000/2, 800, 2000, 20);
    createplat(center+600, 700, 300, 20);
    createplat(center+600, 500, 300, 20);
    createplat(center+600, 300, 300, 20);
    createplat(center+600, 100, 300, 20);
    masks = [];

    mask_num = 0;
    mask_size = 2;
}
function level7()
{
    createplat(center-2000/2, 800, 2000, 20);
    masks = [];

    image_path = "static/images/old.png";
    image_x = center;
    image_y = 650;

    createmask(center, 650,50,50);
    createmask(center + 50, 650,50,50);
    createmask(center + 100, 650,50,50);
    createmask(center + 150, 650,50,50);
    createmask(center + 200, 650,50,50);
    createmask(center + 250, 650,50,50);
    createmask(center, 700,50,50);
    createmask(center + 50, 700,50,50);
    createmask(center + 100, 700,50,50);
    createmask(center + 150, 700,50,50);
    createmask(center + 200, 700,50,50);
    createmask(center + 250, 700,50,50);
    createmask(center, 750,50,50);
    createmask(center + 50, 750,50,50);
    createmask(center + 100, 750,50,50);
    createmask(center + 150, 750,50,50);
    createmask(center + 200, 750,50,50);
    createmask(center + 250, 750,50,50);

    mask_num = 17;
    mask_size = 37;
    levelLock = false;  
}

/////////////////////
///     Main      ///
/////////////////////


const startButton = document.getElementById('start');
const center = window.innerWidth/2;
const allDiv = document.getElementById('front');

// Start Music on startup
music.loop = true;


startButton.addEventListener('click', function () {

    music.play();

    canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");

    // Removing Front Page
    startButton.parentNode.removeChild(startButton);
    allDiv.innerHTML = '';
    allDiv.parentNode.removeChild(allDiv);
    document.documentElement.style.height = '100vh';
    document.body.style.height = '100vh';
    
    // Create platforms

    // Level 1
    createplat(center-350/2, 750, 350, 20);
    createplat(center-300/2-300, 590, 300, 20);
    createplat(center-300/2 + 300, 590, 300, 20);

    createplat(center-250/2, 400, 250, 20);
    createplat(center-300/2 + 350, 200, 300, 20);
    createplat(center-300/2-350, 200, 300, 20);

    

    // Adding the event listeners
    document.addEventListener("keydown",keydown);
    document.addEventListener("keyup",keyup);
    setInterval(loop,22);

});
