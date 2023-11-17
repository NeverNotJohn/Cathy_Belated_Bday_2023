// Slide Starts

const startButton = document.getElementById('main_button');
const text = document.getElementById('main_text');


startButton.addEventListener('click', () => {
    
    boop = Math.floor(Math.random() * 2);

    if (boop == 0)
    {
        moop = Math.floor(Math.random() * 4);

        if (moop == 0)
        {
            const sound = document.getElementById('one');
            sound.play()
        } else if (moop == 1)
        {
            const sound = document.getElementById('two');
            sound.play()
        } else if (moop == 2)
        {
            const sound = document.getElementById('four');
            sound.play()
        } else
        {
            const sound = document.getElementById('three');
            sound.play()
        }

    }

    // When the button is clicked, create and append animated text elements
    for (let i = 0; i < 1; i++) {
        num = Math.floor(Math.random() * 3);

        if (num == 0) {
            const animatedText = document.createElement('div');
            animatedText.textContent = 'You\'re Old!!!';
            animatedText.className = 'animated-text';

            // Set random initial positions
            animatedText.style.left = Math.random() * 100 + 'vw';
            animatedText.style.top = Math.random() * 100 + 'vh';

            document.body.appendChild(animatedText);
        }

        if (num == 1) {
            const randomColor = getRandomColor();
            document.body.style.backgroundColor = randomColor;
        }

        if (num == 2) {
            const image = document.createElement('img');
            image.className = 'ball';
            imageURL = "static/images/nick.png";

            cum = Math.floor(Math.random() * 3);

            if (cum == 0)
            {
                imageURL = 'static/images/nick.png';
            } else if (cum == 1)
            {
                imageURL = 'static/images/roof_korean.png';
            } else 
            {
                imageURL = 'static/images/help.png'
            }

            image.style.backgroundImage = `url('${imageURL}')` 

            image.style.left = Math.random() * 100 + 'vw';
            image.style.top = Math.random() * 100 + 'vh';
            document.body.appendChild(image);
        }
    }
});



function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function animateDVDLogo(element) {
    const maxX = window.innerWidth - element.clientWidth;
    const maxY = window.innerHeight - element.clientHeight;
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;

    let dx = 1;
    let dy = 1;

    function step() {
        x += dx;
        y += dy;

        if (x <= 0 || x >= maxX) {
            dx = -dx;
        }

        if (y <= 0 || y >= maxY) {
            dy = -dy;
        }

        element.style.left = x + 'px';
        element.style.top = y + 'px';

        requestAnimationFrame(step);
    }

    step();
}