const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let changingDirection = false;

function drawCell(x, y){
    /* Draws a green cell with white border of the grid at the specified coordinates (x, y). */

    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(x * grid, y * grid, grid, grid);
    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeRect(x * grid, y * grid, grid, grid);
}

function drawSnake(){
    /* Draws the entire snake on the canvas */

    snake.forEach(segment => drawCell(segment.x, segment.y));
}

function moveSnake(){
    /*Updates the position of the snake's head based on the current direction (dx, dy). 
    Adds a new head segment to the front of the snake's array. If the snake's head reaches the food, 
    it increases the score and generates new food; otherwise, it removes the last segment of the snake. */

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood(){
    /* Generates a new random position for the food within the canvas. */
    food = {
        x: Math.floor(Math.random() * (canvas.width / grid)),
        y: Math.floor(Math.random() * (canvas.height / grid))
    };

    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}

function changeDirection(event){
    /* Changes the direction of the snake based on the key pressed. */

    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;
    let goingUp = dy === -1;
    let goingDown = dy === 1;
    let goingLeft = dx === -1;
    let goingRight = dx === 1;

    if (keyPressed === 37 && !goingRight) {
        dx = -1;
        dy = 0;
    }

    if (keyPressed === 38 && !goingDown) {
        dx = 0;
        dy = -1;
    }

    if (keyPressed === 39 && !goingLeft) {
        dx = 1;
        dy = 0;
    }

    if (keyPressed === 40 && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function hasGameEnded(){
    /* Checks if the game has ended. */

    for (let i = 1; i < snake.length; i++) {
        if (snake.length > 2){
            console.log(snake.length)
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width / grid;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height / grid;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function clearCanvas(){
    /* Clears the canvas with a light gray background color. */

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFood(){
    /* Draws the food on the canvas using an orange fill color. */

    ctx.fillStyle = '#FF5733';
    ctx.fillRect(food.x * grid, food.y * grid, grid, grid);
}

function game() {
    /* The main game function that controls the game loop. It clears the canvas, draws the food, 
    moves the snake, and draws the snake in each cycle. It also checks if the game has ended and 
    shows an alert with the final score if necessary. */

    changingDirection = false;
    setTimeout(function onTick() {
        if (hasGameEnded()) {
            console.log("true")
            alert('Game over! Final score: ' + score);
            return;
        }

        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();

        game();
    }, 100);
}

generateFood();
document.addEventListener('keydown', changeDirection);
game();